from django.db import models

TIMEZONE_CHOICES = [
    ('CST', 'CST'),
    ('EST', 'EST'),
    ('PST', 'PST'),
    ('MST', 'MST'),
]

MEETING_STATUS_CHOICES = [
    ('Completed', 'Completed'),
    ('Upcoming', 'Upcoming'),
    ('Cancelled', 'Cancelled'),
]

class UserMeeting(models.Model):
    name = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=20)
    email = models.EmailField()
    timezone = models.CharField(max_length=3, choices=TIMEZONE_CHOICES)
    scheduled_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=MEETING_STATUS_CHOICES, default='Upcoming')
    attended = models.BooleanField(default=False)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['scheduled_time']  # Sort by scheduled_time in ascending order
