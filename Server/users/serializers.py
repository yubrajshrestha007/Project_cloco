# serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

User   = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email','address', 'is_employer']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email','address', 'password', 'is_employer']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
