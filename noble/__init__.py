from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from noble.config import Config

from flask_bcrypt import Bcrypt
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required
from flask_mail import Mail
from noble.Main.forms import ExtendedLogin

app = Flask(__name__)

db = SQLAlchemy()
security = Security()
mail = Mail()
bcrypt = Bcrypt()
from noble.models import User, Role
# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)




def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    mail.init_app(app)
    bcrypt.init_app(app)
    
    
    
    #?##################### BLUEPRINTS #########################
    from noble.Main.route import main
    from noble.Shipping.route import shipping
    from noble.User.route import user
    from noble.Airline.route import airline
    from noble.Error.route import error

    from noble.User.Admin.route import admin
    from noble.User.Clients.route import client
   

    #?################### REGISTER BLUEPRINTS ##################
    app.register_blueprint(main)
    app.register_blueprint(shipping)
    app.register_blueprint(user)
    app.register_blueprint(airline)
    app.register_blueprint(error)

    app.register_blueprint(admin)
    app.register_blueprint(client)
    
    
    
    from noble.models import User, Role
    # Setup Flask-Security
    user_datastore = SQLAlchemyUserDatastore(db, User, Role)
    security = Security(app, user_datastore,login_form=ExtendedLogin)


    
    return app