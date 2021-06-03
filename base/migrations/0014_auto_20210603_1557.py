# Generated by Django 3.2 on 2021-06-03 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_orderitem_observation'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='last_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='nickname',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='cpf',
            field=models.CharField(max_length=15),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
