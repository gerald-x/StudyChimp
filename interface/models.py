from django.db import models
from userAuthentication.models import User, Faculty

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=300, unique=True, null=False, blank=False)
    contributor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=False, related_name="author")
    file = models.FileField(upload_to="documents/")
