# Generated by Django 4.0.1 on 2022-01-04 20:02

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0002_rename_workoutplans_programs'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Programs',
            new_name='Program',
        ),
    ]
