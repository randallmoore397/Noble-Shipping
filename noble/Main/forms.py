from flask_security.forms import LoginForm
from wtforms import StringField, BooleanField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email
from wtforms.validators import DataRequired
from flask_wtf import FlaskForm

class ExtendedLogin(FlaskForm):
    email = StringField('Username', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    
    
    
class AircargoTracking(FlaskForm):
    tracking_number = StringField('Tracking Number', validators=[DataRequired()])
    submit = SubmitField("Submit Number")
    
    
    
class ContainerTracking(FlaskForm):
    tracking_number = StringField('Tracking Number', validators=[DataRequired()])
    submit = SubmitField("Submit Number")