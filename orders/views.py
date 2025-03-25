from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem
from cart.models import CartItem
from products.models import Product
from decimal import Decimal

from rest_framework import generics
from .serializers import OrderSerializer
from .models import Order

class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        cart_items = CartItem.objects.filter(user=user)

        if not cart_items.exists():
            return Response({'detail': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(user=user)
        total_cost = Decimal('0.00')

        for item in cart_items:
            if item.product.stock < item.quantity:
                return Response({'detail': f'Insufficient stock for {item.product.name}'}, status=status.HTTP_400_BAD_REQUEST)

            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

            total_cost += item.product.price * item.quantity

            # Reduce product stock
            item.product.stock -= item.quantity
            item.product.save()

        # Save total and clear cart
        order.total = total_cost
        order.save()
        cart_items.delete()

        return Response({'message': 'Order placed successfully'}, status=status.HTTP_201_CREATED)



class UserOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')