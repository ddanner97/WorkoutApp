from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Program, Routine, Exercise, ExerciseRoutine, WorkoutParameter

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin']

    def get_name(self, object):
        name = object.first_name + ' ' + object.last_name
        if name == '':
            name = object.email

        return name
    
    def get_isAdmin(self, object):
        return object.is_staff

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'token'] 

    def get_token(self, object):
        token = RefreshToken.for_user(object)
        return str(token.access_token)

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
