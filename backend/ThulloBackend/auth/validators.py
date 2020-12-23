from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers

def check_password(password, user):
  """
  Validate user password before signup

  1. UserAttributeSimilarityValidator (require user object)
  2. MinimumLengthValidator
  3. CommonPasswordValidator
  4. NumericPasswordValidator
  """

  errors = {}

  try:
    validate_password(password=password, user=user)
  except ValidationError as error:
    errors['password'] = list(error.messages)

  if errors:
    # Raised error will be caught by serializer.is_valid()
    raise serializers.ValidationError(errors)
  
  return



