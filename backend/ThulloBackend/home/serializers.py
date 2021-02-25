from home.models import Board, List, Card, Label
from rest_framework import serializers

class BoardSerializer(serializers.ModelSerializer):

  class Meta:
    model = Board
    fields = "__all__"

class ListSerializer(serializers.ModelSerializer):

  class Meta:
    model = List
    fields = "__all__"

class LabelSerializer(serializers.ModelSerializer):

  class Meta:
    model = Label
    fields = "__all__"
  
class CardSerializer(serializers.ModelSerializer):
  
  labels = LabelSerializer(many=True)

  class Meta:
    model = Card
    fields = "__all__"