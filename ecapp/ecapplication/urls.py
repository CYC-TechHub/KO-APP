from django.urls import path
from .views import UserMeetingListCreateView, UserMeetingDetailView

urlpatterns = [
    path('user-meetings/', UserMeetingListCreateView.as_view(), name='user-meeting-list-create'),
    path('user-meetings/<int:pk>/', UserMeetingDetailView.as_view(), name='user-meeting-detail'),
]
