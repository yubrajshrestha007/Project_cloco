# Generated by Django 5.1.6 on 2025-02-20 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0008_remove_job_contact_remove_job_email_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='category',
            field=models.CharField(choices=[('Software Development', 'Software Development'), ('Data Science', 'Data Science'), ('Product Management', 'Product Management'), ('Design', 'Design'), ('Marketing', 'Marketing'), ('Other', 'Other')], default='Other', max_length=255),
        ),
    ]
