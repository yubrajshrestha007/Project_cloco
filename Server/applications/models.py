from django.db import models

from jobs.models import Job
from users.models import User

# Create your models here.


class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    applicant = models.ForeignKey(User, on_delete=models.CASCADE)
    resume = models.FileField(upload_to='resumes/')
    status = models.CharField(
        choices=[('Pending', 'Pending'), ('Accepted', 'Accepted'),
                 ('Rejected', 'Rejected')],
        max_length=10
    )
