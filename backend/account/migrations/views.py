from django.contrib.auth import get_user_model
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import School, Skill
from .permissions import IsOwner, ReadOnly
from .serializers import (
    SchoolSerializer,
    SkillSerializer,
    UserPrivateSerializer,
    UserPublicSerializer,
    UserRegisterSerializer,
)

User = get_user_model()


class RegisterView(APIView):
    @swagger_auto_schema(
        request_body=UserRegisterSerializer,
        responses={
            201: "Created",
            400: "Bad Request",
        },
    )
    def post(self, request, *args, **kwargs):
        """Register a new user."""
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(
                {"detail": "User registered successfully."},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (ReadOnly | (IsAuthenticated & IsOwner),)

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                "username", openapi.IN_PATH, description="Username", type=openapi.TYPE_STRING
            ),
        ],
        responses={
            200: UserPublicSerializer,
            400: "Bad Request",
            401: "Unauthorized Request",
            404: "User Not Found",
        },
    )
    def get(self, request, username, *args, **kwargs):
        """Get a user's profile data.

        In order to view more data, the user must be logged in (authenticated) and must
        be the owner of the account.
        """
        user = get_object_or_404(User, username=username)

        if request.user.is_authenticated:
            if request.user == user:
                serializer = UserPrivateSerializer(user)
            else:
                # Use the public serializer for users that do not own the account.
                serializer = UserPublicSerializer(user)
        else:
            # Use the public serializer for non-authenticated users.
            serializer = UserPublicSerializer(user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=UserPrivateSerializer,
        manual_parameters=[
            openapi.Parameter(
                "username", openapi.IN_PATH, description="Username", type=openapi.TYPE_STRING
            ),
        ],
        responses={
            200: UserPrivateSerializer,
            400: "Bad Request",
            401: "Unauthorized Request",
            404: "User Not Found",
        },
    )
    def put(self, request, username, *args, **kwargs):
        """Update a user's profile information."""
        user = get_object_or_404(User, username=username)
        serializer = UserPrivateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PreferredMatchesView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (ReadOnly | (IsAuthenticated & IsOwner),)

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                "username", openapi.IN_PATH, description="Username", type=openapi.TYPE_STRING
            ),
        ],
        responses={
            200: UserPrivateSerializer,
            400: "Bad Request",
            401: "Unauthorized Request",
            404: "User Not Found",
        },
    )
    def get(self, request, username, *args, **kwargs):
        user = get_object_or_404(User, username=username)
        users = User.objects.all()
        # sorted_users = sorted(users, user)
        sorted_users = users
        serializer = UserPublicSerializer(sorted_users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SchoolListView(APIView):
    @swagger_auto_schema(
        operation_description="List all schools.",
        responses={200: SchoolSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        schools = School.objects.all()
        serializer = SchoolSerializer(schools, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SkillListView(APIView):
    @swagger_auto_schema(
        operation_description="List all Skills.",
        responses={200: SkillSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        Skills = Skill.objects.all()
        serializer = SkillSerializer(Skills, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
