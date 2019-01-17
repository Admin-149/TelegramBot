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


app = Flask(__name__)


def print_data(chat_id: str):
    text = request.data.decode('utf-8')
    print(text, file=sys.stderr)
    bot = telegram.Bot(os.getenv('BOT_KEY'))
    message = '\n'.join([line for line in Lines(text)])
    for chat_id in os.getenv(chat_id).replace(',', ' ').split():
        bot.send_message(chat_id, text=message)
    return message


@app.route('/')
def root():
    return render_template('index.html')


@app.route('/test', methods=['POST'])
print_data('TEST_CHAT_ID')


@app.route('/post', methods=['POST'])
print_data('CHAT_ID')

if __name__ == '__main__':
    app.run()
