from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('programs/', views.getPrograms, name='programs'),
    path('programs/<str:program_pk>/', views.getRoutines, name='routine'),
    path('programs/<str:program_pk>/routine/<str:routine_pk>/', views.getExercises, name='exercises')
]