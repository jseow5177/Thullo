from home.models import Board, List, Card, Label
from rest_framework import serializers

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
  """
  A ModelSerializer that takes an additional `exclude_fields` argument 
  that excludes model fields from the serializer.

  https://www.django-rest-framework.org/api-guide/serializers/#dynamically-modifying-fields
  """
  def __init__(self, *args, **kwargs):
    # Don't pass the `exclude_fields` arg up to the superclass
    exclude_fields = kwargs.pop('exclude_fields', None)

    super().__init__(*args, **kwargs)

    if exclude_fields is not None:
      for field in exclude_fields:
        self.fields.pop(field)
    

class BoardSerializer(DynamicFieldsModelSerializer):

  class Meta:
    model = Board
    fields = "__all__"

class ListSerializer(DynamicFieldsModelSerializer):

  class Meta:
    model = List
    fields = "__all__"

class LabelSerializer(DynamicFieldsModelSerializer):

  class Meta:
    model = Label
    fields = "__all__"
  
class CardSerializer(DynamicFieldsModelSerializer):

  class Meta:
    model = Card
    fields = "__all__"