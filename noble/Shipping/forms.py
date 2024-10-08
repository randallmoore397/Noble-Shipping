from noble import db
from flask_security.forms import LoginForm
from flask_wtf import FlaskForm
from wtforms import StringField,PasswordField,BooleanField,SubmitField,TextField,IntegerField,SelectField, DateField,TextAreaField,DateTimeField, TimeField,FloatField
from flask_security import login_required, current_user
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired,Length,Email,EqualTo,ValidationError,InputRequired,url
from datetime import datetime


class ContainerTracking(FlaskForm):
    INSURANCE = [('1','No Insurance'),('2','Insured')]
    STATUS = [('1','Pending'),('2','Collected'),('3','In Transit'),('4','Held at Customs'),('5','Delivered'),('6','Awaiting Pickup'),('7','Delayed'),('8','Returned to Sender')]
    tracking_number = StringField('Tracking Number', validators=[DataRequired()])
    origin = StringField('Place of Origin', validators=[DataRequired()])
    destination = StringField('Destination', validators=[DataRequired()])
    status = SelectField('Status',choices=STATUS, validators=[DataRequired()])
    last_location = StringField('Last Location', validators=[DataRequired()])
    estimated_delivery = DateField('Estimated Delivery Date', format='%Y-%m-%d')
    current_carrier = StringField('Current Carrier', validators=[DataRequired()])
    weight = StringField('Weight', validators=[DataRequired()])
    dimensions = StringField('Dimension', validators=[DataRequired()])
    contents_description = TextAreaField('Content Description', validators=[DataRequired()])
    value = StringField('Value', validators=[DataRequired()])
    insurance = SelectField('Insurance',choices=INSURANCE)
    # updated_at = DateTimeField('Date')
    updated_at = DateField('Date', format='%Y-%m-%d')
    


class ContainerTrackingHistory(FlaskForm):
    STATUS = [('1','Pending'),('2','Collected'),('3','In Transit'),('4','Held at Customs'),('5','Delivered'),('6','Awaiting Pickup'),('7','Delayed'),('8','Returned to Sender')]
    current_carrier = StringField('Carrier', validators=[DataRequired()])
    status = SelectField('Status',choices=STATUS, validators=[DataRequired()])
    location = StringField('Location', validators=[DataRequired()])
    timestamp = DateField('Date', format='%Y-%m-%d')
    

    
    
    