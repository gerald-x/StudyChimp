from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Faculty(models.Model):
    faculty_name = models.CharField(max_length=300, unique=True, blank=False)

class User(AbstractUser):
    faculty = models.ForeignKey(Faculty, on_delete=models.SET_NULL, default=None, null=True)