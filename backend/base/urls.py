from django.urls import path
from . import views

# Import simple JWT 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('users/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.getRoutes, name='routes'),
    path('programs/', views.getPrograms, name='programs'),
    path('programs/<str:program_pk>/', views.getRoutines, name='routine'),
    path('programs/<str:program_pk>/routine/<str:routine_pk>/', views.getExercises, name='exercises')
]