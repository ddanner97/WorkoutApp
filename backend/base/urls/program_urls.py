from django.urls import path
from base.views import program_views as views

# Our root urls file has /api/programs/ so the base url path for this file is already config
urlpatterns = [
    path('', views.getPrograms, name='programs'),
    path('<str:program_pk>/', views.getRoutines, name='routine'),
    path('<str:program_pk>/routine/<str:routine_pk>/', views.getExercises, name='exercises')
]