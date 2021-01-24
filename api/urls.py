from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'userdata', views.UserDataViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('predict-value/', views.PredictValue.as_view()),
    path('predict-salary/', views.PredictSalary.as_view()),
    path('', include(router.urls)),
]