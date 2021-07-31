from django.urls import path, include
from rest_framework import routers
from .views import ListViewSet, TaskViewSet, UserViewSet, current_user
from rest_framework import urlpatterns


router = routers.DefaultRouter()
router.register(r'lists', ListViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'users', UserViewSet)
urlpatterns = router.urls

urlpatterns += [
    path('current-user/', current_user, name='get-current-user')
]
