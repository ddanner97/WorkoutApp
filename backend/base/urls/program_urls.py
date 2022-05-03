from django.urls import path
# from backend.base.views.program_views import createRoutine
from base.views import program_views as views

# Our root urls file has /api/programs/ so the base url path for this file is already config
urlpatterns = [
    # Program URLS
    path('<str:user_pk>', views.getPrograms, name='programs'),
    
    path('program/<str:program_pk>/',views.getProgram,name="program"),

    path('program-delete/<str:program_pk>', views.deleteProgram, name='program-delete'),
    path('program-create/', views.createProgram, name='program-create'),
    path('program-update/<str:program_pk>/', views.updateProgram, name='program-update'),

    # Routine URLS
    path('<str:user_pk>/program_routines/<str:program_pk>/', views.getRoutines, name='routine'),
    path('routine-create/<str:program_pk>/', views.createRoutine, name='routine-create'),

    # Exercise URLS
    path('<str:program_pk>/routine/<str:routine_pk>/', views.getExercises, name='exercises'),
    path('exercise-create/<str:routine_pk>', views.createExercise, name='exercise-create'),
    path('exercise-delete/<str:exercise_pk>', views.deleteExercise, name='exercise-delete'),

    # Exercise Routine URL
    path('exercise-routine-create/routine/<str:routine_pk>/exercise/<str:exercise_pk>/', views.createExerciseRoutine, name='exercise-routine-create'),

    # WorkoutParam URLS
    path('routine/<str:routine_pk>/exercise/<str:exercise_pk>/', views.getWorkoutParams, name='workout-parameters'),
    path('workout-params-create/<str:exercise_routine_pk>/', views.createWorkoutParams, name='create-workout-parameters')

]