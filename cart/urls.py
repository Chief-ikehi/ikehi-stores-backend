from django.urls import path
from .views import AddToCartView, CartListView

urlpatterns = [
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
    path('', CartListView.as_view(), name='cart-list'),
]