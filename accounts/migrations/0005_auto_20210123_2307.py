# Generated by Django 3.1.5 on 2021-01-23 23:07

import accounts.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_auto_20210123_2306'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='current_investment',
            field=models.JSONField(default=accounts.models.current_investment_default),
        ),
    ]
