from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    username = None
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class PlaidItem(models.Model):
    user = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE, default=None)
    access_token = models.CharField(max_length=200, unique=True)
    item_id = models.CharField(max_length=200, unique=True)
    
    
    