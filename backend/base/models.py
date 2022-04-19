from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE

# Create your models here.

class Program(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE, null=False)
    name = models.CharField(max_length=200)
    dateCreated = models.DateTimeField(auto_now_add=True)
    # lastWorkout = models.DateTimeField(auto_now_add=False) #I have to fix this 

    def __str__(self):
        return str(self.name) + ' - ' + str(self.user.first_name) 

class Routine(models.Model):
    name = models.CharField(max_length=200)
    program = models.ForeignKey(Program, on_delete=CASCADE, null=False)
    # lastWorkout 

    def __str__(self):
        return str(self.name) + ' - ' + str(self.program) 

class Exercise(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=CASCADE, null=False)

    def __str__(self):
        return str(self.name) + ' - ' + str(self.user.first_name) 
        
#Bridge to pair Exercises with Routines
class ExerciseRoutine(models.Model): 
    routine = models.ForeignKey(Routine, on_delete=CASCADE, null=False)
    exercise = models.ForeignKey(Exercise, on_delete=CASCADE, null=False)

    def __str__(self):
        return str(self.routine) + ' - ' + str(self.exercise)

class WorkoutParameter(models.Model):
    bridge_id = models.ForeignKey(ExerciseRoutine, on_delete=CASCADE, null=False)
    sets = models.IntegerField()
    reps = models.IntegerField()
    weight = models.DecimalField(max_digits=7, decimal_places=2)
    # rest_time = models.DurationField()

    def __str__(self):
        return str(self.bridge_id)
