from accounts.models import UserData
from rest_framework import serializers


class UserDataSerializer(serializers.HyperlinkedModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    class Meta:
        model = UserData
        fields = ['salary', 'checkpoints', 'fund_preference', 'charity_preference', 'salary_preference']
