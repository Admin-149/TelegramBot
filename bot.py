import telegram
from flask import Flask, request

BOT_KEY = ''
CHAT_ID = ''

params = ['Название компании', 'Описание вакансии',
          'Технологии', 'Офис или удаленка', 'Тип работы', 'Ссылка', 'Зарплатная вилка']


def split_text(text):
    return text.split('\n===============\n')


def generate_message(params, values):
    message = ''
    for param, value in zip(params, values):
        message = message + param + ': ' + value + '\n'
    return message


app = Flask(__name__)


@app.route('/')
def print_hello():
    return "Test message"


@app.route('/post', methods=['POST'])
def print_data():
    values = split_text(request.data.decode('utf-8'))
    bot = telegram.Bot(BOT_KEY)
    message = generate_message(params, values)
    bot.send_message(chat_id=CHAT_ID, text=message)
    return message


if __name__ == '__main__':
    app.run()

#bot = telegram.Bot(BOT_KEY)
#bot.send_message(chat_id=CHAT_ID, text=message)
