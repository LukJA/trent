from django.db import models
from django.contrib.auth.models import User
import numpy as np
from api.models import Fund

class IntegerRangeField(models.IntegerField):
    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.IntegerField.__init__(self, verbose_name, name, **kwargs)
    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value':self.max_value}
        defaults.update(kwargs)
        return super(IntegerRangeField, self).formfield(**defaults)

def current_investment_default():
    return [[2000, "VFIFX"], [2000, "VMMSX"], [2000, "VSCGX"], [2000, "VASGX"], [2000, "VMIGX"]]

def fund_preference_default():
    return [[0.1, "VFIFX"], [0.1, "VMMSX"], [0.2, "VSCGX"], [0.2, "VASGX"], [0.4, "VMIGX"]]

def checkpoint_default():
    return [[1, "Test"]]

class UserData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    salary = models.PositiveIntegerField(default=35000)
    age = models.PositiveIntegerField(default=18)
    job = models.CharField(max_length=20, default='Finance')
    checkpoints = models.JSONField(default=checkpoint_default
    fund_preference = models.JSONField(default=fund_preference_default)    # Portfolio, contains a list of lists contatining each fund and % of inverstment budget invested in it
    current_investment = models.JSONField(default=current_investment_default)
    charity_preference = IntegerRangeField(min_value=0, max_value=100, default=10)
    salary_preference = IntegerRangeField(min_value=0, max_value=100, default=20) # fraction invested

    def __str__(self):
        return f'{self.user.username} ({self.pk})'
    
    class Meta:
        ordering = ["user"]
        verbose_name_plural = "User data"

    def get_predicted_salary(self, t=30):
        t = np.arange(max(self.age, 22) -22, max(self.age, 22)+t-22)
        if self.job == "Tech":
            x = (1.722*t**3 - 164.483*t**2 + 5102.335*t + 30544.535)
            x *= (self.salary/30000)
        elif self.job == "Finance":
            x = (-42.170*t**3 + 2003.89*t**2 - 5752.958*t + 66581.237)
            x *= (self.salary/55000)
        else:
            x = 2.044*t**3 - 137.947*t**2 + 3399.435*t + 22896
            x *= (self.salary/24000)
        return x
    
    def projectInvestments(self,t=30): #time to project investment
        static = np.zeros(t)
        value = np.zeros(t)
        time = np.arange(0, t)
        lower = np.zeros(t)
        upper = np.zeros(t)

        for i in self.current_investment: #value increase of your current investment, should effect both static and value
            investment = np.zeros(t)
            investment[0] = i[0]
            # pr1, _ = self.TikToFund[str(i[1])].predict(investment)
            pr1, _ = Fund.objects.get(name=str(i[1])).predict_value(investment)
            value += np.array(pr1["Value"])
            static += np.array(pr1["Value"])
            lower += np.array(pr1["Lower"])
            upper += np.array(pr1["Higher"])

        predicted_salary = self.get_predicted_salary(t)
        for i in self.fund_preference:
            pr1, st = Fund.objects.get(name=str(i[1])).predict_value(predicted_salary*self.salary_preference*i[0]/100)
            value += np.array(pr1["Value"])
            static += np.array(st["Value"])
            lower += np.array(pr1["Lower"])
            upper += np.array(pr1["Higher"])

        return value, time, static, lower, upper
