from mongoengine import Document,fields,CASCADE,DO_NOTHING,NULLIFY
from datetime import datetime,timedelta

ProfileStatus = ["free","busy"]
# Create your models here.

class Profiles(Document):
    photoUrl=fields.StringField()
    age= fields.IntField(min_value=13,required=True)
    description= fields.StringField()
    sports=fields.ListField(fields.StringField())
    status=fields.StringField(required=True,choices=ProfileStatus,default="free")
    



class Users(Document):
    userName= fields.StringField(required=True)
    email=fields.StringField(required=True)
    password=fields.StringField(required=True)
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
    token= fields.StringField(required=True)
    user= fields.ReferenceField('Users',reverse_delete_rule=CASCADE,required=True)
    createdAt= fields.DateTimeField(default=datetime.now)

    meta = {
        'indexes': [
            {
                'fields': ['createdAt'],
                'expireAfterSeconds': 600 #10 minutes 
            }
        ]
    }


class Teams(Document):
    name= fields.StringField(required=True)
    leader= fields.ReferenceField('Users',reverse_delete_rule=NULLIFY,required=True)
    members=fields.ListField(fields.ReferenceField('Users',reverse_delete_rule=DO_NOTHING,required=True))
    sport=fields.StringField(required=True)
    description=fields.StringField()
