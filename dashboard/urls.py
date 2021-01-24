from django.urls import path
from . import views

urlpatterns = [
    path('checkpoints/', views.CheckpointsView.as_view(), name='checkpoints'),
    path('analysis/', views.AnalysisView.as_view(), name='analysis'),
    path('reports/', views.ReportsView.as_view(), name='reports'),
    path('settings/', views.SettingsView.as_view(), name='settings'),
    path('welcomenote/', views.WelcomenoteView.as_view(), name='welcomenote'),
    path('', views.DashboardView.as_view(), name='dashboard'),
]
