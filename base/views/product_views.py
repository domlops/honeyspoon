from os import remove
from base import functions
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from base import serializers
from base.models import  Product, Review, Variation
from base.serializers import ProductSerializer, VariationSerializer


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('search')

    if query == None:
        query = ''

    categories = Product.objects.values_list('category', flat=True)

    if query in categories:
        products = Product.objects.filter(category=query)
    else:
        products = Product.objects.filter(
            name__icontains=query).order_by('_id')

    page = request.query_params.get('page')
    paginator = Paginator(products, 12)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({
        'products': serializer.data,
        'page': page,
        'pages': paginator.num_pages
    })


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getVariation(request, pk, id):
    product = Product.objects.get(_id=pk)
    variation = Variation.objects.get(product=product, id=id)
    serializer = VariationSerializer(variation, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='',
        price=0,
        promo_price=0,
        category='Bolinhas',
        countInStock=0,
        description='',
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createVariation(request, pk):
    product = Product.objects.get(_id=pk)
    variation = Variation.objects.create(
        product=product,
        name='',
        price=product.price,
        promo_price=product.promo_price,
        countInStock=0,
        remove_pin=functions.randomvariation()
    )
    serializer = VariationSerializer(variation, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.category = data['category']
    product.price = data['price']
    product.type = data['type']
    product.expire = data['expire']
    product.promo_price = data['promo_price']
    product.countInStock = data['countInStock']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateVariation(request, pk, id):
    data = request.data

    product = Product.objects.get(_id=pk)
    variation = Variation.objects.get(product=product, id=id)

    variation.product = product
    variation.name = data['name']
    variation.price = data['price']
    variation.promo_price = data['promo_price']
    variation.countInStock = data['countInStock']

    variation.save()

    serializer = VariationSerializer(variation, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Produto Excluído')


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteVariation(request, pk, id):
    product = Product.objects.get(_id=pk)
    variation = Variation.objects.get(product=product, id=id)
    variation.delete()
    return Response('Variação Excluída')


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    variation = 0
    if 'variation_id' in data:
        variation = True
    else:
        variation = False

    if variation:
        id = data['product_id']
        pk = data['variation_id']
        product = Product.objects.get(_id=id)
        variation = Variation.objects.get(product=product, id=pk)

        variation.image = request.FILES.get('image')
        variation.save()
        return Response('Imagem enviada com sucesso')
    else:
        product_id = data['product_id']
        product = Product.objects.get(_id=product_id)

        product.image = request.FILES.get('image')
        product.save()
        return Response('Imagem enviada com sucesso')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createReview(request, pk):
    product = Product.objects.get(_id=pk)
    user = request.user
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Você já avaliou este produto'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Por favor, deixe uma nota para o produto.'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.name,
            rating=data['rating'],
            comment=data['comment'],
            createdAt=timezone.now().strftime('%d-%m-%Y')
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response({'detail': 'Avaliação submetida!'})
