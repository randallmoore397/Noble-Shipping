from datetime import datetime,date
from enum import Flag, unique
from noble import db
# from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
# from itsdangerous.url_safe import URLSafeTimedSerializer as Serializer
from flask_security import UserMixin, RoleMixin
from sqlalchemy import create_engine
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Boolean, DateTime, Column, Integer, String, ForeignKey, Time, Float,Date




# Define models
roles_users = db.Table('roles_users',
        db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
        db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer(), primary_key=True)
    # username = db.Column(db.String(100),unique=True)
    user_id = db.Column(db.String(100),unique=True)
    email = db.Column(db.String(255),unique=True)
    password = db.Column(db.String(855))
    active = db.Column(db.Boolean())
    confirmed_at = db.Column(db.DateTime())
    current_login_at = db.Column(db.DateTime(),default=datetime.utcnow)
    current_login_ip = Column(String(100))
    login_count = Column(Integer)
    DateCreated = db.Column(db.DateTime(),nullable=False,default=datetime.utcnow)

    # Database relationships
    roles = db.relationship('Role', secondary=roles_users,backref=db.backref('roles', lazy='dynamic'))
    user_staff = db.relationship('Staffs', backref=db.backref('user_staff', lazy=True))


class Staffs(db.Model):
    __tablename__ = 'staffs'
    id = db.Column(db.Integer(), primary_key=True)
    profile_pic = db.Column(db.String(100),nullable=False,default='default.png')
    first_name = db.Column(db.String(50),nullable=True)
    middle_name = db.Column(db.String(50),nullable=True)
    last_name = db.Column(db.String(50),nullable=True)
    position = db.Column(db.String(100),nullable=True)
    gender = db.Column(db.String(30))
    telephone_phone = db.Column(String(16),nullable=True)
    mobile = db.Column(String(16),nullable=True)
    user_attribute = db.Column(db.String(20),nullable=False,default="")
    address =  db.Column(db.String(300),nullable=True)
    address_two =  db.Column(db.String(300),nullable=True)
    datetime =  db.Column(db.DateTime(), nullable=False,default=datetime.utcnow)


    user_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=True)
    
    def __repr__(self):
        return f"User('{self.first_name} {self.middle_name}', '{self.last_name}', '{self.position}')"
 
    
    # # Relationships
    # notifications = db.relationship('Notification', backref='user', lazy=True)


#? Cargo Table
#? Stores detailed information about each cargo item, including multiple statuses, locations, and related shipment data.
class Cargo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tracking_number = db.Column(db.String(20), unique=True, nullable=False)
    cargo_type = db.Column(db.String(50), nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Pending")
    last_location = db.Column(db.String(100), nullable=True)
    estimated_delivery = db.Column(db.DateTime(),nullable=False,default=datetime.utcnow)
    current_carrier = db.Column(db.String(100), nullable=True)
    weight = db.Column(db.String(100), nullable=True)
    dimensions = db.Column(db.String(50), nullable=True)
    contents_description = db.Column(db.String(255), nullable=True)
    value = db.Column(db.String(100), nullable=True)
    insurance = db.Column(db.String(100), nullable=True)
    barcode=db.Column(db.String(100), nullable=True)
    created_at =  db.Column(db.DateTime(),nullable=False,default=datetime.utcnow)
    updated_at =  db.Column(db.DateTime(),nullable=False,default=datetime.utcnow)
    
    # Relationships
    history = db.relationship('CargoStatusHistory', backref='history', lazy=True)
    # updates = db.relationship('CargoUpdate', backref='updates', lazy=True)
    carrier = db.relationship('Carrier', backref='carrier', lazy=True)


#? CargoStatusHistory Table
#? Tracks the status history of each cargo item, allowing you to see the entire journey of the cargo
class CargoStatusHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cargo_id = db.Column(db.Integer, db.ForeignKey('cargo.id'), nullable=False)
    current_carrier = db.Column(db.String(100), nullable=True)
    status = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)


class Aircargo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tracking_number = db.Column(db.String(20), unique=True, nullable=False)
    cargo_type = db.Column(db.String(50), nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Pending")
    last_location = db.Column(db.String(100), nullable=True)
    estimated_delivery = db.Column(db.DateTime(),nullable=False,default=datetime.utcnow)
    current_carrier = db.Column(db.String(100), nullable=True)
    weight = db.Column(db.String(100), nullable=True)
    dimensions = db.Column(db.String(50), nullable=True)
    contents_description = db.Column(db.String(255), nullable=True)
    value = db.Column(db.String(100), nullable=True)
    insurance = db.Column(db.String(100), nullable=True)
    sender_name = db.Column(db.String(100), nullable=True)
    sender_contact = db.Column(db.String(50), nullable=True)
    receiver_name = db.Column(db.String(100), nullable=True)
    receiver_contact = db.Column(db.String(50), nullable=True)
    flight_number = db.Column(db.String(20), nullable=True)
    airway_bill_number = db.Column(db.String(20), nullable=True)
    departure_date = db.Column(db.DateTime, nullable=True)
    arrival_date = db.Column(db.DateTime, nullable=True)
    barcode=db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    aircargo_history = db.relationship('AircargoStatusHistory', backref='aircargo_history', lazy=True)
    # aircargo_updates = db.relationship('AircargoUpdate', backref='aircargo_updates', lazy=True)
    aircargo_carrier = db.relationship('Carrier', backref='aircargo_carrier', lazy=True)
    
class AircargoStatusHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    aircargo_id = db.Column(db.Integer, db.ForeignKey('aircargo.id'), nullable=False)
    current_carrier = db.Column(db.String(100), nullable=True)
    status = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)


class Parcel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tracking_number = db.Column(db.String(20), unique=True, nullable=False)  # Unique identifier for tracking
    sender_name = db.Column(db.String(100), nullable=False)  # Name of the sender
    sender_address = db.Column(db.String(255), nullable=False)  # Address of the sender
    recipient_name = db.Column(db.String(100), nullable=False)  # Name of the recipient
    recipient_address = db.Column(db.String(255), nullable=False)  # Address of the recipient
    weight = db.Column(db.Float, nullable=False)  # Weight of the parcel
    dimensions = db.Column(db.String(50), nullable=True)  # Dimensions of the parcel (length x width x height)
    contents_description = db.Column(db.String(255), nullable=True)  # Description of the parcel contents
    value = db.Column(db.Float, nullable=True)  # Declared value of the parcel
    status = db.Column(db.String(50), nullable=False, default="In Transit")  # Current status (e.g., In Transit, Delivered)
    current_location = db.Column(db.String(100), nullable=True)  # Current location of the parcel
    estimated_delivery = db.Column(db.DateTime, nullable=True)  # Estimated delivery date
    delivery_date = db.Column(db.DateTime, nullable=True)  # Actual delivery date
    barcode=db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp when the record was created
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # Timestamp when the record was last updated

    # Relationships (optional, if you have related tables)
    parcel_history = db.relationship('ParcelStatusHistory', backref='parcel_history', lazy=True)  # Historical status updates
    # parcel_updates = db.relationship('ParcelUpdate', backref='parcel_updates', lazy=True)  # Updates related to the parcel
    parcel_carrier = db.relationship('Carrier', backref='parcel_carrier', lazy=True)

class ParcelStatusHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    parcel_id = db.Column(db.Integer, db.ForeignKey('parcel.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    
    
    
# #? Notification Table
# #? Manages notifications for users, including what type of notifications they receive (e.g., SMS, email).
# class Notification(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     cargo_id = db.Column(db.Integer, db.ForeignKey('cargo.id'), nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('staffs.id'), nullable=False)
#     message = db.Column(db.String(255), nullable=False)
#     notification_type = db.Column(db.String(20), nullable=False)  # e.g., "Email", "SMS"
#     sent_at = db.Column(db.DateTime, default=datetime.utcnow)



#? Carrier Table
#? Manages information about carriers (e.g., shipping companies, airlines).
class Carrier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    contact_info = db.Column(db.String(255), nullable=True)
    tracking_url = db.Column(db.String(255), nullable=True)
    
    # Relationships
    # cargos = db.relationship('Cargo', backref='carrier', lazy=True)
    cargos = db.Column(db.Integer, db.ForeignKey('cargo.id'), nullable=False)
    aircargo = db.Column(db.Integer, db.ForeignKey('aircargo.id'), nullable=False)
    parcel = db.Column(db.Integer, db.ForeignKey('parcel.id'), nullable=False)

#? Insurance Table (Optional)
class Insurance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cargo_id = db.Column(db.Integer, db.ForeignKey('cargo.id'), nullable=False)
    provider_name = db.Column(db.String(100), nullable=False)
    policy_number = db.Column(db.String(100), nullable=False)
    coverage_amount = db.Column(db.Float, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    
    # Relationships
    insurance_cargo = db.relationship('Cargo', backref=db.backref('insurance_cargo', uselist=False))


    
class RequestQuote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    service=db.Column(db.String(200), nullable=False)
    weight=db.Column(db.String(100), nullable=False)
    length=db.Column(db.String(100), nullable=False)
    height=db.Column(db.String(100), nullable=False)
    from_country=db.Column(db.String(160), nullable=False)
    to_country=db.Column(db.String(160), nullable=False)
    email_address=db.Column(db.String(160), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    
class GetInTouch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.String(100), nullable=False)
    last_name=db.Column(db.String(100), nullable=False)
    email=db.Column(db.String(100), nullable=False)
    website=db.Column(db.String(200), nullable=True)
    message=db.Column(db.String(1000), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)