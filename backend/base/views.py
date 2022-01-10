from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import Serializer

from .models import *
from .serializers import   ProgramSerializer, RoutineSerializer, ExerciseRoutineSerializer, WorkoutParameterSerializer 

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/programs/',
        '/api/programs/<id>/',
        '/api/programs/<id>/<id>/',
    ]

    return Response(routes)

#PROGRAMS VIEW
@api_view(['GET'])
def getPrograms(request):
    programs = Program.objects.all().filter(user=1) # Have to figure out how to find user
    serializer = ProgramSerializer(programs, many=True)

    return Response(serializer.data)

#ROUTINES VIEW
@api_view(['GET'])
def getRoutines(request, routine_pk):
    programs = Program.objects.get(id=routine_pk)
    routines = Routine.objects.all().filter(program=programs.id)
    serializer = RoutineSerializer(routines, many=True)

    return Response(serializer.data)

#EXERCISES VIEW
@api_view(['GET'])
def getExercises(request, routine_pk, exercise_pk):
    routines = Routine.objects.get(id=routine_pk)
    exerciseRoutine = ExerciseRoutine.objects.all().filter(routine=routines.id)
    serializer = ExerciseRoutineSerializer(exerciseRoutine, many=True)

    return Response(serializer.data)

#EXERCISES VIEW
@api_view(['GET'])
def getExercises(request, routine_pk, exercise_pk):
    routines = Routine.objects.get(id=routine_pk)
    exerciseRoutine = ExerciseRoutine.objects.all().filter(routine=exercise_pk)
    exercises = []

    # Get all exercises
    for x in exerciseRoutine:
        exercises.append(Exercise.objects.get(id=x.exercise.id))

    serializer = ExerciseRoutineSerializer(exercises, many=True)

    return Response(serializer.data)