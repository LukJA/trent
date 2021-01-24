from accounts.models import UserData
from rest_framework import serializers


class UserDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserData
        fields = ['salary',
        'age',
        'job',
        'checkpoints', 
        'fund_preference', 
        'current_investment', 
        'charity_preference', 
        'salary_preference']
