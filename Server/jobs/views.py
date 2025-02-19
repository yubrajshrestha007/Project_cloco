from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer


# class JobListCreateView(generics.ListCreateAPIView):
#     queryset = Job.objects.all()
#     serializer_class = JobSerializer
#     permission_classes = [IsAdminUser]


@api_view(['GET'])
def job_list(request):
    print(request.headers)
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)
