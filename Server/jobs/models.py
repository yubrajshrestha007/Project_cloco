from django.conf import settings
from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    posted_at = models.DateTimeField(auto_now_add=True)
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    CATEGORY_CHOICES = [
        ('Software Development', 'Software Development'),
        ('Data Science', 'Data Science'),
        ('Product Management', 'Product Management'),
        ('Design', 'Design'),
        ('Marketing', 'Marketing'),
        ('Other', 'Other'),
    ]
    category = models.CharField(max_length=255, choices=CATEGORY_CHOICES, default='Other')
    class Meta:
        ordering = ['-posted_at']
    def __str__(self):
        return self.title
