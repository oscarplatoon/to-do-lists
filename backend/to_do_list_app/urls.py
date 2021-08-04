from django.urls import path, include
from rest_framework.routers import SimpleRouter
from to_do_list_app import views

r = SimpleRouter()
r.register("task-lists", views.TaskListViewSet, basename="task-list")
r.register("tasks", views.TaskViewSet, basename="task")

urlpatterns = r.urls
