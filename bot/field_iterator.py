import re


class Fields:
    fields_config = (
        {
            'name': 'name',
            'caption': 'Название компании',
            'is_hashtag': False
        },
        {
            'name': 'description',
            'caption': 'Описание вакансии',
            'is_hashtag': False
        },
        {
            'name': 'skills',
            'caption': 'Технологии',
            'is_hashtag': True,
        },
        {
            'name': 'format',
            'caption': 'Офис или удаленка',
            'is_hashtag': True,
        },
        {
            'name': 'address',
            'caption': 'Адрес офиса',
            'is_hashtag': False
        },
        {
            'name': 'employment',
            'caption': 'Занятость',
            'is_hashtag': True,
        },
        {
            'name': 'link',
            'caption': 'Ссылка',
            'is_hashtag': False
        },
        {
            'name': 'salary',
            'caption': 'Зарплатная вилка',
            'is_hashtag': False
        },
        {
            'name': 'contacts',
            'caption': 'Контакты',
            'is_hashtag': False
        },
    )

    def __init__(self, values: dict):
        self.values = values
        self.index = -1

    def __iter__(self):
        return self

    def __next__(self) -> str:
        if len(self.fields_config) == self.index:
            raise StopIteration
        if self.index == -1:
            result = '#вакансия\n'
        else:
            value = self.value
            while value == '':  # skip empty lines
                self.index += 1
                if len(self.fields_config) == self.index:
                    raise StopIteration
                value = self.value
            result = f'{self.fields_config[self.index]["caption"]}: {value}'
        self.index += 1
        return result

    @property
    def value(self) -> str:
        def add_hashtag(text: str) -> str:
            regex = re.compile(r'\w+')
            my_list = regex.findall(text)
            return ', '.join([f"#{word}" for word in my_list])

        field = self.fields_config[self.index]
        result = '' if field['name'] not in self.values else self.values[field['name']]

        if field['is_hashtag']:
            result = add_hashtag(result)
        return result
