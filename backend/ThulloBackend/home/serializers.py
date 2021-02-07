from home.models import Board, List
from rest_framework import serializers

class BoardSerializer(serializers.ModelSerializer):

  class Meta:
    model = Board
    fields = "__all__"

class ListSerializer(serializers.ModelSerializer):

  class Meta:
    model = List
    fields = "__all__"