from django.http.response import JsonResponse
from django.core.mail import send_mail, EmailMultiAlternatives
from .serializers import UserSerializer, ProfileSerializer, TeamSerializer, TokenSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Users, Profiles, Teams, Tokens
from rest_framework.decorators import action
from .utils.auth import hashPassword, checkPassword
from .utils.token import generateToken
from .utils.jwt import login_with_jwt
from .email.AuthEmail import AuthEmail
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from django.views.generic import TemplateView
from django.conf import settings
from django.db import transaction
from rest_framework import parsers

# Create your views here.


class HomeView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["debug"] = settings.DEBUG  # ← aquí pasás la variable
        return context


class AuthViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def list(self, request):
        return Response({
            "message": "Endpoints disponibles:",
        })

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def create_account(self, request):
        data = request.data.copy()
        # validate user unique

        userExists = Users.objects(email=data["email"]).first()
        if userExists:
            return JsonResponse({"error": "El email ingresado ya está en uso"}, status=status.HTTP_409_CONFLICT)

        # Hash password
        raw_password = data.get('password')
        data["password"] = hashPassword(raw_password)

        userSerializer = UserSerializer(data=data)

        userSerializer.is_valid(raise_exception=True)
        userSerializer.save()

        # Generate token
        user_instance = Users.objects.get(id=userSerializer.data["id"])
        token_data = {"token": generateToken(), "user": str(user_instance.id)}

        tokenSerializer = TokenSerializer(data=token_data)
        tokenSerializer.is_valid(raise_exception=True)

        token = tokenSerializer.save()

        # Send email

        AuthEmail.send_confirmation_email(
            {"userName": data['userName'], "email": data['email'], "token": tokenSerializer.data['token']})
        return Response({"message": "usuario creado correctamente, revisa tu email para activar tu cuenta", "email": data['email']}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def send_email(self, request):
        data = request.data.copy()

        email = data.get("email")

        if not email:
            return Response(
                {"error": "El email es obligatorio"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validar usuario existente
        user_instance = Users.objects(email=email).first()
        if not user_instance:
            return Response(
                {"error": "No existe un usuario con ese email"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Generar nuevo token
        token_data = {
            "token": generateToken(),
            "user": str(user_instance.id)
        }

        tokenSerializer = TokenSerializer(data=token_data)
        tokenSerializer.is_valid(raise_exception=True)
        token = tokenSerializer.save()

        # Enviar email
        AuthEmail.send_confirmation_email({
            "userName": user_instance.userName,
            "email": user_instance.email,
            "token": tokenSerializer.data["token"]
        })

        return Response(
            {"message": "Se envió un nuevo codigo a tu email, revisa tu bandeja de entrada"},
            status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=['post'])
    def confirm_account(self, request):
        token_value = request.data.get('token')
        if not token_value:
            return JsonResponse({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token_obj = Tokens.objects.get(token=token_value)
            user = token_obj.user
            user.confirmed = True
            user.save()

            token_obj.delete()
            return JsonResponse({"message": "Cuenta confirmada correctamente"}, status=status.HTTP_200_OK)
        except Tokens.DoesNotExist:
            return JsonResponse({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        return login_with_jwt(request)

    @action(detail=False, methods=['get'])
    def user(self, request):
        user = request.user

        if not user or not user.is_authenticated:
            return JsonResponse(
                {"error": "Usuario no autenticado"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        return Response(user.to_dict(), status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def list(self, request):
        users = Users.objects.all()
        serializer = UserSerializer(users, many=True)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            user = Users.objects.get(id=pk)
            serializer = UserSerializer(user)

            return JsonResponse(serializer.data)
        except Users.DoesNotExist:
            return Response('Usuario no econtrado', status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def addProfile(self, request, pk=None):
        try:
            user = Users.objects.get(id=pk)
            profile_id = request.data.get('profile')

            if not profile_id:
                return Response({'error': 'El campo profile es requerido'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                profile = Profiles.objects.get(id=profile_id)
            except Profiles.DoesNotExist:
                return Response({'error': 'Perfil no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            user.profile = profile
            user.save()

            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)

        except Users.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)


class ProfileViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def list(self, request):
        profile = Profiles.objects.all()
        serializer = ProfileSerializer(profile, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = ProfileSerializer(
            data=request.data, context={"request": request})

        serializer.is_valid()
        profile = serializer.save()

        user = request.user
        user.profile = profile.id
        user.save(update_fields=['profile'])

        return Response(ProfileSerializer(profile).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['put'], parser_classes=[MultiPartParser, FormParser])
    def editProfile(self, request):
        print(request.data)
        print(request.FILES)
        try:
            user = request.user.to_dict()
            profile = Profiles.objects.get(id=user['profile'])

            serializer = ProfileSerializer(
                profile,
                data=request.data,
                partial=True,
                context={"request": request}
            )
            if not serializer.is_valid():
                print(serializer.errors)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response("Perfil actualizado", status=200)

        except Profiles.DoesNotExist:
            return Response('Perfil no encontrado', status=404)

    def retrieve(self, request, pk=None):
        try:
            profile = Profiles.objects.get(id=pk)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        except Profiles.DoesNotExist:
            return Response('Perfil no encontrado', status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def getProfile(self, request):
        try:
            user = request.user.to_dict()
            profile = Profiles.objects.get(id=user['profile'])
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)

        except Profiles.DoesNotExist:
            return Response('Perfil no encontrado', status=status.HTTP_404_NOT_FOUND)

    def destroy(self, *args, **kwargs):
        # Limpia la referencia en Users
        Users.objects(profile=self).update(unset__profile=1)

        # Ahora sí elimina el perfil
        return super().delete(*args, **kwargs)

    @action(detail=True, methods=['post'])
    def changeStatus(self, request, pk=None):
        try:
            profile = Profiles.objects.get(id=pk)
        except Profiles.DoesNotExist:
            return Response('Perfil no econtrado', status=status.HTTP_404_NOT_FOUND)

        serializer = ProfileSerializer(data=request.data, partial=True)

        if serializer.is_valid():
            new_status = serializer.validated_data.get('status')
            profile.status = new_status
            profile.save()
            return Response('Estado Actualizado', status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def upload_photo(self, request, pk=None):
        try:
            profile = Profiles.objects.get(id=pk)
        except Profiles.DoesNotExist:
            return Response({'error': 'Perfil no encontrado'}, status=404)

        photo = request.FILES.get('photo')

        if not photo:
            return Response({'error': 'No se envió ninguna imagen'}, status=400)

        # Guardar archivo en /media/profiles/
        from django.core.files.storage import default_storage
        filename = default_storage.save(f"profiles/{photo.name}", photo)

        profile.photoUrl = f"/media/{filename}"
        profile.save()

        return Response({'photoUrl': profile.photoUrl}, status=200)


class TeamPagination(PageNumberPagination):
    page_size = 10  # cantidad por página
    page_size_query_param = 'page_size'
    max_page_size = 100


class TeamViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def list(self, request):
        teams = Teams.objects.all()

        search = request.query_params.get("search")
        sport = request.query_params.get("sport")

        if search:
            teams = teams.filter(
                name__icontains=search
            )

        if sport:
            teams = teams.filter(sport=sport)

        paginator = TeamPagination()
        paginated_teams = paginator.paginate_queryset(teams, request)
        serializer = TeamSerializer(paginated_teams, many=True)

        return paginator.get_paginated_response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            team = Teams.objects.get(id=pk)
            serializer = TeamSerializer(team)

            return JsonResponse(serializer.data)
        except Users.DoesNotExist:
            return Response('equipo no econtrado', status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        serializer = TeamSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        team = Teams(**serializer.validated_data)
        team.leader = request.user
        team.save()
        return JsonResponse({
            "message": "Equipo creado correctamente",
            "data": TeamSerializer(team).data,
        },
            status=status.HTTP_201_CREATED
        )

    def update(self, request, pk=None):

        try:
            team = Teams.objects.get(id=pk)
        except Teams.DoesNotExist:
            return Response(
                {"error": "Equipo no encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TeamSerializer(
            team,
            data=request.data,
            partial=True  # permite actualizar solo algunos campos
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return JsonResponse(
            {
                "message": "Equipo actualizado correctamente",
                "data": serializer.data
            },
            status=status.HTTP_200_OK
        )

    @action(methods=['get'], detail=False)
    def getTeamsByUser(self, request):
        try:
            user = request.user
            teams = Teams.objects.filter(leader=user)
            serializer = TeamSerializer(teams, many=True)
            return JsonResponse({
                "message": "ok",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response('Usuario no encontrado', status=status.HTTP_404_NOT_FOUND)
