from django.urls import path
from django.conf.urls import include

from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

from auth.views import UserSignUpViewSet, EmailTokenObtainPairView

router = routers.DefaultRouter()
router.register(r'', UserSignUpViewSet, basename='auth')

urlpatterns = [
  path('login/', EmailTokenObtainPairView.as_view(), name='login'),
  path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('', include(router.urls))
]