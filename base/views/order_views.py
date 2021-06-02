from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, Address, Variation, Coupon
from base.serializers import OrderSerializer, CouponSerializer
from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkCoupon(request):
    coupons = Coupon.objects.values_list('code', flat=True)
    data = request.data
    data = data['coupon']

    if data not in coupons:
        return Response({'detail': 'Cupom Inválido ou Expirado'}, status=status.HTTP_400_BAD_REQUEST)

    else:
        coupon = Coupon.objects.get(code=data)
        coupon.amount -= 1

        serializer = CouponSerializer(coupon, many=False)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'Não há itens no seu pedido'},
                        status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )
        Address.objects.create(
            order=order,
            endereço=data['shippingAddress']['endereço'],
            cidade=data['shippingAddress']['cidade'],
            cep=data['shippingAddress']['cep'],
            bairro=data['shippingAddress']['bairro'],
            ponto=data['shippingAddress']['ponto'],
            complemento=data['shippingAddress']['complemento'],
        )
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            variation = Variation.objects.get(id=i['variation']['id'])
            if float(i['variation']['promo_price']) > 0:
                data_price = i['variation']['promo_price']
            else:
                data_price = i['variation']['price']
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                type=product.type,
                variation=variation.name,
                qty=i['qty'],
                price=data_price,
                image=i['variation']['image'],
            )
            variation.countInStock -= item.qty
            product.countInStock -= item.qty
            variation.save()
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    for order in orders:
        order.createdAt = order.createdAt.strftime('%d-%m-%Y')
        if order.paidAt:
            order.paidAt = order.paidAt.strftime('%d-%m-%Y')
        if order.deliveredAt:
            order.deliveredAt = order.deliveredAt.strftime('%d-%m-%Y')

    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    for order in orders:
        order.createdAt = order.createdAt.strftime('%d-%m-%Y')
        if order.paidAt:
            order.paidAt = order.paidAt.strftime('%d-%m-%Y')
        if order.deliveredAt:
            order.deliveredAt = order.deliveredAt.strftime('%d-%m-%Y')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    order = Order.objects.get(_id=pk)
    if order.paidAt:
        order.paidAt = order.paidAt.strftime('%d-%m-%Y')
    if order.deliveredAt:
        order.deliveredAt = order.deliveredAt.strftime('%d-%m-%Y')

    try:
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Você não tem autorização pra isso.'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'O pedido não existe.'},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Pedido pago')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Pedido entrege')
