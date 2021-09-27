from flask import Blueprint

bp = Blueprint("products", __name__)

from api.products import routes