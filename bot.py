#!/usr/bin/env python
import os
import re
from typing import List

from dotenv import load_dotenv
from flask import Flask, request
import telegram

from line_iterator import Lines

load_dotenv()


app = Flask(__name__)


@app.route('/')
def print_hello():
    return "Test message"


@app.route('/post', methods=['POST'])
def print_data():
    text = request.data.decode('utf-8')
    bot = telegram.Bot(os.getenv('BOT_KEY'))
    message = '\n'.join([line for line in Lines(text)])
    bot.send_message(chat_id=os.getenv('CHAT_ID'), text=message)
    return message


if __name__ == '__main__':
    app.run()
