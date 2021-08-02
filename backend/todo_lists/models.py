from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.


class List(models.Model):
    list_name = models.CharField(max_length=255)
    user = models.ForeignKey(User, related_name='lists', on_delete=models.CASCADE)

    def __str__(self):
        return self.list_name


class Task(models.Model):
    task_name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    due_date = models.DateField(default=timezone.now)
    list = models.ForeignKey(
        'List', on_delete=models.CASCADE, related_name='tasks')

    def __str__(self):
        return self.task_name
