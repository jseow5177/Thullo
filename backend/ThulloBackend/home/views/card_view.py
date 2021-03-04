from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action

from django.db.models import F
from django.db import transaction

from home.serializers import CardSerializer
from home.models import Card

class CardViewSet(ModelViewSet):
  """
  A viewset for cards
  """
  serializer_class = CardSerializer

  @transaction.atomic
  def create(self, request):
    """
    Create a new card for a list in a board
    """
    list_id = request.data.get("listId")
    number_of_cards_in_list = Card.objects.filter(board_list=list_id)

    card_data = {
      "summary": request.data.get("summary"),
      "description": request.data.get("description"),
      "board_list": list_id,
      "label": request.data.get("labels"),
      "order": number_of_cards_in_list.count()
    }

    # Check if data is valid with serializer
    serializer = self.get_serializer(data=card_data)
    serializer.is_valid(raise_exception=True)

    # Save new card
    card = serializer.save()

    return Response(data=serializer.data, status=status.HTTP_201_CREATED)

  @action(methods=['put'], detail=False)
  def switch_order(self, request):
    """
    Switch the order of cards. Could happen between lists
    """
    card_id = request.data.get('id')
    source = request.data.get('source')
    destination = request.data.get('destination')

    if source['id'] == destination['id']: # If dragged within the same list
      if destination['order'] > source['order']: # Card is dragged to the bottom
        # Decrement the order of cards located between source (exclusive) and destination (inclusive)
        Card.objects \
          .filter(board_list=source['id'], order__gt=source['order'], order__lte=destination['order']) \
          .update(order=F('order') - 1)
      elif destination['order'] < source['order']: # Card is dragged to the top
        # Increment the order of cards located between destination (exclusive) and source (inclusive)
        Card.objects \
          .filter(board_list=source['id'], order__gte=destination['order'], order__lt=source['order']) \
          .update(order=F('order') + 1)
          
      # Change the order of dragged card
      Card.objects.filter(pk=card_id).update(order=destination['order'])
    else:
      # Source list loses one card
      Card.objects.filter(board_list=source['id'], order__gt=source['order']).update(order=F('order') - 1)
      # Destination list gains one card
      Card.objects.filter(board_list=destination['id'], order__gte=destination['order']).update(order=F('order') + 1)

      # Change the order of dragged card and the list it belongs
      Card.objects.filter(pk=card_id).update(order=destination['order'], board_list=destination['id'])

    return Response(status=status.HTTP_200_OK)