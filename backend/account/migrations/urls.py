from account.views import RegisterView
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import SchoolListView, UserProfileView, SkillListView

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("schools/", SchoolListView.as_view(), name="schools"),
    path("skills/", SkillListView.as_view(), name="skills"),
    path("user/<str:username>/", UserProfileView.as_view(), name="user_profile"),
]
