from django.db import models
from localflavor.br.models import BRCPFField
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin)
from base import functions


class UserManager(BaseUserManager):

    def _create_user(self, username, email, password, is_staff, is_superuser, **extra_fields):
        if not username:
            raise ValueError('Nome de usuário inválido')
        email = self.normalize_email(email)
        user = self.model(username=email, email=email,
                          is_staff=is_staff, is_active=True,
                          is_superuser=is_superuser, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_user(self, username, email, password=None, **extra_fields):
        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        username = email
        user = self._create_user(username, email, password, is_staff=True,
                                 is_superuser=True, **extra_fields)
        user.is_active = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    nickname = models.CharField(max_length=30, null=True, blank=True)
    cpf = models.CharField(max_length=15)
    email = models.EmailField(max_length=100, unique=True, db_index=True)
    phone = models.CharField(max_length=20, null=True)
    birthday = models.DateField(null=True)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_honey = models.BooleanField(default=False)
    is_honey_first = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.name

    def tokens(self):
        pass


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/mel.png')
    expire = models.CharField(default='', max_length=10)
    category = models.CharField(max_length=100, null=True, blank=True)
    type = models.CharField(default='U', max_length=1, choices=(
        ('U', 'Unique'),
        ('V', 'Variation')
    ))
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    promo_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True, default=0)
    countInStock = models.PositiveIntegerField(
        null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.CharField(max_length=100, null=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=100, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    observation = models.TextField(null=True, blank=True)

    def __str__(self):
        return str(self._id)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=1)
    type = models.CharField(max_length=10, null=True)
    variation = models.CharField(max_length=50, null=True)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=250, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Address(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.SET_NULL, null=True, blank=True)
    cep = models.CharField(max_length=100, null=True, blank=True)
    cidade = models.CharField(max_length=100, null=True, blank=True)
    endereço = models.CharField(max_length=100, null=True, blank=True)
    bairro = models.CharField(max_length=100, null=True, blank=True)
    ponto = models.CharField(max_length=100, null=True, blank=True)
    complemento = models.CharField(max_length=100, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.endereço)


class Variation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=True, null=True)
    image = models.ImageField(null=True, blank=True, default='/mel.png')
    expire = models.CharField(default='', max_length=10)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    promo_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.PositiveIntegerField(
        null=True, blank=True, default=0)
    remove_pin = models.CharField(
        null=True, max_length=10, unique=True)

    def __str__(self):
        return str(f'{self.product.name} ({self.name})')


class Coupon(models.Model):
    code = models.CharField(max_length=15)
    amount = models.PositiveIntegerField()
