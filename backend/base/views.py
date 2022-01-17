from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.serializers import Serializer

# Customizing JWT Token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# Password Hash and Error status for registration
from django.contrib.auth.hashers import make_password
from rest_framework import status

#import Django User Model
from django.contrib.auth.models import User

from .models import *
from .serializers import ProgramSerializer, RoutineSerializer, ExerciseRoutineSerializer, ExerciseSerializer, WorkoutParameterSerializer, UserSerializer, UserSerializerWithToken

#Custom JWT Token Views
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#Register User
@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)

        return Response(serializer.data)

    except:
        message = {'detail': 'User with this email or username already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

#USER PROFILE VIEW
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

#View All Users
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)

#PROGRAMS VIEW
@api_view(['GET'])
def getPrograms(request):
    programs = Program.objects.all().filter(user=1) # Have to figure out how to find user
    serializer = ProgramSerializer(programs, many=True)

    return Response(serializer.data)

#ROUTINES VIEW
@api_view(['GET'])
def getRoutines(request, program_pk):
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