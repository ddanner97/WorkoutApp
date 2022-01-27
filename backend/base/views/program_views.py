from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.serializers import Serializer

# Error status for registration
from rest_framework import status

from base.models import *
from base.serializers import ProgramSerializer, RoutineSerializer, ExerciseRoutineSerializer, ExerciseSerializer, WorkoutParameterSerializer

#PROGRAMS VIEW
@api_view(['GET'])
def getPrograms(request, user_pk):
    programs = Program.objects.all().filter(user=user_pk) # Have to figure out how to find user
    serializer = ProgramSerializer(programs, many=True)

    return Response(serializer.data)

#ROUTINES VIEW
@api_view(['GET'])
def getRoutines(request, user_pk, program_pk):
    programs = Program.objects.get(id=program_pk)
    routines = Routine.objects.all().filter(program=programs.id)
    serializer = RoutineSerializer(routines, many=True)

    return Response(serializer.data)

#EXERCISES VIEW
@api_view(['GET'])
def getExercises(request, program_pk, routine_pk):
   
    exerciseRoutine = ExerciseRoutine.objects.all().filter(routine=routine_pk)
    exercises = []

    # Get all exercises
    for i in exerciseRoutine:
        exercise = Exercise.objects.get(id=i.exercise.id)
        exercises.append(exercise)

    serializer = ExerciseSerializer(exercises, many=True)

    return Response(serializer.data)