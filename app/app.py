#!/usr/bin/env python
from threading import Lock
from flask import Flask, render_template, session, request, \
    copy_current_request_context
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from random import uniform
# Set this variable to "threading", "eventlet" or "gevent" to the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = None

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()

# send random lat long every now and then
def background_thread():
    """Example of how to send server generated events to clients."""
    while True:
        socketio.sleep(10)
        socketio.emit('my_response',
                      {'topic': 'location','data': {'lat':str(uniform(-90,90)), 'long':str(uniform(-180,180))}},
                      namespace='')


@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)


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
    global thread
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(background_thread)
    emit('my_response', {'data': 'Connected', 'count': 0})


@socketio.on('disconnect', namespace='')
def disconnect():
    print('Client disconnected', request.sid)


if __name__ == '__main__':
    socketio.run(app, debug=True)
