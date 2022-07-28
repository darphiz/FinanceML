from django.urls import path
from . import views


urlpatterns = [
    path('user/', views.userView),
    path('user/register/', views.register_view),
    path('user/login/', views.login_view),
    path('user/logout/', views.logout_view),
    path('plaid/create_link_token/', views.create_link_token),
    path('plaid/exchange_public_token/', views.exchange_public_token),
]