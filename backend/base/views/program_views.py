from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.serializers import Serializer
# from drf_multiple_model.views import ObjectMultipleModelAPIView


from collections import namedtuple

# Extras for getExercises
from rest_framework import serializers
from django.db import models

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

# Get single program
@api_view(['GET'])
def getProgram(request, program_pk):
    program = Program.objects.get(id=program_pk)
    serializer = ProgramSerializer(program, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteProgram(request, program_pk):
    program = Program.objects.get(id=program_pk)
    program.delete()
    return Response('Product Deleted')

@api_view(['POST'])
def createProgram(request):
    user = request.user

    program = Program.objects.create(
        user = user,
        name = ''
    )

    serializer = ProgramSerializer(program, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateProgram(request, program_pk):
    data = request.data
    program = Program.objects.get(id=program_pk)
    
    program.name = data["programName"]

    program.save()

    serializer = ProgramSerializer(program, many=False)
    return Response(serializer.data)

#ROUTINES VIEW
@api_view(['GET'])
def getRoutines(request, user_pk, program_pk):
    programs = Program.objects.get(id=program_pk)
    routines = Routine.objects.all().filter(program=programs.id)
    serializer = RoutineSerializer(routines, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def createRoutine(request, program_pk):
    user = request.user
    data = request.data

    program = Program.objects.get(id=program_pk)

    routine = Routine.objects.create(
        name = data["routineName"],
        program = program,
    )

    serializer = RoutineSerializer(routine, many=False)
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

@api_view(['POST'])
def createExercise(request):
    user = request.user
    data = request.data

    print(data)

    exercise = Exercise.objects.create(
        user = user,
        name = data["exerciseName"]
    )

    serializer = ExerciseSerializer(exercise, many=False)
    return Response(serializer.data)

# EXERCISE ROUTINES BRIDGE
@api_view(['POST'])
def createExerciseRoutine(request, routine_pk, exercise_pk):
    user = request.user

    routine = Routine.objects.get(id=routine_pk)
    exercise = Exercise.objects.get(id=exercise_pk)

    exerciseRoutine = ExerciseRoutine.objects.create(
        routine = routine,
        exercise = exercise
    )

    serializer = ExerciseRoutineSerializer(exerciseRoutine, many=False)
    return Response(serializer.data)

#WORKOUT PARAMETERS VIEW
@api_view(['GET'])
def getWorkoutParams(request, routine_pk, exercise_pk):
    # I don't think this is the most optimal way to query this... what if someone wants to have multiple
    # of the same exercises in one workout? -> How I have my db and query set up now it would return 
    # each of them... need to fix this 

    # First filter object of ExerciseRoutine with matching routine ID and exercise ID
    exerciseRoutine = ExerciseRoutine.objects.all().filter(routine=routine_pk).filter(exercise=exercise_pk)

    # set bridge id
    bridgeId = exerciseRoutine[0].id

    # Search workout parameters for matching bridge_id
    exercise = WorkoutParameter.objects.filter(bridge_id = bridgeId)

    serializer = WorkoutParameterSerializer(exercise, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def createWorkoutParams(request, exercise_routine_pk):

    exerciseRoutine = ExerciseRoutine.objects.get(id=exercise_routine_pk)

    workoutParams = WorkoutParameter.objects.create(
        bridge_id = exerciseRoutine,
        sets = 5,
        reps = 5,
        weight = 225
    )

    serializer = WorkoutParameterSerializer(workoutParams, many=False)
    return Response(serializer.data)
