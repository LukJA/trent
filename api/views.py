from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from .serializers import UserDataSerializer
from accounts.models import UserData
from .models import Fund


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


class PredictValue(APIView):
    def post(self, request):
        # Get invest from post request data
        invest = request.data['invest']
        projection, static = Fund.objects.first().predict_value(invest)
        # user = request.user
        return Response(
        {
            'projection': projection,
            'static': static,
        })