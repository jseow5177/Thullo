from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action

from django.db.models import F

from home.serializers import BoardSerializer, ListSerializer
from home.models import Board
from home.models import List

class BoardViewSet(ModelViewSet):
  """
  A viewset for boards
  """

  serializer_class = BoardSerializer

  def get_queryset(self):
    queryset = Board.objects.all()
    return queryset

  def list(self, request):
    user_boards = self.get_queryset().filter(owner=request.user.id)
    serializer = self.get_serializer(user_boards, many=True)

    return Response(data=serializer.data, status=status.HTTP_200_OK)

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

    # Save board
    serializer.save()

    return Response(data=serializer.data, status=status.HTTP_201_CREATED)

  @action(methods=['put'], detail=False)
  def switch_order(self, request):
    """
    Switch the order of boards when a board is dragged to another position
    """
    boardId = request.data['board']
    boardOrder = request.data['order']

    # Increment the order of boards after the dragged board
    Board.objects.filter(order__gte=boardOrder).update(order=F('order') + 1)

    # Update order of board
    Board.objects.filter(pk=boardId).update(order=boardOrder)

    return Response(status=status.HTTP_200_OK)

class ListViewSet(ModelViewSet):
  """
  A viewset for lists
  """
  serializer_class = ListSerializer

  def get_queryset(self):
    queryset = List.objects.all()
    return queryset
  
  def list(self, request):
    boardId = request.GET.get('boardId', '')

    board_lists = self.get_queryset().filter(board=boardId)
    serializer = self.get_serializer(board_lists, many=True)

    return Response(data=serializer.data, status=status.HTTP_200_OK)

  def create(self, request):
    """
    Create a list for a board
    """
    # Check if data is valid with serializer
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    # Save list
    serializer.save()

    return Response(data=serializer.data, status=status.HTTP_201_CREATED)