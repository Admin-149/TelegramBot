import telegram
from flask import Flask, request

BOT_KEY = ''
CHAT_ID = ''

params = ['Название компании', 'Описание вакансии',
          'Технологии', 'Офис или удаленка', 'Тип работы', 'Ссылка', 'Зарплатная вилка']


def text_to_array(text):
    num = 0
    arr = text.split('\n')
    new_arr = []
    for line in arr:
        if num % 2 == 0:
            new_arr.append(line.strip(" "))
        num = num + 1
    return new_arr


def generate_message(params, values):
    message = ''
    for n in range(7):
        message = message + params[n] + ': ' + values[n] + '\n'
    return message


app = Flask(__name__)


@app.route('/post', methods=['POST'])
def print_data():
    values = text_to_array(request.data.decode('utf-8'))
    return generate_message(params, values)


if __name__ == '__main__':
    app.run()

#bot = telegram.Bot(BOT_KEY)
#bot.send_message(chat_id=CHAT_ID, text=message)
