from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, TextAreaField, SelectField
from wtforms.validators import DataRequired


class LoginForm(FlaskForm):
    name = StringField('Название компании', validators=[
        DataRequired(message="Необходимо заполнить")])
    description = TextAreaField('Описание вакансии', validators=[
        DataRequired(message="Необходимо заполнить")])
    skills = StringField('Технологии', validators=[
        DataRequired(message="Необходимо заполнить")])
    job_format = SelectField('Формат работы', choices=[
                             ('none', '--'), ('office', 'Офис'), ('remote', 'Удаленка')])
    submit = SubmitField('Sign In')
