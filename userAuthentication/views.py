from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Faculty, User
from django.core import serializers
import json
from validate_email_address import validate_email
from django.contrib.auth.hashers import check_password
import requests

# Create your views here.
@api_view(["POST"])
def loginView(request):
    request.data.get("identity")
    request.data.get("password")

@api_view(["GET"])
def retrieve_faculties(request):
    faculty_list = serializers.serialize("json" ,Faculty.objects.all())
    return JsonResponse(json.loads(faculty_list), status=200, safe=False)

@api_view(["POST"])
def username_checker(request):
    username = request.data.get("username")
    username_check = User.objects.filter(username=username).first()
    if username_check:
        return JsonResponse({"detail": "Username taken"}, status=409)

    return JsonResponse({"detail": "Valid username"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def validate_token(request):
    '''
        Return response if a token is valid, else return an error status code 
    '''
    return JsonResponse({"detail": "valid token"})


@api_view(["POST"])
def email_checker(request):
    email = request.data.get("email")
    if not validate_email(email):
        return JsonResponse({"detail": "Invalid email"}, status=400, safe=False)
    
    email_check = User.objects.filter(email=email).first()

    if email_check:
        return JsonResponse({"detail": "Email already exists"}, status=400)

    return JsonResponse({"detail": "Email is valid"}, status=200)


@api_view(["POST"])
def login_view(request):
    identity = request.data.get("identity")
    password = request.data.get("password")

    if validate_email(identity):
        user = User.objects.filter(email=identity).first()
        if not check_password(password, user.password):
            return JsonResponse({"detail": "Incorrect identity or password"}, status=400)

        if user:
            tokens = requests.post(f"{request.build_absolute_uri('/')}user/auth/api/token/", {"username": user.username, "password": password})
            return JsonResponse(tokens.json(), safe=False)
    
    user = User.objects.filter(username=identity).first()
    if user:
        if not check_password(password, user.password):
            return JsonResponse({"detail": "Incorrect identity or password"}, status=400)
        
        tokens = requests.post(f"{request.build_absolute_uri('/')}user/auth/api/token/", {"username": user.username, "password": password})
        return JsonResponse(tokens.json(), status=200)
    
    return JsonResponse({"detail": "Incorrect identity or password"}, status=400)


@api_view(["POST"])
def register(request):
    username = request.data.get("username").strip()
    email = request.data.get("email")
    password = request.data.get("password")
    confirm_password= request.data.get("confirm_password")
    faculty = request.data.get("faculty").strip()

    username = username.lower()
    
    email_check = User.objects.filter(email=email).first()
    username_check = User.objects.filter(username=username).first()

    if ( not username
        or not email
        or not password
        or not confirm_password
    ):
        return JsonResponse({"detail": "Missing fields"}, status=400)        

    if email_check:
        return JsonResponse({"detail": "Email already exists"}, status=400)

    if username_check:
        return JsonResponse({"detail": "Username already taken"}, status=400)

    if password != confirm_password:
        return JsonResponse({"detail": "Passwords do not match"}, status=400)
            
    if not faculty:
        user = User(email=email, username=username, password=password, faculty=None)
        user.set_password(password)
    else:
        faculty_check = Faculty.objects.filter(faculty_name=faculty).first()
        if not faculty_check:
            return JsonResponse({"detail": "Faculty does not exist"}, status=400)
        
        user = User(email=email, username=username, password=password, faculty=faculty_check)
        user.set_password(password)
    
    user.save()

    tokens = requests.post(f"{request.build_absolute_uri('/')}user/auth/api/token/", {"username": user.username, "password": password})
    return JsonResponse(tokens.json(), safe=False, status=200)