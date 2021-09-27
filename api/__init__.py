# """ 
# The api package is defined by the api directory and the __init__.py script, and is referenced in the from api import routes statement. The app variable is defined as an instance of class Flask in the __init__.py script, which makes it a member of the api package. 
# """

from flask import Flask
from flask_jwt_extended.jwt_manager import JWTManager
from api.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from werkzeug.security import generate_password_hash


db = SQLAlchemy()
ma = Marshmallow()
jwt = JWTManager()

def create_app():
    
    app = Flask(__name__)
    
    app.config.from_object(Config)
    
    db.init_app(app)
    
    ma.init_app(app)
    
    jwt.init_app(app)
    
    from api.models import User, Product
    
    migrate = Migrate(app, db)
     
    from api.auth import bp as auth_bp
    app.register_blueprint(auth_bp)
    
    from api.products import bp as products_bp
    app.register_blueprint(products_bp)
    
    @app.cli.command("db_create")
    def db_create():

        db.create_all()
        print("Database Created!")
        
    @app.cli.command("db_seed")
    def db_seed():

        mr_big = Product(name = "Mr. Big", type = "Candy", weight = "400g", inventory_count = 10)

        nerds = Product(name = "Nerds", type = "Candy", weight = "250g", inventory_count = 30)

        m_and_ms = Product(name = "M & M's", type = "Candy", weight = "600g", inventory_count = 50)

        db.session.add(mr_big)

        db.session.add(nerds)
        
        db.session.add(m_and_ms)
        
        test_user = User(first_name = "John",
                        last_name = "Doe",
                        email = "jdoe@gmail.com",
                        password_hash = generate_password_hash("password123"))
        
        db.session.add(test_user)
        
        db.session.commit()

        print("Database Seeded!")

    @app.cli.command("db_drop")
    def db_drop():

        db.drop_all()
        print("Database dropped!")
    
    return app
