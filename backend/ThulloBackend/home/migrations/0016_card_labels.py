# Generated by Django 3.1.3 on 2021-02-25 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0015_remove_card_labels'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='labels',
            field=models.ManyToManyField(blank=True, to='home.Label'),
        ),
    ]