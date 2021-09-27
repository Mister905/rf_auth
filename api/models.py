from datetime import datetime
from api import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):

    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    creation_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)
        
    
class Product(db.Model):
    
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    weight = db.Column(db.String)
    inventory_count = db.Column(db.Integer)
    
    def __repr__(self):
        return '<Product {}>'.format(self.body)