from twitter_scraper import get_tweets
from geocoder import get_coordinates
import location_regex
import time
import pickle
import threading
import datetime
import re

class myThread (threading.Thread):
   def __init__(self, threadID, name, att_func):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.name = name
      self.att_func = att_func
   def run(self):
       print("Starting "+ self.name) 
       self.att_func()

threadLock = threading.Lock()
tweet_q_dump_file = 'tweet_q_dump'
tweet_queue_ids = []
tweet_queue_copy = []

def tweet_poll_safe():
    while True:
        time.sleep(10)
        threadLock.acquire()
        for tweet in get_tweets('#scdftweetrescue', pages=1):
            if tweet['tweetId'] not in tweet_queue_ids:
                tweetText = re.sub(r"[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)",'',tweet['text'])
                tweetText.strip()
                tweetLocation = location_regex.getLocation(tweetText)
                tweetLat, tweetLong = get_coordinates(tweetLocation)
                tweetProcessed = {'tweetId': tweet['tweetId'], 'tweetUrl': "https://twitter.com" +tweet['tweetUrl'],
                 'imageUrl':tweet['entries']['photos'],'tweetUsername':tweet['username'],'tweetText':tweetText,
                 'tweetDate':tweet['time'].strftime("%Y-%m-%d %H:%M:%S"), 'tweetLat':tweetLat, 'tweetLong':tweetLong}
                tweet_queue.append(tweetProcessed)
                tweet_queue_copy.append(tweetProcessed)
                tweet_queue_ids.append(tweet['tweetId'])
        pickle.dump(tweet_queue,open( tweet_q_dump_file, "wb" ))
        
        threadLock.release()

def process_tweet_q_threaded():
    while True:
        time.sleep(0.5)
        threadLock.acquire()
        for tweet in tweet_queue_copy:
            if 'processed' not in tweet.keys():
                print(tweet)
                tweet['processed'] = True
        threadLock.release()

def process_tweet_q():
    threadLock.acquire()
    for tweet in tweet_queue:
        if 'processed' not in tweet.keys():
            print(tweet)
            tweet['processed'] = True
    threadLock.release()

try:
    tweet_queue = pickle.load(open( tweet_q_dump_file, "rb" ))
except: 
    new_list_prompt = input("file doesn't exist create new list? y/n")
    if new_list_prompt == 'y':
        tweet_queue = []
    else:
        exit()

for tweet in tweet_queue:
    tweet_queue_ids.append(tweet['tweetId'])
tweet_queue_copy = tweet_queue
tweet_poll_safe_thread = myThread(1,"tweel_poll_safe_thread",tweet_poll_safe)
process_tweet_q_thread = myThread(2,"process_tweet_q_thread",process_tweet_q_threaded)
tweet_poll_safe_thread.start()
process_tweet_q_thread.start()
# print(len(tweet_queue))