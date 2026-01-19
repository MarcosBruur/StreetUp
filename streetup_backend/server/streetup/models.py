from mongoengine import Document, fields, CASCADE, DO_NOTHING, NULLIFY
from datetime import datetime
import uuid
import os
import uuid
from PIL import Image
from django.conf import settings
UPLOAD_DIR = os.path.join(settings.MEDIA_ROOT, "profiles")

ProfileStatus = ["free", "busy"]
# Create your models here.


class Profiles(Document):
    photo = fields.StringField()
    age = fields.IntField(min_value=13, required=True)
    description = fields.StringField()
    sports = fields.ListField(fields.StringField())
    status = fields.StringField(required=True, choices=[
                                "free", "busy"], default="free")
    location = fields.StringField()

    def save_image(self, file_obj):
        os.makedirs(UPLOAD_DIR, exist_ok=True)

        nombre = f"{uuid.uuid4()}.webp"
        path = os.path.join(UPLOAD_DIR, nombre)

        img = Image.open(file_obj).convert("RGB")
        img.save(path, "WEBP", quality=90)

        self.photo = f"profiles/{nombre}"
        self.save()


class Users(Document):
    userName = fields.StringField(required=True)
    email = fields.StringField(required=True)
    password = fields.StringField(required=True)
    profile = fields.ReferenceField(
        'Profiles',
        reverse_delete_rule=NULLIFY,
        required=False
    )

    confirmed = fields.BooleanField(default=False)

    def to_dict(self):
        return {
            "id": str(self.id),
            "userName": self.userName,
            "email": self.email,
            "profile": str(self.profile.id) if self.profile else None,
            "confirmed": self.confirmed
        }

    @property
    def is_authenticated(self):
        """Compatibilidad con el sistema de autenticación de Django."""
        return True


class Tokens(Document):
    token = fields.StringField(required=True)
    user = fields.ReferenceField(
        'Users', reverse_delete_rule=CASCADE, required=True)
    createdAt = fields.DateTimeField(default=datetime.utcnow)

    meta = {
        'indexes': [
            {
                'fields': ['createdAt'],
                'expireAfterSeconds': 1800
            }
        ]
    }


class Teams(Document):
    photo = fields.StringField()
    name = fields.StringField(required=True)
    leader = fields.ReferenceField(
        'Users', reverse_delete_rule=NULLIFY, required=False)
    members = fields.ListField(
        fields.ReferenceField('Users'),
        required=False,
        default=list
    )
    sport = fields.StringField(required=True)
    description = fields.StringField(required=True)
    location = fields.StringField(required=False)
