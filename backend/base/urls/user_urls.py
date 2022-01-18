from django.urls import path
from base.views import user_views as views

# Our root urls file has /api/users/ so the base url path for this file is already config

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('register/', views.registerUser, name='register'),

    path('profile/', views.getUserProfile, name='user-profile'),
    path('', views.getUsers, name='users'),
]