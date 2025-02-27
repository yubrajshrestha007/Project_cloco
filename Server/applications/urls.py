from django.urls import path
from .views import ApplicationCreateView

urlpatterns = [
    path('apply/<int:pk>/', ApplicationCreateView.as_view(), name='apply_for_job'),
]
