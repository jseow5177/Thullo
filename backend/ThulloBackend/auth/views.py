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
  A viewset for User model to signup
  """
  serializer_class = UserSerializer

  @action(permission_classes=[AllowAny], methods=['post'], detail=False)
  def signup(self, request, pk=None):
    # Use user serializer
    serializer = self.get_serializer(data=request.data)

    serializer.is_valid(raise_exception=True)

    # Create user with custom user model
    # Calling create_user will hash the password
    User.objects.create_user(**request.data)

    return Response(status=status.HTTP_200_OK)

class EmailTokenObtainPairView(TokenObtainPairView):
  """
  A view set to handle user login
  """

  serializer_class = CustomTokenObtainPairSerializer
  