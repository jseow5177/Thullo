from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from home.serializers import ListSerializer

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