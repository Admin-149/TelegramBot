#!/usr/bin/env python
import os
import re
import sys
from typing import List

from dotenv import load_dotenv
from flask import Flask, request, render_template
import telegram

from line_iterator import Lines

load_dotenv()


app = Flask(__name__, template_folder='client/build',
            static_folder='client/build/static')


@app.route('/')
def root():
    return render_template('index.html')


@app.route('/test', methods=['POST'])
def print_data_test():
    text = request.data.decode('utf-8')
    print(text, file=sys.stderr)
    bot = telegram.Bot(os.getenv('BOT_KEY'))
    message = '\n'.join([line for line in Lines(text)])
    for chat_id in os.getenv('TEST_CHAT_ID').replace(',', ' ').split():
        send_message = bot.send_message(chat_id, text=message)
    return send_message


@app.route('/post', methods=['POST'])
def print_data():
    text = request.data.decode('utf-8')
    print(text, file=sys.stderr)
    bot = telegram.Bot(os.getenv('BOT_KEY'))
    message = '\n'.join([line for line in Lines(text)])
    for chat_id in os.getenv('CHAT_ID').replace(',', ' ').split():
        send_message = bot.send_message(chat_id, text=message)
    return send_message


if __name__ == '__main__':
    app.run()
