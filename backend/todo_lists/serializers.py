from rest_framework import serializers
from .models import User, List, Task
from rest_framework_jwt.settings import api_settings


# Serializes new user sign ups that responds with the new user's information including a new token.


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ['token', 'username', 'password']


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'task_name', 'completed', 'due_date', 'list']


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ['id', 'list_name', 'user', 'tasks']
        # optional_fields = ['tasks']


class UserSerializer(serializers.ModelSerializer):
    lists = ListSerializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'lists']
        # optional_fields = ['lists']
