from django.contrib import admin
from .models import Program, Routine, Exercise, ExerciseRoutine, WorkoutParameter

# Register your models here.
admin.site.register(Program)
admin.site.register(Routine)
admin.site.register(Exercise)
admin.site.register(ExerciseRoutine)
admin.site.register(WorkoutParameter)