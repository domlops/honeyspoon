# Generated by Django 3.2 on 2022-07-23 22:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0018_product_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='related',
            field=models.JSONField(default=list),
        ),
    ]