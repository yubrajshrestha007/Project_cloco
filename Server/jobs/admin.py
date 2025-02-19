from django.contrib import admin
from .models import Job

class JobAdmin(admin.ModelAdmin):
    """
    Job admin interface
    """
    # Display fields in the job list
    list_display = ('title', 'company', 'category', 'posted_at')

    # Fields to search in the job list
    search_fields = ('title', 'company', 'description', 'location')

    # Fields to display in the job detail page, grouped by category
    fieldsets = (
        ('Job Details', {
            'fields': ('title', 'company', 'description', 'location', 'salary')
        }),
        ('Category', {
            'fields': ('category',)
        }),
        ('Posted By', {
            'fields': ('posted_by',)
        }),
        ('Timestamps', {
            'fields': ('posted_at',)
        }),
    )

    # Read-only fields in the job detail page
    readonly_fields = ('posted_at',)

    # Filter options in the job list
    list_filter = ('category', 'posted_at')

admin.site.register(Job, JobAdmin)
