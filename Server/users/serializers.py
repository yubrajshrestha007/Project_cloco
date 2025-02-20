# serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

User   = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email','Address', 'is_employer']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    def validate_username(self, value):
        """Check if the username already exists in the database."""
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    class Meta:
        model = User
        fields = ['id', 'username', 'email','Address', 'password', 'is_employer']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
