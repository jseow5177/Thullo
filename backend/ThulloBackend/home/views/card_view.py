from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from django.db import transaction

from home.serializers import CardSerializer
from home.models import Card

class CardViewSet(ModelViewSet):
  """
  A viewset for cards
  """
  serializer_class = CardSerializer

  def get_queryset(self):
    queryset = Card.objects.all()
    return queryset

  @transaction.atomic
  def create(self, request):
    """
    Create a new card for a list in a board
    """
    card_data = {
      "summary": request.data.get("summary"),
      "description": request.data.get("description"),
      "board_list": request.data.get("listId"),
      "label": request.data.get("labels")
    }

    # Check if data is valid with serializer
    serializer = self.get_serializer(data=card_data)
    serializer.is_valid(raise_exception=True)

    # Save new card
    card = serializer.save()

    return Response(data=serializer.data, status=status.HTTP_201_CREATED)