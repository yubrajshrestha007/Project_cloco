from django.db import models
from users.models import User


class Job(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE)
    posted_at = models.DateTimeField(auto_now_add=True)

    SOFTWARE_DEVELOPMENT = 'Software Development'
    DATA_SCIENCE = 'Data Science'
    PRODUCT_MANAGEMENT = 'Product Management'
    DESIGN = 'Design'
    MARKETING = 'Marketing'
    OTHER = 'Other'

    CATEGORY_CHOICES = [
        (SOFTWARE_DEVELOPMENT, SOFTWARE_DEVELOPMENT),
        (DATA_SCIENCE, DATA_SCIENCE),
        (PRODUCT_MANAGEMENT, PRODUCT_MANAGEMENT),
        (DESIGN, DESIGN),
        (MARKETING, MARKETING),
    ]

    category = models.CharField(max_length=255, choices=CATEGORY_CHOICES,default=OTHER)
