#!/usr/bin/env python
import os
import re
from typing import List

from dotenv import load_dotenv
from flask import Flask, request
import telegram

load_dotenv()


class Lines:
    captions = ('Название компании', 'Описание вакансии', 'Технологии', 'Офис или удаленка', 'Тип работы', 'Ссылка', 'Зарплатная вилка')

    def __init__(self, values: List[str]):
        self.values = values
        self.index = -1

    def __iter__(self):
        return self
    
    def __next__(self) -> str:
        if len(self.captions) == self.index or len(self.values) == self.index:
            raise StopIteration
        if self.index == -1:
            result = 'вакансия'
        else:
            value = self.value
            while value == '':  # skip empty lines
                self.index += 1
                value = self.value
            result = f'{self.captions[self.index]}: {value}'
        self.index += 1
        return result 
    
    @property
    def value(self) -> str:
        def add_hashtag(text: str) -> str:
            regex = re.compile(r'\w+')
            my_list = regex.findall(text)
            return ', '.join([f"#{word}" for word in my_list])

        result = self.values[self.index]
        if self.index in (2, 3, 4):
            result = add_hashtag(result)
        return result


app = Flask(__name__)


@app.route('/')
def print_hello():
    return "Test message"


@app.route('/post', methods=['POST'])
def print_data():
    def split_text(text: str) -> List[str]:
        return [x.strip() for x in re.compile(r'=+').split(text)]

    values = split_text(request.data.decode('utf-8'))
    bot = telegram.Bot(os.getenv('BOT_KEY'))
    message = '\n'.join([line for line in Lines(values)])
    bot.send_message(chat_id=os.getenv('CHAT_ID'), text=message)
    return message


if __name__ == '__main__':
    app.run()
