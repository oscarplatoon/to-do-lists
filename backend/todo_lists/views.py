from django.shortcuts import render
from rest_framework import routers
from rest_framework import viewsets
from .models import List, Task, User
from .serializers import ListSerializer, TaskSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ListViewSet(viewsets.ModelViewSet):
    serializer_class = ListSerializer
    queryset = List.objects.all()


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
