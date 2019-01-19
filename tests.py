import unittest

from line_iterator import Lines


class TestLineIterator(unittest.TestCase):
    def test_with_url(self):
        expection = """#вакансия\n
Название компании: Test
Описание вакансии: Long
Технологии: #java, #js
Офис или удаленка: #офис
Адрес офиса: Moscovskaya
Тип работы: #проектная, #стажировка
Ссылка: https://ya.ru
Зарплатная вилка: от 1000 до 2000
Контакты: example@inc.com"""
        text = """Test
===============
 Long
===============
 java, js
===============
 офис
===============
 Moscovskaya
===============
 проектная, стажировка
===============
  https://ya.ru
===============
 от 1000 до 2000
===============
 example@inc.com"""

        result = '\n'.join(Lines(text))
        self.assertEqual(result, expection)

    def test_without_url(self):
        expection = """#вакансия\n
Название компании: Test
Описание вакансии: Long
Технологии: #java, #js
Офис или удаленка: #офис
Адрес офиса: Moscovskaya
Тип работы: #проектная, #стажировка
Зарплатная вилка: от 1000 до 2000
Контакты: example@inc.com"""
        text = """Test
===============
 Long
===============
 java, js
===============
 офис
===============
 Moscovskaya
===============
 проектная, стажировка
===============
===============
 от 1000 до 2000
===============
 example@inc.com"""
        result = '\n'.join(Lines(text))
        self.assertEqual(result, expection)

    def test_without_address(self):
        expection = """#вакансия\n
Название компании: Test
Описание вакансии: Long
Технологии: #java, #js
Офис или удаленка: #офис
Тип работы: #проектная, #стажировка
Ссылка: https://ya.ru
Зарплатная вилка: от 1000 до 2000
Контакты: example@inc.com"""
        text = """Test
===============
 Long
===============
 java, js
===============
 офис
===============
===============
 проектная, стажировка
===============
  https://ya.ru
===============
 от 1000 до 2000
===============
 example@inc.com"""
        result = '\n'.join(Lines(text))
        self.assertEqual(result, expection)

    def test_with_all_data(self):
        expection = """#вакансия\n
Название компании: Test
Описание вакансии: Long
Технологии: #java, #js
Офис или удаленка: #офис
Адрес офиса: Moscovskaya
Тип работы: #проектная, #стажировка
Ссылка: https://ya.ru
Зарплатная вилка: от 1000 до 2000
Контакты: example@inc.com"""
        text = """Test
===============
 Long
===============
 java, js
===============
 офис
===============
 Moscovskaya
===============
 проектная, стажировка
===============
  https://ya.ru
===============
 от 1000 до 2000
===============
 example@inc.com"""
        result = '\n'.join(Lines(text))
        self.assertEqual(result, expection)

    def test_data_new_form(self):
        expection = """#вакансия\n
Название компании: test
Описание вакансии: test
Технологии: #test
Офис или удаленка: #офис
Адрес офиса: test
Тип работы: #полная
Ссылка: test
Зарплатная вилка: от 1 до 2
Контакты: 123"""
        text = """test
===============
test
===============
test
===============
офис
===============
test
===============
полная
===============
test
===============
от 1 до 2
===============
123"""
        result = '\n'.join(Lines(text))
        self.assertEqual(result, expection)


if __name__ == '__main__':
    unittest.main()
