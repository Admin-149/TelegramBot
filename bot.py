#!/usr/bin/env python
import os
import re
from typing import List

from dotenv import load_dotenv
from flask import Flask, request, render_template, flash, redirect
from config import Config
import telegram

from line_iterator import Lines
from form import LoginForm

load_dotenv()


app = Flask(__name__)
app.config.from_object(Config)


@app.route('/', methods=['GET', 'POST'])
def index():
    form = LoginForm()
    if form.validate_on_submit():
        flash('Login requested for user {}, remember_me={}'.format(
            form.username.data, form.remember_me.data
        ))
        return redirect('/')
    return render_template('index.html', title='Sign In', form=form)


@app.route('/post', methods=['POST'])
def print_data():
    text = request.data.decode('utf-8')
    bot = telegram.Bot(os.getenv('BOT_KEY'))
    message = '\n'.join([line for line in Lines(text)])
    for chat_id in os.getenv('CHAT_ID').replace(',', ' ').split():
        bot.send_message(chat_id, text=message)
    return message


if __name__ == '__main__':
    app.run()
