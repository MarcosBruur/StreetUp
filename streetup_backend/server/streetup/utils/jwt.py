from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework import status
from ..models import Users
from ..utils.auth import checkPassword

def generate_jwt_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }

def login_with_jwt(request):
    
    email = request.data.get("email")
    password = request.data.get("password")
    errors = []

    if not email:
        errors.append({"email":"Email es requerido"})

    if not password:
        errors.append({"password":"Contraseña es requerida"})


    if len(errors) > 0:
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)



    user = Users.objects(email=email).first()
    print("Email recibido:", email)
    print("Usuario encontrado:", user)
    print("Password match:", checkPassword(password, user.password) if user else "no")
    if not user or not checkPassword(password, user.password):
        return Response({"error": "Email o contraseña incorrectos"}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.confirmed:
        return Response({"error": "Cuenta no confirmada"}, status=status.HTTP_403_FORBIDDEN)

    tokens = generate_jwt_for_user(user)

    return JsonResponse({
        "message":"Login exitoso",
        "tokens": tokens,
        "user": user.to_dict()
    }, status=status.HTTP_200_OK)
