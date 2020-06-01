#!/usr/bin/env python
import os
import re
import sys
from typing import List

from dotenv import load_dotenv
from flask import Flask, request, render_template
import telegram

proxy_url = os.getenv('HTTP_PROXY')
pp = None if not proxy_url else telegram.utils.request.Request(proxy_url=proxy_url)

from line_iterator import Lines

load_dotenv()


app = Flask(__name__)


@app.route('/')
def root():
    return render_template('index.html')


@app.route('/post', methods=['POST'])
def print_data():
    text = request.data.decode('utf-8')
    print(text, file=sys.stderr)
    bot = telegram.Bot(os.getenv('BOT_KEY'), request=pp)
    message = '\n'.join([line for line in Lines(text)])
    for chat_id in os.getenv('CHAT_ID').replace(',', ' ').split():
        bot.send_message(chat_id, text=message)
    return message


if __name__ == '__main__':
    app.run()
