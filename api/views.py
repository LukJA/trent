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
    def get(self, request):
        # Get invest from post request data
        userdata = UserData.objects.get(user=request.user)
        value, time, static, lower, upper = userdata.projectInvestments()
        # user = request.user
        return Response(
            {
            'value': value,
            'time': time,
            'static': static,
            'lower': lower,
            'upper': upper,
            })

class PredictSalary(APIView):
    def get(self, request):
        userdata = UserData.objects.get(user=request.user)
        predicted_salary = userdata.get_predicted_salary(t=30)
        net_expendable = list(predicted_salary*(1 - userdata.salary_preference/100))
        return Response(
            {
            'predicted_salary': predicted_salary,
            'net_expendable': net_expendable,
            }
            )
