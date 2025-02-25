from django.urls import path
from .views import JobAdminView, job_list, update_job, delete_job

urlpatterns = [
    path('admin/jobs/', JobAdminView.as_view(),
         name='admin-jobs'),  # Admin Job List & Create
    path('jobs/', job_list, name='job-list'),  # General Job Listing
    path('admin/jobs/<int:job_id>/update/', update_job,
         name='update-job'),  # Update Job
    path('admin/jobs/<int:job_id>/delete/',
         delete_job, name='delete-job'),  # Delete Job
]
