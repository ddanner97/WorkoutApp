from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('programs/', views.getPrograms, name='programs'),
    path('programs/<str:routine_pk>/', views.getRoutines, name='routine'),
    path('programs/<str:routine_pk>/<str:exercise_pk>', views.getExercises, name='exercises')
]