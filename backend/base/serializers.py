from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Program, Routine, Exercise, ExerciseRoutine, WorkoutParameter

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'

class RoutineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routine
        fields = '__all__'

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class ExerciseRoutineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseRoutine
        fields = '__all__'

class WorkoutParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutParameter
        fields = '__all__'
