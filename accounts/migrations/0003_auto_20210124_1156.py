# Generated by Django 3.1.5 on 2021-01-24 11:56

import accounts.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210124_1137'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='fund_preference',
            field=models.JSONField(default=accounts.models.fund_preference_default),
        ),
    ]