# serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

User   = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_employer']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_employer']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


# class LoginSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(max_length=255)
#     password = serializers.CharField(max_length=128, write_only=True)

#     class Meta:
#         model = User
#         fields = ['username', 'password']

#     def validate(self, data):
#         username = data.get('username')
#         password = data.get('password')

#         if username and password:
#             user = User.objects.filter(username=username).first()
#             if user and user.check_password(password):
#                 return data
#             raise serializers.ValidationError('Invalid username or password')
#         raise serializers.ValidationError('Username and password are required')
