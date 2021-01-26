from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action

from django.db.models import F

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
    user_boards = self.get_queryset().filter(owner=request.user.id)
    serializer = self.get_serializer(user_boards, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)

  @action(methods=['put'], detail=False)
  def switch_order(self, request):
    print(request.data)
    boardId = request.data['board']
    boardOrder = request.data['order']

    Board.objects.filter(order__gte=boardOrder).update(order=F('order') + 1)
    Board.objects.filter(pk=boardId).update(order=boardOrder)

    return Response(status=status.HTTP_200_OK)

  def create(self, request):

    current_user = request.user

    # Read InMemoryFile as binary data
    image = request.data.get("image")
    if (image == ''):
      image_binary = b''
    else:
      image_binary = image.read()

    board_data = {
      "title": request.data.get("title"),
      "about": request.data.get("about"),
      "color": request.data.get("color"),
      "image": image_binary,
      "owner": current_user.id, # Add owner field
      "order": request.data.get("order")
    }

    # Check if data is valid with serializer
    serializer = self.get_serializer(data=board_data)
    serializer.is_valid(raise_exception=True)

    # Save board. Errors will be thrown and returned within save()
    serializer.save()

    return Response(data=serializer.data, status=status.HTTP_201_CREATED)