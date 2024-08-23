
from flask_security.forms import LoginForm
from wtforms import StringField,PasswordField,BooleanField,SubmitField,TextField,IntegerField,SelectField, DateField,TextAreaField,DateTimeField, TimeField, RadioField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired,Length,Email,EqualTo,ValidationError,InputRequired,url
from wtforms.fields.html5 import DateField, TimeField,URLField
from wtforms_sqlalchemy.fields import QuerySelectField
from flask_wtf import FlaskForm
from datetime import datetime


class Registration(FlaskForm):
    email=StringField('Email Address', validators=[DataRequired()])
    first_name=StringField('First Name', validators=[DataRequired()])
    middle_name=StringField('Middle Name')
    last_name=StringField('Last Name', validators=[DataRequired()])
    profile_pic = FileField('Profile',validators=[FileAllowed(['jpg', 'png','jpeg', 'webp'])])
    password_one =  StringField('Password',validators=[DataRequired()])
    password_two =  StringField('Confirm Password',validators=[EqualTo('password_one',message='Confirm Password but be same as First Password')])
    
    submit = SubmitField("Create Account")
    
    
class ResetMyPassword(FlaskForm):
    email_addr = StringField('Email', validators=[DataRequired()])
    old_password = StringField('Old Password', validators=[DataRequired()])
    password_one =  StringField('New Password',validators=[DataRequired()])
    password_two =  StringField('Confirm Password',validators=[EqualTo('password_one',message='Confirm Password but be same as First Password')])
    submit = SubmitField("Reset Password")
    
class ResetPassword(FlaskForm):
    email_addr = StringField('Email', validators=[DataRequired()])
    password_one =  StringField('Password',validators=[DataRequired()])
    password_two =  StringField('Confirm Password',validators=[EqualTo('password_one',message='Confirm Password but be same as First Password')])
    submit = SubmitField("Reset Password")



class MyProfile(FlaskForm):
    GENDER = [('1','Male'),('2','Female')]
    email=StringField('Email Address', validators=[DataRequired()])
    first_name=StringField('First Name', validators=[DataRequired()])
    middle_name=StringField('Middle Name')
    last_name=StringField('Last Name', validators=[DataRequired()])
    profile_pic = FileField('Profile',validators=[FileAllowed(['jpg', 'png','jpeg', 'webp'])])
    position = StringField('Account Role')
    gender = SelectField('Gender',choices=GENDER)
    telephone_phone = StringField('Telephone')
    mobile = StringField('Mobile')
    address =  TextAreaField('Address 1')
    address_two =  TextAreaField('Address 2')
    submit = SubmitField("Save Changes")