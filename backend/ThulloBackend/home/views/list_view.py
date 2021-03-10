from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action

from django.db import transaction
from django.db.models import F

from home.models import List
from home.serializers import ListSerializer

class ListViewSet(ModelViewSet):
  """
  A viewset for lists
  """
  queryset = List.objects.all()

  def create(self, request):
    """
    Create a list for a board
    """
    board_id = request.data.get('board')
    number_of_lists = List.objects.filter(board_id=board_id).count()
    request.data['order'] = number_of_lists

    # Check if data is valid with serializer
    serializer = ListSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    # Save list
    serializer.save()

    return Response(data=serializer.data, status=status.HTTP_201_CREATED)
  
  def update(self, request, pk=None):
    """
    Update an existing list of a board
    """
    board_list = List.objects.get(pk=pk)

    # Check if data is valid with serializer
    serializer = ListSerializer(board_list, data=request.data, exclude_fields=['order', 'board'])
    serializer.is_valid(raise_exception=True)

    # Save existing list
    serializer.save()

    return Response(data=serializer.data, status=status.HTTP_200_OK)

  @transaction.atomic
  def destroy(self, request, pk=None):
    """
    Delete an existing list of a board
    """
    board_list = List.objects.get(pk=pk)

    # Bring all lists after the deleted list forward
    List.objects.filter(board_id=board_list.board.id, order__gt=board_list.order).update(order=F('order') - 1)

    board_list.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)

  @action(methods=['put'], detail=False)
  def switch_order(self, request):
    """
    Switch the order of lists
    """
    list_id = request.data.get('id')
    source = request.data.get('source')
    destination = request.data.get('destination')

    board_id_of_list = List.objects.get(id=list_id).board_id

    if destination > source: # List is dragged to the back
      # Decrement the order of lists located between source (exclusive) and destination (inclusive)
      List.objects \
        .filter(board_id=board_id_of_list, order__gt=source, order__lte=destination) \
        .update(order=F('order') - 1)
    elif destination < source: # List is dragged to the front
      # Increment the order of lists located between destination (exclusive) and source (inclusive)
      List.objects \
        .filter(board_id=board_id_of_list, order__gte=destination, order__lt=source) \
        .update(order=F('order') + 1)

    # Change the order of dragged list
    List.objects.filter(pk=list_id).update(order=destination)

    return Response(status=status.HTTP_204_NO_CONTENT)