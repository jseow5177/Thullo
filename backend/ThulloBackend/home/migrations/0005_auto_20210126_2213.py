# Generated by Django 3.1.3 on 2021-01-26 22:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_board_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='order',
            field=models.IntegerField(),
        ),
    ]
