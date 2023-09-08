from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = "user_auth"

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("api/login/", views.loginView, name="login"),
    path("faculty-list/", views.retrieve_faculties, name="faculty_list"),
    path("username-check/", views.username_checker, name="username_check"),
    path("validate-token/", views.validate_token, name="validate_token"),
    path("email-check/", views.email_checker, name="email_check"),
    path("register/", views.register, name="register"),
    path("login/", views.login_view, name="login_view"),
]