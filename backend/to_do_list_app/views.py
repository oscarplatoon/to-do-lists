from django.shortcuts import render
from rest_framework.viewsets import ViewSet
from to_do_list_app.serializers import *
from to_do_list_app.models import *

class TaskListViewSet(ViewSet):
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer
    
class TaskViewSet(ViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
