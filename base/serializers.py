from django.db.models import fields
from django.utils.formats import number_format
from rest_framework import serializers
from .models import Coupon, Product, Order, OrderItem, Address, Review, Variation, User
from rest_framework_simplejwt.tokens import RefreshToken

from base import models


class UserSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'username', 'cpf',
                  'birthday', 'email', 'phone', 'name', 'last_name', 'nickname', 'is_staff', 'is_honey_first', 'is_honey']

    def get__id(self, obj):
        return obj.id


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name', 'last_name', 'nickname', 'cpf', 'phone', 'is_staff', 'is_honey_first', 'is_honey',
                  'is_verified', 'birthday', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)

        return str(token.access_token)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class VariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variation
        fields = '__all__'

class RelationalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['_id', 'name', 'image', 'countInStock', 'price', 'promo_price']

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    variations = serializers.SerializerMethodField(read_only=False)
    related = RelationalSerializer(many=True, read_only=True)
    similar = RelationalSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_variations(self, obj):
        variations = obj.variation_set.all()
        serializer = VariationSerializer(variations, many=True)
        return serializer.data

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

class ProductAdminSerializer(serializers.ModelSerializer):
    variations = serializers.SerializerMethodField(read_only=False)

    class Meta:
        model = Product
        fields = '__all__'

    def get_variations(self, obj):
        variations = obj.variation_set.all()
        serializer = VariationSerializer(variations, many=True)
        return serializer.data

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_address(self, obj):
        try:
            address = AddressSerializer(obj.address, many=False).data

        except:
            address = False

        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'
