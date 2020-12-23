from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainSerializer, TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ValidationError

from auth.models import User
from auth.validators import check_password

class UserSerializer(serializers.ModelSerializer):

  def validate(self, data):
    """
    Add password validation logic.

    Called inside the implementation of serializers.is_valid()
    """
    # At here, basic fields validation has already been performed
    user = User(**data)

    # Validate password
    password = data.get('password')
    check_password(password, user)

    return super().validate(data)

  class Meta:
    model = User
    fields = [
      'id',
      'email',
      'username',
      'password'
    ]

class EmailTokenObtainSerializer(TokenObtainSerializer):
  """
  Override the username_field of TokenObtainSerializer
  """

  # Identify user by email
  username_field = User.EMAIL_FIELD

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer, EmailTokenObtainSerializer):
  """
  Reimplement TokenObtainPairSerializer with EmailTokenObtainSerializer
  """
  pass