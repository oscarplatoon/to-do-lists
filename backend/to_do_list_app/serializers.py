from rest_framework.serializers import ModelSerializer, StringRelatedField, SerializerMethodField, PrimaryKeyRelatedField
from to_do_list_app.models import *

class TaskListSerializer(ModelSerializer):
    class Meta:
        model = TaskList
        fields = ['id', 'name', 'user', 'tasks']
        depth = 1
        
    user = StringRelatedField(read_only=True)
    user = PrimaryKeyRelatedField(write_only=True, queryset=User.objects.all())

        
class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ['list', 'name', 'completed', 'due_date']
        depth = 1
        