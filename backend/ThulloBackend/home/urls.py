from django.urls import path
from django.conf.urls import include

from rest_framework import routers

from home.views import BoardViewSet

router = routers.DefaultRouter()
router.register(r'', BoardViewSet, basename='board')

urlpatterns = [
  path('', include(router.urls))
]