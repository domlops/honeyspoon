from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name='products'),
    path('create/', views.createProduct, name='create-product'),
    path('<str:pk>/create/variation',
         views.createVariation, name='create-variation'),
    path('upload/', views.uploadImage, name='upload-product'),

    path('<str:pk>/reviews/', views.createReview, name='product-reviews'),
    path('<str:pk>/admin', views.getProductAdmin, name='product-admin'),
    path('<str:pk>/', views.getProduct, name='product'),
    path('<str:pk>/<str:id>', views.getVariation, name='variation'),

    path('update/<str:pk>/', views.updateProduct, name='update-product'),
    path('update/<str:pk>/<str:id>',
         views.updateVariation, name='update-variation'),
    path('delete/<str:pk>/', views.deleteProduct, name='delete-product'),
    path('delete/<str:pk>/<str:id>/',
         views.deleteVariation, name='delete-variation'),
]
