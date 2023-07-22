from django.contrib import admin
from .models import UserMeeting

class UserMeetingAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_number', 'email', 'timezone', 'scheduled_time', 'status', 'attended')
    list_filter = ('status', 'scheduled_time', 'attended')
    search_fields = ('name', 'contact_number', 'email')
    date_hierarchy = 'scheduled_time'

admin.site.register(UserMeeting, UserMeetingAdmin)
