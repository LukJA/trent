from accounts.models import UserData
from rest_framework import serializers


class UserDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserData
        fields = ['salary', 'checkpoints', 'fund_preference', 'charity_preference', 'salary_preference']
