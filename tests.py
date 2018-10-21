import unittest

from line_iterator import Lines


class TestLineIterator(unittest.TestCase):
    def test_with_url(self):
        expection = """#вакансия
Название компании: Test
Описание вакансии: Long
Технологии: #java, #js
Офис или удаленка: #офис
Адрес офиса: Moscovskaya
Тип работы: #проектная, #стажировка
Ссылка: https://ya.ru
Зарплатная вилка: от 1000 до 2000"""
        text = ['Test', 'Long', 'java, js', 'офис', 'Moscovskaya',
                'проектная, стажировка', 'https://ya.ru', 'от 1000 до 2000']
        result = '\n'.join(Lines(text))
        self.assertEqual(result, expection)

    def test_without_url(self):
        expection = """#вакансия
Название компании: Test
Описание вакансии: Long
Технологии: #java, #js
Офис или удаленка: #офис
Адрес офиса: Moscovskaya
Тип работы: #проектная, #стажировка
Зарплатная вилка: 1000 => 2000"""
        text = ['Test', 'Long', 'java, js', 'офис', 'Moscovskaya',
                'проектная, стажировка', '', '1000 => 2000']
        result = '\n'.join(Lines(text))
        self.assertEqual(result, expection)


if __name__ == '__main__':
    unittest.main()
