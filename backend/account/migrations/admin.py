from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .models import School, Skill

User = get_user_model()


@admin.register(User)
class UserAdmin(UserAdmin):
    model = User

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )

    list_display = (
        "email",
        "date_joined",
        "last_login",
        "pk",
    )

    fieldsets = UserAdmin.fieldsets + (
        (
            "Additional Information",
            {
                "fields": ("bio", "school", "skills"),
            },
        ),
    )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    model = Skill


@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    model = School
