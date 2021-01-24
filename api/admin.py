from django.contrib import admin
from .models import Fund

# Register your models here.
class FundAdmin(admin.ModelAdmin):
    list_display = ('name', 'mean', 'variance')

admin.site.register(Fund, FundAdmin)
