from django.db import models

from auth.models import User

class Board(models.Model):
  title = models.CharField(max_length=50, blank=False, null=False)
  about = models.TextField(max_length=200, blank=True, null=False)
  image = models.BinaryField(blank=True, null=False, editable=True)
  color = models.CharField(max_length=7, blank=False, null=False)
  order = models.PositiveIntegerField(blank=False, null=False)

  owner = models.ForeignKey(User, on_delete=models.CASCADE)

  class Meta:
    verbose_name = "Board"



