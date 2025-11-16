from django.urls import path,include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import UserViewSet, ProfileViewSet,TeamViewSet,AuthViewSet

router = DefaultRouter()

router.register(r'users',UserViewSet,basename='users')
router.register(r'profiles', ProfileViewSet, basename='profiles')
router.register(r'teams', TeamViewSet, basename='teams')
router.register(r'auth', AuthViewSet,basename='auth')

urlpatterns = [
    path('',include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),   
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  
]