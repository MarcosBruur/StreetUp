from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import exceptions
from .models import Users

class MongoJWTAuthentication(JWTAuthentication):
    """
    Autenticación JWT personalizada para usuarios MongoEngine
    """
    def get_user(self, validated_token):
        try:
            user_id = validated_token.get("user_id")
            if not user_id:
                raise exceptions.AuthenticationFailed("El token no contiene user_id", code="token_no_user_id")
            
            user = Users.objects.get(id=user_id)
            return user
        except Users.DoesNotExist:
            raise exceptions.AuthenticationFailed("Usuario no encontrado", code="user_not_found")
