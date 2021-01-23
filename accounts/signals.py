from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import UserData


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserData.objects.create(
            user=instance,
            salary=30000,
            checkpoints={'Test': 1},
            fund_preference={'1': 20, '2':20, '3':20, '4':20, '5':20},
            charity_preference=10,
            salary_preference=30,
            )
