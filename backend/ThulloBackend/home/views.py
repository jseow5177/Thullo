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

  def get_queryset(self):
    queryset = Board.objects.all()
    return queryset

  def list(self, request):
    all_boards = self.get_queryset()
    serializer = self.get_serializer(all_boards, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)

  def create(self, request):

    current_user = request.user

    # Read InMemoryFile as binary data
    image_binary = request.data.get("image").read()

    board_data = {
      "title": request.data.get("title"),
      "about": request.data.get("about"),
      "color": request.data.get("color"),
      "image": image_binary,
      "owner": current_user.id # Add owner field
    }

    # Check if data is valid with serializer
    serializer = self.get_serializer(data=board_data)
    serializer.is_valid(raise_exception=True)

    # Save board. Errors will be thrown and returned within save()
    serializer.save()

    return Response(data=serializer.data, status=status.HTTP_201_CREATED)