from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


class School(models.Model):
    UM_MANITOBA = "University of Manitoba"
    UM_WINNIPEG = "Univerisity of Winnipeg"
    RED_RIVER = "RRC Polytech"
    ST_BONIFACE = "Université de Saint-Boniface"
    SCHOOL_CHOICES = (
        (UM_MANITOBA, UM_MANITOBA),
        (UM_WINNIPEG, UM_WINNIPEG),
        (RED_RIVER, RED_RIVER),
        (ST_BONIFACE, ST_BONIFACE),
    )

    name = models.CharField(max_length=255, choices=SCHOOL_CHOICES, unique=True, null=False)

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    """A custom user in the system"""

    email = models.EmailField(max_length=255, unique=True)
    school = models.ForeignKey(School, on_delete=models.SET_NULL, null=True)
    bio = models.CharField(max_length=255, null=True)
    skills = models.ManyToManyField(Skill, related_name="users")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# class UserRelationship(models.Model):
#     pass


# class Team(models.Model):
#     members = models.ManyToManyField(CustomUser, related_name="team")
