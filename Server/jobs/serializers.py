
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Job

User=get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # Add any other fields you want to include

class JobSerializer(serializers.ModelSerializer):
    posted_by = UserSerializer(read_only=True)  # Include user details

    class Meta:
        model = Job
        fields = ['id', 'title', 'company', 'description', 'location', 'salary', 'category', 'posted_by']
    def create(self, validated_data):
        user = self.context['request'].user

        # Check if the user is an employer
        if not user.is_employer:
            raise serializers.ValidationError("Only employers can create job listings.")

        # Create the job instance
        job = Job.objects.create(posted_by=user, **validated_data)
        return job
