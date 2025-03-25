from django.urls import path
from .views import CreateOrderView, UserOrderListView

urlpatterns = [
    path('', CreateOrderView.as_view(), name='create-order'),
    path('my-orders/', UserOrderListView.as_view(), name='my-orders'),
]