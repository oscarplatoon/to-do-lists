from rest_framework.serializers import ModelSerializer
from to_do_list_app.models import *

class TaskListSerializer(ModelSerializer):
    class Meta:
        model = TaskList
        
class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        