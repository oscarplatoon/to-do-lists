from django.db import models
from django.contrib.auth.models import User

class TaskList(models.Model):
    name = models.CharField(max_length=128)
    user = models.ForeignKey(User, related_name="task_lists", on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.name} by {self.user.username}"

class Task(models.Model):
    list = models.ForeignKey(TaskList, related_name="tasks", on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    completed = models.BooleanField(default=False)
    due_date = models.DateField()
    
    def __str__(self):
        return f"{self.name}"
    
