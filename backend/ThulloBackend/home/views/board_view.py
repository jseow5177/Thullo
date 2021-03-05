import json
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action

from django.db.models import F
from django.db import transaction

from home.serializers import BoardSerializer, ListSerializer, LabelSerializer, CardSerializer
from home.models import Board, List, Label, Card

class BoardViewSet(ModelViewSet):
  """
  A viewset for boards
  """

  serializer_class = BoardSerializer

  def list(self, request):
    user_boards = Board.objects.all().filter(owner=request.user.id).order_by('order')
    serializer = self.get_serializer(user_boards, many=True)

    return Response(data=serializer.data, status=status.HTTP_200_OK)
  
  def retrieve(self, request, pk=None):
    """
    Retrieve board lists and labels

    The cards will be retrieved by each list through a separate API
      when they are rendered on the frontend
    """

    boardInfo = {}

    # TODO: Retrive board info. Throw 404 when not found

    # Retrieve board lists
    boardLists = List.objects.filter(board=pk).order_by('order')
    boardInfo['lists'] = ListSerializer(boardLists, many=True).data

    # Retrieve board labels
    boardLabels = Label.objects.filter(board=pk).order_by('id')
    boardInfo['labels'] = LabelSerializer(boardLabels, many=True).data

    # Retrieve board cards
    cards = {}
    for boardList in boardLists:
      listId = boardList.id
      boardCards = Card.objects.filter(board_list=listId).order_by('order')
      serialized_cards = CardSerializer(boardCards, many=True).data
      cards[listId] = serialized_cards

    boardInfo['cards'] = cards

    return Response(data=boardInfo, status=status.HTTP_200_OK)

  @transaction.atomic
  def create(self, request):

    current_user = request.user
    number_of_user_boards = Board.objects.filter(owner_id=current_user.id).count()

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
      "order": number_of_user_boards
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

  @transaction.atomic
  @action(methods=['put'], detail=False)
  def switch_order(self, request):
    """
    Switch the order of boards when a board is dragged to another position
    """
    current_user_id = request.user.id
    board_id = request.data.get('id')
    source = request.data.get('source')
    destination = request.data.get('destination')

    if destination > source:
      Board.objects \
        .filter(owner_id=current_user_id, order__gt=source, order__lte=destination) \
        .update(order=F('order') - 1)
    elif destination < source:
      Board.objects \
        .filter(owner_id=current_user_id, order__gte=destination, order__lt=source) \
        .update(order=F('order') + 1)
    
    # Change the order of dragged board
    Board.objects.filter(pk=board_id).update(order=destination)

    return Response(status=status.HTTP_204_NO_CONTENT)

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