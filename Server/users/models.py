from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    address = models.CharField(max_length=255, null=True, blank=True)  # Ensure this exists
    is_employer = models.BooleanField(default=False)
