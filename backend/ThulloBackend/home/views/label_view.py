from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from home.serializers import LabelSerializer
from home.models import Label

class LabelViewSet(ModelViewSet):
  """
  A viewset for labels
  """
  queryset = Label.objects.all()

  def create(self, request):
    """
    Create a new label for a board
    """
    # Check if data is valid with serializer
    serializer = LabelSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    # Save label
    serializer.save()

    return Response(data=serializer.data, status=status.HTTP_201_CREATED)
  
  def update(self, request, pk=None):
    """
    Update an existing label of a board
    """
    label = Label.objects.get(pk=pk)

    # Check if data is valid with serializer
    serializer = LabelSerializer(label, data=request.data, exclude_fields=['board'])
    serializer.is_valid(raise_exception=True)

    # Save existing label
    serializer.save()

    return Response(data=serializer.data, status=status.HTTP_200_OK)

  def destroy(self, request, pk=None):
    """
    Delete an existing label of a board
    """
    label = Label.objects.filter(pk=pk)

    label.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)