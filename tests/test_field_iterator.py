from bot.field_iterator import Fields


class TestFieldIterator:
    def test_without_url(self):
        expection = """#вакансия\n
Название компании: Test
Описание вакансии: Long
Технологии: #java, #js
Офис или удаленка: #офис
Адрес офиса: Moscovskaya
Занятость: #проектная, #стажировка
Зарплатная вилка: от 1000 до 2000
Контакты: example@inc.com"""
        form = {
            'address': 'Moscovskaya',
            'name': 'Test',
            'description': 'Long',
            'skills': 'java, js',
            'format': 'офис',
            'employment': 'проектная, стажировка',
            'contacts': 'example@inc.com',
            'salary': 'от 1000 до 2000',
        }
        result = '\n'.join(Fields(form))
        assert expection == result

    def test_without_address(self):
        expection = """#вакансия\n
Название компании: Test
Описание вакансии: Long
Технологии: #java, #js
Офис или удаленка: #офис
Занятость: #проектная, #стажировка
Ссылка: https://ya.ru
Зарплатная вилка: от 1000 до 2000
Контакты: example@inc.com"""
        form = {
            'name': 'Test',
            'description': 'Long',
            'skills': 'java, js',
            'format': 'офис',
            'employment': 'проектная, стажировка',
            'link': 'https://ya.ru',
            'salary': 'от 1000 до 2000',
            'contacts': 'example@inc.com'
        }
        result = '\n'.join(Fields(form))
        assert expection == result

    def test_with_all_data(self):
        expection = """#вакансия\n
Название компании: Test
Описание вакансии: Long
Технологии: #java, #js
Офис или удаленка: #офис
Адрес офиса: Moscovskaya
Занятость: #проектная, #стажировка
Ссылка: https://ya.ru
Зарплатная вилка: от 1000 до 2000
Контакты: example@inc.com"""
        form = {
            'address': 'Moscovskaya',
            'name': 'Test',
            'description': 'Long',
            'skills': 'java, js',
            'format': 'офис',
            'employment': 'проектная, стажировка',
            'link': 'https://ya.ru',
            'salary': 'от 1000 до 2000',
            'contacts': 'example@inc.com'
        }
        result = '\n'.join(Fields(form))
        assert expection == result
