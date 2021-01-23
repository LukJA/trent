from rest_framework import viewsets
from .serializers import UserDataSerializer
from accounts.models import UserData


class UserDataViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        # get user from request object
        user = self.request.user
        # return userdata filtered by user and ordered by primary key (date of creation)
        return UserData.objects.filter(user=user).order_by('-id')
