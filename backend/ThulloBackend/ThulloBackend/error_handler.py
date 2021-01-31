from rest_framework.views import exception_handler
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
from rest_framework.response import Response

def thullo_exception_handler(exc, context):
  # Call REST's default exception handler
  response = exception_handler(exc, context)

  errors = []

  """
  Serialize errors into a standard format.
  Easier for frontend to consume.
  """
  if (isinstance(exc, (InvalidToken, AuthenticationFailed))):
    exc.detail = exc.detail['detail']
  
  try:
    # Mainly for validation errors
    for field, error in exc.detail.items():
      # Return first ErrorDetail object if a list. Else return as it is
      error_detail = error[0] if isinstance(error, list) else error
      error = { 'field': field, 'message': error_detail, 'code': error_detail.code }
      errors.append(error)
  except AttributeError:
    error = { 'field': '', 'message': exc.detail, 'code': exc.detail.code }
    errors.append(error)

  return Response(errors, status=response.status_code)