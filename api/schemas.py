from api import ma

class UserSchema(ma.Schema):
    class Meta:
        fields = ("id", "first_name", "last_name", "email", "password")
        
class ProductSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "type", "weight", "inventory_count")