import re
from typing import List


class Lines:
    captions = ('Название компании', 'Описание вакансии', 'Технологии',
                'Офис или удаленка', 'Адрес офиса', 'Тип работы', 'Ссылка', 'Зарплатная вилка')

    def __init__(self, values: List[str]):
        self.values = values
        self.index = -1

    def __iter__(self):
        return self

    def __next__(self) -> str:
        if len(self.captions) == self.index or len(self.values) == self.index:
            raise StopIteration
        if self.index == -1:
            result = '#вакансия'
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
        if self.index in (2, 3, 5):
            result = add_hashtag(result)
        return result
