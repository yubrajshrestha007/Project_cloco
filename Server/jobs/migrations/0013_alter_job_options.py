# Generated by Django 5.1.6 on 2025-02-24 13:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0012_remove_job_contact_remove_job_email'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='job',
            options={'ordering': ['-posted_at']},
        ),
    ]
