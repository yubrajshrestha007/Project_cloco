from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Application, Job
from .serializers import ApplicationSerializer


class ApplicationCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    # Restrict to authenticated users
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        job_id = self.request.data.get("job")  # Get job ID from request
        job = Job.objects.get(id=job_id)  # Ensure the job exists
        # Auto-assign user and job
        serializer.save(user=self.request.user, job=job)

    def create(self, request, *args, **kwargs):
        """Prevent duplicate applications by a user for the same job"""
        job_id = request.data.get("job")
        if Application.objects.filter(user=request.user, job_id=job_id).exists():
            return Response({"error": "You have already applied for this job."}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)
