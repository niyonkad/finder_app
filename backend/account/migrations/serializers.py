from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.validators import UnicodeUsernameValidator
from rest_framework import serializers

from .models import School, Skill

User = get_user_model()


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["name"]


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ["name"]


class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    username = serializers.CharField(max_length=150)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    password1 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    school = serializers.CharField(max_length=100)
    skills_list = serializers.ListField(child=serializers.CharField(max_length=100), required=False)
    bio = serializers.CharField(max_length=255, required=False)

    class Meta:
        model = User
        fields = [
            "email",
            "username",
            "first_name",
            "last_name",
            "password1",
            "password2",
            "school",
            "skills_list",
            "bio",
        ]

    def validate_email(self, email):
        email = email.lower()
        try:
            User.objects.get(email=email)
            raise serializers.ValidationError(f"The email address '{email}' is already registered.")
        except User.DoesNotExist:
            return email

    def validate_username(self, username):
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            username_validator = UnicodeUsernameValidator()
            try:
                # Validate the username using the default User model username validator.
                username_validator(username)
            except ValueError as e:
                raise serializers.ValidationError(str(e))
            return username

    def validate_password1(self, password1):
        try:
            # Validate the password using Django's built-in password validator.
            validate_password(password1)
        except ValueError as e:
            raise serializers.ValidationError(str(e))
        return password1

    def validate_school(self, school):
        try:
            school = School.objects.get(name=school)
        except School.DoesNotExist:
            raise serializers.ValidationError("School provided does not exist.")
        return school

    def validate_password2(self, password2):
        password1 = self.initial_data.get("password1")

        if password1 != password2:
            raise serializers.ValidationError("Passwords do not match.")

        return password2

    def create(self, validated_data):
        email = validated_data.get("email")
        username = validated_data.get("username")
        first_name = validated_data.get("first_name")
        last_name = validated_data.get("last_name")
        password = validated_data.get("password1")
        school = validated_data.get("school")
        skills_list = validated_data.pop("skills_list", [])
        bio = validated_data.get("bio")

        user = User(
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name,
            school=school,
            bio=bio,
        )
        user.set_password(password)
        user.save()

        # Add user skills.
        if skills_list:
            for skill in skills_list:
                skill, _ = Skill.objects.get_or_create(name=skill)
                user.skills.add(skill)

        return user


class UserPublicSerializer(serializers.ModelSerializer):
    """The fields in this serializer represent data that can be viewed by anyone on the
    internet."""

    skills = SkillSerializer(many=True)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "bio",
            "school",
            "skills",
        ]


class UserPrivateSerializer(serializers.ModelSerializer):
    """The fields in this serializer represent data that only the user of the associated
    account, or users with the admin role should have access to."""

    email = serializers.EmailField(max_length=255, required=False)
    first_name = serializers.CharField(max_length=150, required=False)
    last_name = serializers.CharField(max_length=150, required=False)
    school = serializers.CharField(max_length=100, required=False)
    skills = SkillSerializer(many=True, required=False)
    bio = serializers.CharField(max_length=255, required=False)

    class Meta:
        model = User
        exclude = [
            "password",
        ]

    def update(self, instance, validated_data):
        # Update the basic user fields.
        instance.email = validated_data.get("email", instance.email)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.school = validated_data.get("school", instance.school)
        instance.save()

        skills_data = validated_data.get("skills", [])
        # Clear existing skills.
        instance.skills.clear()
        for skill_data in skills_data:
            skill, _ = Skill.objects.get_or_create(**skill_data)
            instance.skills.add(skill)

        return instance
