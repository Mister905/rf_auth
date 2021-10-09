from api.auth import bp
from flask import json, request, jsonify
from api.models import User
from api import db
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, current_user
from werkzeug.security import generate_password_hash



@bp.route("/api/auth/load_active_user", methods=["GET"])
@jwt_required()
def load_active_user():

    # We can now access our sqlalchemy User object via `current_user`.
    # current_user = get_jwt_identity()
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

    # user = User.query.filter_by(email=get_jwt_identity()).first() # Filter DB by token (email)
    # new_about = About(description=description, user=user)

#     router.get("/active_user", auth, async (req, res) => {
#   try {
#     const user = await User.findById(req.user.id).select("-password");
#     res.send(user);
#   } catch (error) {
#     console.log(error.message);
#     res.status(500).send("Server Error");
#   }
# }); 

     

@bp.route("/api/auth/login", methods=["POST"])
def login():

    email = request.json["email"]
    password = request.json["password"]

    if not email:
        return jsonify(error=True, message="Email is a required field")
    if not password:
        return jsonify(error=True, message="Password is a required field")

    user = User.query.filter_by(email=email).first()
    
    if user is None:
        return jsonify(error=True, message="Unable to login")

    elif not user.check_password(password):
        return jsonify(error=True, message="Unable to login")

    else:
        token = create_access_token(identity=email)
        return jsonify(token=token, email=email)     
    

@bp.route("/api/auth/register", methods=["POST"])
def register():

    first_name = request.json["first_name"]
    last_name = request.json["last_name"]
    email = request.json["email"]
    password = request.json["password"]
    
    if not email:
        return jsonify(error=True, message="Email is a required field")

    if not password:
        return jsonify(error=True, message="Password is a required field")

    is_preexisting_account = User.query.filter_by(email=email).first()

    if is_preexisting_account:
        return jsonify(error=True, message="An account with that email already exists")
    
    elif request.json["password"] != request.json["confirm_password"]:
        return jsonify(error=True, message="Passwords must match")

    user = User(first_name=first_name, last_name=last_name, email=email)

    user.set_password(password)
    
    db.session.add(user)

    db.session.commit()
    
    return jsonify(success=True, message="User successfully created"), 201