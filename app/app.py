#!/usr/bin/env python
import threading
from threading import Lock
from flask import Flask, render_template, session, request, \
    copy_current_request_context,send_from_directory
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from random import uniform
from twitter_scraper import get_tweets
import os
import geocoder
import time
import pickle
import re
import location_regex
import ibm_visual
from flask_cors import CORS
# Set this variable to "threading", "eventlet" or "gevent" to the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = None

# app = Flask(__name__,template_folder='../build')
app = Flask(__name__, static_folder='../ui/build', static_url_path='/',template_folder='../ui/build')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*')
CORS(app)
thread = None
thread_lock = Lock()
tweet_q_dump_file = 'tweet_q_dump'
tweet_queue_ids = []
acceptableFeatures = {'Hose':0.8}

print("Hi")

try:
    tweet_queue = pickle.load(open( tweet_q_dump_file, "rb" ))
except: 
    tweet_queue = []
print("tweet queue loaded")

class myThread (threading.Thread):
   def __init__(self, threadID, name, att_func):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.name = name
      self.att_func = att_func
   def run(self):
       print("Starting "+ self.name) 
       self.att_func()

def sendTweetPayLoadSoc(tweet):
    if tweet['tweetLat']!=256 and tweet['tweetLong']!=256 and len(tweet['imageUrl']) > 0:
        for feature in tweet['features']:
            if feature['object'] in acceptableFeatures:
                if feature['score'] > acceptableFeatures[feature['object']]:
                    print(tweet)
                    socketio.emit('my_response',
                                    {'data': tweet},
                                    broadcast=False,
                                    namespace='')

def background_thread():
    """Example of how to send server generated events to clients."""
    thread_lock.acquire()
    for tweet in tweet_queue:
        sendTweetPayLoadSoc(tweet)
    thread_lock.release()

def tweet_poll_safe():
    for tweet in tweet_queue:
        tweet_queue_ids.append(tweet['tweetId'])
    while True:
        time.sleep(10)
        thread_lock.acquire()
        fetched_tweets = get_tweets('#scdftweetrescue', pages=1)
        for tweet in fetched_tweets:
            if tweet['tweetId'] not in tweet_queue_ids:
                tweetText = re.sub(r"[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)",'',tweet['text'])
                tweetText.strip()
                tweetLocation = location_regex.getLocation(tweetText)
                tweetLat, tweetLong = geocoder.get_coordinates(tweetLocation)
                tweetProcessed = {'tweetId': tweet['tweetId'], 'tweetUrl': "https://twitter.com" +tweet['tweetUrl'],
                 'imageUrl':tweet['entries']['photos'],'tweetUsername':tweet['username'],'tweetText':tweetText,
                 'tweetDate':tweet['time'].strftime("%Y-%m-%d %H:%M:%S"), 'tweetLat':tweetLat, 'tweetLong':tweetLong, 'features':ibm_visual.getObjects(tweet['entries']['photos'])}
                tweet_queue.append(tweetProcessed)
                sendTweetPayLoadSoc(tweetProcessed)
                tweet_queue_ids.append(tweet['tweetId'])
        pickle.dump(tweet_queue,open( tweet_q_dump_file, "wb" ))
        
        thread_lock.release()

tweet_poll_safe_thread = myThread(1,"tweel_poll_safe_thread",tweet_poll_safe)
tweet_poll_safe_thread.start()

# @app.route('/')
# def index():
#     return render_template('index.html', async_mode=socketio.async_mode)

# @app.route('/')
# def index():
#     return app.send_static_file('index.html')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@socketio.on('event', namespace='') 
def message(message):
    emit('my_response',
         {'data': message['data']})

@socketio.on('broadcast_event', namespace='')
def broadcast_message(message):
    emit('my_response',
         {'data': message['data']},
         broadcast=True)

@socketio.on('disconnect_request', namespace='')
def disconnect_request():
    @copy_current_request_context
    def can_disconnect():
        disconnect()
    # for this emit we use a callback function
    # when the callback function is invoked we know that the message has been
    # received and it is safe to disconnect
    emit('my_response',
         {'data': 'Disconnected!'},
         callback=can_disconnect)

@socketio.on('connect', namespace='')
def test_connect():
    # global thread
    # if thread is None:
    #     thread = socketio.start_background_task(background_thread)
    background_thread()
    emit('my_response', {'data': 'Connected', 'count': 0})


@socketio.on('disconnect', namespace='')
def disconnect():
    print('Client disconnected', request.sid)


if __name__ == '__main__':
    socketio.run(app, debug=True, host='localhost')
