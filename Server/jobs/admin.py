from django.contrib import admin
from .models import Job
from django.contrib.auth import get_user_model

User = get_user_model()

class JobAdmin(admin.ModelAdmin):
    """
    Job admin interface
    """
    # Display fields in the job list
    list_display = ('title', 'company', 'category', 'posted_at', 'employer_name')
    list_filter = ('category', 'posted_at')
    search_fields = ('title', 'company', 'description', 'location')
    list_per_page = 20  # Adjust this number as necessary

    fieldsets = (
        ('Job Details', {
            'fields': ('title', 'company', 'description', 'location', 'salary', 'posted_by')
        }),
        ('Category', {
            'fields': ('category',)
        }),
        ('Timestamps', {
            'fields': ('posted_at',)
        }),
    )

    readonly_fields = ('posted_at',)
    ordering = ('-posted_at',)

    def employer_name(self, obj):
        return obj.posted_by.username  # Or use obj.posted_by.email if you prefer

    employer_name.short_description = 'Employer Name'  # This sets the column name in the admin

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "posted_by":
            kwargs["queryset"] = User.objects.filter(is_employer=True)  # Filter users who are employers
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

admin.site.register(Job, JobAdmin)
