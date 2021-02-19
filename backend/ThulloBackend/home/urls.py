from django.urls import path
from django.conf.urls import include

from rest_framework import routers

from home.views import BoardViewSet, ListViewSet, LabelViewSet

router = routers.DefaultRouter()
router.register(r'board', BoardViewSet, basename='board')
router.register(r'list', ListViewSet, basename='list')
router.register(r'label', LabelViewSet, basename='label')

urlpatterns = router.urls