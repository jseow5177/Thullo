from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

from auth.models import User
from auth.serializers import UserSerializer, CustomTokenObtainPairSerializer

class UserSignUpViewSet(ModelViewSet):
  """
  A viewset for User model
  """
  serializer_class = UserSerializer

  @action(permission_classes=[AllowAny], methods=['post'], detail=False)
  def signup(self, request, pk=None):
    serializer = UserSerializer(data=request.data)

    user_data = {
      'email': request.data['email'],
      'username': request.data['username'],
      'password': request.data['password']
    }

    # serializer.is_valid will catch raised errors and return false if validation fails
    if serializer.is_valid():
      # Create user with custom user model
      User.objects.create_user(**user_data)
      return Response(status=status.HTTP_200_OK)
      
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmailTokenObtainPairView(TokenObtainPairView):

  serializer_class = CustomTokenObtainPairSerializer
  