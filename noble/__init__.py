from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from noble.config import Config
app = Flask(__name__)


db = SQLAlchemy()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    
    #?##################### BLUEPRINTS #########################
    from noble.Main.route import main
    from noble.Shipping.route import shipping
    from noble.User.route import user
    from noble.Airline.route import airline
    from noble.Error.route import error



    #?################### REGISTER BLUEPRINTS ##################
    app.register_blueprint(main)
    app.register_blueprint(shipping)
    app.register_blueprint(user)
    app.register_blueprint(airline)
    app.register_blueprint(error)

    return app