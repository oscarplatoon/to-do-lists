from rest_framework.serializers import ModelSerializer
from to_do_list_app.models import *

class TaskListSerializer(ModelSerializer):
    class Meta:
        model = TaskList
        fields = ['name', 'user', 'related_name']
        depth = 1

        
class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ['list', 'name', 'completed', 'due_date']
        depth = 1
        