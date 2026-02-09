from rest_framework import serializers

from .models import Users, Profiles, Teams, Tokens
import json


class UserSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    userName = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()
    profile = serializers.CharField(required=False)
    confirmed = serializers.BooleanField(default=False)

    def create(self, validated_data):
        user = Users(**validated_data)
        user.save()
        return user

    def update(self, instance, validated_data):
        if 'profile' in validated_data:
            profileId = validated_data.pop('profile')
            instance.profile = Profiles.objects.get(id=profileId)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['profile'] = str(
            instance.profile.id) if instance.profile else None
        return data


class TokenSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    token = serializers.CharField()
    user = serializers.CharField()
    createdAt = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        token = Tokens(**validated_data)
        token.save()
        return token

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = str(instance.user.id)
        return data


class ProfileSerializer(serializers.Serializer):
    name = serializers.CharField(read_only=True)
    id = serializers.CharField(read_only=True)
    age = serializers.IntegerField()
    description = serializers.CharField()
    photo = serializers.FileField(required=False)
    sports = serializers.ListField(child=serializers.CharField())
    status = serializers.ChoiceField(choices=["free", "busy"], required=False)
    location = serializers.CharField(required=False)
    photo_view = serializers.CharField(read_only=True, source='photo')
    likes = serializers.IntegerField(required=False)

    def to_internal_value(self, data):
        # convertir QueryDict a dict normal
        if hasattr(data, "dict"):
            data = data.dict()

        sports = data.get("sports")

        if isinstance(sports, str):
            try:
                data["sports"] = json.loads(sports)
            except ValueError:
                raise serializers.ValidationError({
                    "sports": "Formato inválido"
                })

        return super().to_internal_value(data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.photo:
            request = self.context.get("request")
            url = f"/{instance.photo}"   # por si ya viene con profiles/...
            if request:
                url = request.build_absolute_uri(url)
            data["photo"] = url
        return data

    def create(self, validated_data):
        request = self.context["request"]

        validated_data["name"] = request.user.userName
        validated_data.setdefault("likes", 0)
        photo = request.FILES.get("photo")   # archivo real

        # ❗️ Eliminar campo photo porque no es string
        validated_data.pop("photo", None)

        profile = Profiles(**validated_data)
        profile.save()

        if photo:
            profile.save_image(photo)

        return profile

    def update(self, instance, validated_data):
        request = self.context.get("request")
        photo = request.FILES.get("photo") if request else None

        if photo:
            instance.save_image(photo)

        instance.name = validated_data.get('name', instance.name)
        instance.age = validated_data.get('age', instance.age)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.sports = validated_data.get('sports', instance.sports)
        instance.location = validated_data.get('location', instance.location)
        instance.status = validated_data.get('status', instance.status)

        instance.save()
        return instance


class TeamSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField()
    photo = serializers.CharField(required=False)
    leader = serializers.CharField(required=False)
    members = serializers.ListField(required=False)
    sport = serializers.CharField()
    location = serializers.CharField(required=False)
    description = serializers.CharField()
    likes = serializers.IntegerField(required=False)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.members = validated_data.get('members', instance.members)
        instance.sport = validated_data.get('sport', instance.sport)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.location = validated_data.get('location', instance.location)
        instance.photo = validated_data.get('photo', instance.photo)
        instance.save()
        return instance

    def to_representation(self, instance):
        return {
            "id": str(instance.id),
            "name": instance.name,
            "leader": str(instance.leader.id),
            "members": [str(member.id) for member in instance.members],
            "sport": instance.sport,
            "photo": instance.photo,
            "description": instance.description,
            "location": instance.location,
            "likes": instance.likes
        }
