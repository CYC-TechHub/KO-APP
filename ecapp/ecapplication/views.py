from rest_framework import generics
from .models import UserMeeting
from .serializers import UserMeetingSerializer

class UserMeetingListCreateView(generics.ListCreateAPIView):
    queryset = UserMeeting.objects.all()
    serializer_class = UserMeetingSerializer

class UserMeetingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserMeeting.objects.all()
    serializer_class = UserMeetingSerializer
