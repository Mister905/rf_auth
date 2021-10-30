from api.products import bp
from flask import request, jsonify
from api.models import Product
from api.schemas import ProductSchema
from flask_jwt_extended import jwt_required
from api import db

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

@bp.route("/api/products", methods=["GET"])
@jwt_required()
def get_products():
    product_list = Product.query.all()
    serialized_product_list = products_schema.dump(product_list)
    return jsonify({"product_list": serialized_product_list})

  
@bp.route("/api/products/<int:id>", methods=["GET"])
@jwt_required()
def get_product(id: int):
    product = Product.query.filter_by(id=id).first()
    if product:
        serialized_product = product_schema.dump(product)
        return jsonify({"product": serialized_product})
    else:
        return jsonify({
            "error": 1,
            "message": "Product not found."
        }), 404
        
    
@bp.route("/api/products", methods=["POST"])
@jwt_required(fresh=True)
def create_product():
    name = request.json["name"]
    test = Product.query.filter_by(name=name).first()
    if test:
        return jsonify({
            "error": 1,
            "message": "A product with that name already exists."
        }), 409
    else:
        type = request.json["type"]
        weight = request.json["weight"]
        inventory_count = int(request.json["inventory_count"])

        new_product = Product(name=name,
                            type=type,
                            weight=weight,
                            inventory_count=inventory_count)
        
        serialized_product = product_schema.dump(new_product)

        db.session.add(new_product)
        db.session.commit()
        
        return jsonify({
            "success": 1,
            "message": "Product creation successful.",
            "product": serialized_product
        }), 201
    
    
@bp.route("/api/products", methods=["PUT"])
@jwt_required()
def update_product():
    id = request.json["id"]
    product = Product.query.filter_by(id=id).first()
    if product:
        product.name = request.json["name"]
        product.type = request.json["type"]
        product.inventory_count = request.json["inventory_count"]
    
        db.session.commit()

        return jsonify({
            "success": 1,
            "message": "Product update successful."
        }), 202

    else:
        return jsonify({
            "error": 1,
            "message": "Product update failed."
        }), 404
    
    
@bp.route("/api/products/<int:id>", methods=["DELETE"])
@jwt_required()
def remove_product(id: int):
    product = Product.query.filter_by(id=id).first()
    if product:
        db.session.delete(product)
        db.session.commit()

        return jsonify({
            "success": 1,
            "message": "Product deletion successful."
        }), 202

    else:

        return jsonify({
            "error": 1,
            "message": "That product does not exist."
        }), 404