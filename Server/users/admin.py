from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    """
    User admin interface
    """
    # Display fields in the user list
    list_display = ('username', 'email','Address', 'is_employer')

    # Fields to search in the user list
    search_fields = ('username', 'email')

    # Fields to display in the user detail page, grouped by category
    fieldsets = (
        ('User  Details', {
            'fields': ('username', 'email', 'password','Address')
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
