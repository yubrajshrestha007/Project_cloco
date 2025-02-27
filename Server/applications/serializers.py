from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        # Exclude `user` (set automatically)
        fields = ['job', 'cover_letter', 'resume']
