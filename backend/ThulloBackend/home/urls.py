from django.urls import path
from django.conf.urls import include

from rest_framework import routers

from home.views.board_view import BoardViewSet
from home.views.card_view import CardViewSet
from home.views.list_view import ListViewSet
from home.views.label_view import LabelViewSet

router = routers.DefaultRouter()
router.register(r'board', BoardViewSet, basename='board')
router.register(r'list', ListViewSet, basename='list')
router.register(r'label', LabelViewSet, basename='label')
router.register(r'card', CardViewSet, basename='card')

urlpatterns = router.urls