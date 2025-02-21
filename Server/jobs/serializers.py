from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Job

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class JobSerializer(serializers.ModelSerializer):
    posted_by = UserSerializer(read_only=True)
    posted_at = serializers.DateTimeField(format="%B %d, %Y %I:%M %p", read_only=True)  # Format date

    class Meta:
        model = Job
        fields = ['id', 'title', 'company', 'description', 'location', 'salary', 'category', 'posted_by', 'posted_at']
