from noble import db
from flask_security.forms import LoginForm
from flask_wtf import FlaskForm
from wtforms import StringField,PasswordField,BooleanField,SubmitField,TextField,IntegerField,SelectField, DateField,TextAreaField,DateTimeField, TimeField,FloatField
from flask_security import login_required, current_user
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired,Length,Email,EqualTo,ValidationError,InputRequired,url
from datetime import datetime

class AircargoTracking(FlaskForm):
    INSURANCE = [('1','No Insurance'),('2','Insured')]
    STATUS = [('1','Pending'),('2','Collected'),('3','In Transit'),('4','Held at Customs'),('5','Delivered'),('6','Awaiting Pickup'),('7','Delayed'),('8','Returned to Sender')]
    tracking_number = StringField('Tracking Number', validators=[DataRequired()])
    origin = StringField('Place of Origin', validators=[DataRequired()])
    destination = StringField('Destination', validators=[DataRequired()])
    status = SelectField('Status',choices=STATUS, validators=[DataRequired()])
    last_location = StringField('Last Location', validators=[DataRequired()])
    estimated_delivery = DateField('Estimated Delivery Date', format='%Y-%m-%d')
    current_carrier = StringField('Airline', validators=[DataRequired()])
    weight = StringField('Weight', validators=[DataRequired()])
    dimensions = StringField('Dimension', validators=[DataRequired()])
    contents_description = TextAreaField('Content Description', validators=[DataRequired()])
    value = StringField('Value', validators=[DataRequired()])
    insurance = SelectField('Insurance',choices=INSURANCE)
    sender_name = StringField("Sender's Name", validators=[DataRequired()])
    sender_contact = StringField("Sender's Contact", validators=[DataRequired()])
    receiver_name = StringField('Receiver Name', validators=[DataRequired()])
    receiver_contact = StringField('Receiver Contact', validators=[DataRequired()])
    # flight_number = StringField('Flight Number', validators=[DataRequired()])
    airway_bill_number = StringField('Airway Bill Number', validators=[DataRequired()])
    departure_date = DateField('Departure Date', format='%Y-%m-%d')
    arrival_date = DateField('Arrival Date', format='%Y-%m-%d')
    updated_at = DateField('Date Created', format='%Y-%m-%d')  
    
    
    
class AircargoTrackingHistory(FlaskForm):
    STATUS = [('1','Pending'),('2','Collected'),('3','In Transit'),('4','Held at Customs'),('5','Delivered'),('6','Awaiting Pickup'),('7','Delayed'),('8','Returned to Sender')]
    current_carrier = StringField('Carrier', validators=[DataRequired()])
    status = SelectField('Status',choices=STATUS, validators=[DataRequired()])
    location = StringField('Location', validators=[DataRequired()])
    timestamp = DateField('Date', format='%Y-%m-%d')
