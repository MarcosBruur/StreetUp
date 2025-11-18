from rest_framework import serializers

from .models import Users, Profiles, Teams,Tokens

class UserSerializer(serializers.Serializer):
    id= serializers.CharField(read_only=True)
    userName= serializers.CharField()
    email=serializers.CharField()
    password=serializers.CharField()
    profile= serializers.CharField(required=False)
    confirmed = serializers.BooleanField(default=False)


    def create(self, validated_data):
        user = Users(**validated_data)
        user.save()
        return user

    def update(self,instance,validated_data):
        if 'profile' in validated_data:
            profileId = validated_data.pop('profile')
            instance.profile = Profiles.objects.get(id=profileId)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['profile'] = str(instance.profile.id) if instance.profile else None
        return data

class TokenSerializer(serializers.Serializer):
    id=serializers.CharField(read_only=True)
    token=serializers.CharField()
    user=serializers.CharField()
    createdAt= serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        token = Tokens(**validated_data)
        token.save()
        return token

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = str(instance.user.id)
        return data 



class ProfileSerializer(serializers.Serializer):
    id= serializers.CharField(read_only=True)
    age= serializers.IntegerField()
    description= serializers.CharField()
    photo=serializers.CharField(required=False)
    sports = serializers.ListField(child=serializers.CharField())
    status = serializers.ChoiceField(choices=["free", "busy"],required=False)
    location= serializers.CharField(required=False)

    def create(self, validated_data):
        profile = Profiles(**validated_data)
        profile.save()
        return profile

    def update(self, instance, validated_data):
        instance.age = validated_data.get('age', instance.age)
        instance.photo = validated_data.get('photo', instance.photo)
        instance.description = validated_data.get('description', instance.description)
        instance.sports = validated_data.get('sports', instance.sports)
        instance.location = validated_data.get('location',instance.location)
        instance.save()
        return instance

        
class TeamSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField()
    leader = serializers.CharField()
    members = serializers.ListField(required=False)
    sport = serializers.CharField()
    description = serializers.CharField(required=False)

    def create(self, validated_data):
        team = Teams(**validated_data)
        team.save()
        return team

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

    def to_representation(self, instance):
        return {
            "id": str(instance.id),
            "name": instance.name,
            "leader": {
                "id": str(instance.leader.id),
                "name": instance.leader.userName  
            },
            "members": [str(member.id) for member in instance.members],
            "sport": instance.sport,
            "description": instance.description,
        }
