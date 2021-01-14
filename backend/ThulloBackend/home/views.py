from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from home.serializers import BoardSerializer
from home.models import Board

class BoardViewSet(ModelViewSet):
  """
  A viewset to add and retrieve boards
  """

  serializer_class = BoardSerializer

  def create(self, request):

    current_user = request.user

    board_data = {
      "title": request.data.get("title"),
      "about": request.data.get("about"),
      "color": request.data.get("color"),
      "cover_photo": request.data.get("cover_photo"),
      "owner": current_user.id # Add owner field
    }

    # Check if data is valid with serializer
    serializer = self.get_serializer(data=board_data)
    serializer.is_valid(raise_exception=True)

    # Save board. Errors will be thrown and returned within save()
    instance = serializer.save()

    return Response(data=instance, status=status.HTTP_201_CREATED)