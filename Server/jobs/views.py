from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer, UserSerializer

# ✅ Admin-only job list & creation


class JobAdminView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAdminUser]  # 🔒 Only Admins can access


def perform_create(self, serializer):
    # Set the posted_by field to the current user
    serializer.save(posted_by_id=self.request.user.id)

# ✅ Get job list (for all authenticated users)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def job_list(request):
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)

# ✅ Admin can update a job


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAdminUser])
def update_job(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

    # Preserve the posted_by value
    original_posted_by = job.posted_by

    # Update the serializer, but exclude posted_by from being updated
    serializer = JobSerializer(job, data=request.data, partial=True)
    if serializer.is_valid():
        # Set the posted_by field back to its original value
        serializer.save(posted_by=original_posted_by)
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ✅ Admin can delete a job


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_job(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

    job.delete()
    return Response({"message": "Job deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
