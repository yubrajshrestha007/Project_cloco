from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    """
    User admin interface
    """
    # Display fields in the user list
    list_display = ('username', 'email','address', 'is_employer' ,'is_staff','is_superuser')

    # Fields to search in the user list
    search_fields = ('username', 'email')

    # Fields to display in the user detail page, grouped by category
    fieldsets = (
        ('User  Details', {
            'fields': ('username', 'email', 'password', 'address', 'is_staff', 'is_superuser')
        }),
        ('Employer Status', {
            'fields': ('is_employer',)
        }),
    )

    # Read-only fields in the user detail page
    readonly_fields = ('password',)

    # Filter options in the user list
    list_filter = ('is_employer',)

admin.site.register(User, UserAdmin)
