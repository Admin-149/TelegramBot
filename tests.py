import unittest

from line_iterator import Lines


class TestLineIterator(unittest.TestCase):
  def test_with_url(self):
      expection = """вакансия
Название компании: Test
Описание вакансии: Long
Технологии: #java, #js
Офис или удаленка: #офис
Тип работы: #проектная, #стажировка
Ссылка: https://ya.ru
Зарплатная вилка: 1000 => 2000"""
      text = ['Test', 'Long', 'java, js', 'офис', 'проектная, стажировка', 'https://ya.ru', '1000 => 2000']
      result = '\n'.join(Lines(text))
      self.assertEqual(result, expection)

  def test_without_url(self):
      expection = """вакансия
Название компании: Test
Описание вакансии: Long
Технологии: #java, #js
Офис или удаленка: #офис
Тип работы: #проектная, #стажировка
Зарплатная вилка: 1000 => 2000"""
      text = ['Test', 'Long', 'java, js', 'офис', 'проектная, стажировка', '', '1000 => 2000']
      result = '\n'.join(Lines(text))
      self.assertEqual(result, expection)


if __name__ == '__main__':
    unittest.main()