import os
import sys

from dotenv import load_dotenv
from flask import Flask, request, render_template, jsonify
from bot.field_iterator import Fields
import telegram

proxy_url = os.getenv('PROXY_URL')
pp = None if not proxy_url else telegram.utils.request.Request(proxy_url=proxy_url)


load_dotenv()


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/', methods=['GET'])
    def root():
        return render_template('index.html')

    @app.route('/message', methods=['POST'])
    def send_message():
        form = request.get_json()
        print(form, file=sys.stderr)
        bot = telegram.Bot(os.getenv('BOT_KEY'), request=pp)
        message = '\n'.join([field for field in Fields(form)])
        chat_title = os.getenv('CHAT_TITLE')
        for chat_id in os.getenv('CHAT_ID').replace(',', ' ').split():
            bot.send_message(chat_id, text=message)
        response = {'chatTitle': chat_title}
        return jsonify(response)

    return app
