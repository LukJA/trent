from django.db import models
from django.contrib.auth.models import User

class IntegerRangeField(models.IntegerField):
    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.IntegerField.__init__(self, verbose_name, name, **kwargs)
    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value':self.max_value}
        defaults.update(kwargs)
        return super(IntegerRangeField, self).formfield(**defaults)

def current_investment_default():
    return {"Test": 1}

class UserData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    salary = models.PositiveIntegerField()
    checkpoints = models.JSONField()
    fund_preference = models.JSONField()
    current_investment = models.JSONField(default=current_investment_default)
    charity_preference = IntegerRangeField(min_value=0, max_value=100)
    salary_preference = IntegerRangeField(min_value=0, max_value=100) # fraction invested

    def __str__(self):
        return f'{self.user.username} ({self.pk})'
    
    class Meta:
        ordering = ["user"]
        verbose_name_plural = "User data"
