from todo_lists.serializers import UserSerializer

# responds w/ jwt token


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
