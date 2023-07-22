from rest_framework import serializers
from .models import UserMeeting

class UserMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMeeting
        fields = '__all__'
