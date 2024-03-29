#!/usr/bin/env python
import os
import sys

from dotenv import load_dotenv
from flask import Flask, request, render_template
import telegram

from line_iterator import Lines

load_dotenv()


app = Flask(__name__)


@app.route('/')
def root():
    return render_template('index.html')


@app.route('/post', methods=['POST'])
async def print_data():
    text = request.data.decode('utf-8')
    print(text, file=sys.stderr)
    bot = telegram.Bot(os.getenv('BOT_KEY'))
    message = '\n'.join([line for line in Lines(text)])
    for chat_id in os.getenv('CHAT_ID').replace(',', ' ').split():
        await bot.send_message(chat_id, text=message)
    return message


if __name__ == '__main__':
    app.run()
