import json
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action

from django.db.models import F
from django.db import transaction

from home.serializers import BoardSerializer, ListSerializer, LabelSerializer
from home.models import Board, List, Label

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
  
  def retrieve(self, request, pk=None):

    boardInfo = {}

    # TODO: Retrive board info. Throw 404 when not found

    # Retrieve board lists
    boardLists = List.objects.filter(board=pk)
    boardInfo['lists'] = ListSerializer(boardLists, many=True).data

    # Retrieve board labels
    boardLabels = Label.objects.filter(board=pk)
    boardInfo['labels'] = LabelSerializer(boardLabels, many=True).data

    return Response(data=boardInfo, status=status.HTTP_200_OK)

  @transaction.atomic
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

    # Parse json string
    labels = json.loads(request.data.get("labels"))

    # Save board default labels
    self.save_default_labels(labels, boardId=serializer.data['id'])

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

  def save_default_labels(self, labels, boardId):
    """
    Save the default labels of a board, constant time O(1)
    """
    for label in labels:
      label.update({ 'board': boardId })

      serializer = LabelSerializer(data=label)
      serializer.is_valid(raise_exception=True)

      serializer.save()
    
    return

class ListViewSet(ModelViewSet):
  """
  A viewset for lists
  """
  serializer_class = ListSerializer

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
  
class LabelViewSet(ModelViewSet):
  """
  A viewset for labels
  """
  serializer_class = LabelSerializer

  def create(self, request):
    """
    Create a new label for a board
    """
    # Check if data is valid with serializer
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    # Save label
    serializer.save()

    return Response(data=serializer.data, status=status.HTTP_201_CREATED)