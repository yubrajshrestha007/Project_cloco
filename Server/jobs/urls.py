from django.urls import path
from .views import *

urlpatterns = [
    path('create', JobListCreateView.as_view(), name='job-list-create'),
     path('jobs/', job_list,name="Job-view")

]
