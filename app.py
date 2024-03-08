import string
import random
from datetime import datetime
from flask import Flask, g, jsonify
from functools import wraps
from flask import *
import sqlite3

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect('db/belay.sqlite3')
        db.row_factory = sqlite3.Row
        setattr(g, '_database', db)
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def query_db(query, args=(), one=False):
    db = get_db()
    cursor = db.execute(query, args)
    rows = cursor.fetchall()
    db.commit()
    cursor.close()
    if rows:
        if one:
            return rows[0]
        return rows
    return None


# TODO: If your app sends users to any other routes, include them here.
#       (This should not be necessary).
@app.route('/')
@app.route('/homepage')
@app.route('/login')
@app.route('/signup')
@app.route('/channel/<channel_id>')
def index(channel_id=None):
    return app.send_static_file('index.html')


@app.route('/api/login', methods = ['POST'])
def login():
    if request.method == 'POST':
        userName = request.headers['userName']
        password = request.headers['password']
        user = query_db('SELECT id, api_key, name FROM users WHERE name = ? AND password = ?', [userName, password], one=True)
        
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        return jsonify({'api_key': user['api_key'], 'user_id': user['id'], 'user_name': user['name']}), 200
    
    return jsonify({'error': 'Method Not Allowed'}), 405

@app.route('/api/signup/details', methods = ['POST'])
def signup_details():
    if request.method == 'POST':
        userName = request.headers['userName']
        password = request.headers['password']
        api_key = ''.join(random.choices(string.ascii_lowercase + string.digits, k=40))
        user = query_db('insert into users (name, password, api_key) values (?, ?, ?) returning id, name, password, api_key',
                            (userName, password, api_key), one=True)
        
        if not user:
            return jsonify({'error': 'Failed to signup'}), 401
        
        return jsonify({'api_key': user['api_key'], 'user_id': user['id'], 'user_name': user['name']}), 200
    
    return jsonify({'error': 'Method Not Allowed'}), 405
