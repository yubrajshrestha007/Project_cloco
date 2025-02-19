from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    Address=models.CharField(default='',max_length=255)
    is_employer = models.BooleanField(default=False)
