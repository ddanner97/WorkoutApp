from django.urls import path
from . import views

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('users/register/', views.registerUser, name='register'),

    path('users/profile/', views.getUserProfile, name='user-profile'),
    path('users/', views.getUsers, name='users'),

    path('programs/', views.getPrograms, name='programs'),
    path('programs/<str:program_pk>/', views.getRoutines, name='routine'),
    path('programs/<str:program_pk>/routine/<str:routine_pk>/', views.getExercises, name='exercises')
]