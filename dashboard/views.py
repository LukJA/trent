from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator


# Create your views here.
@method_decorator(login_required, name='dispatch')
class DashboardView(TemplateView):
    template_name = 'dashboard/dashboard.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        print('Data processing')
        context['Test'] = 'Test'
        return context

@method_decorator(login_required, name='dispatch')
class SettingsView(TemplateView):
    template_name = 'dashboard/settings.html'

@method_decorator(login_required, name='dispatch')
class AnalysisView(TemplateView):
    template_name = 'dashboard/analysis.html'

@method_decorator(login_required, name='dispatch')
class ReportsView(TemplateView):
    template_name = 'dashboard/reports.html'

@method_decorator(login_required, name='dispatch')
class CheckpointsView(TemplateView):
    template_name = 'dashboard/checkpoints.html'