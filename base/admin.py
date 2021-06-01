from django.contrib import admin
from .models import *


class VariationInline(admin.TabularInline):
    model = Variation
    extra = 1


class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'promo_price']
    inlines = [VariationInline]


admin.site.register(Product, ProductAdmin)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Address)
admin.site.register(Variation)
admin.site.register(User)
admin.site.register(Coupon)
