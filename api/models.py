from django.db import models
import random
import numpy as np


class Fund(models.Model):
    name = models.CharField(max_length=5)
    mean = models.DecimalField(max_digits=4, decimal_places=3)
    variance = models.DecimalField(max_digits=4, decimal_places=3)
    dsdt = models.DecimalField(max_digits=4, decimal_places=3)
    dsdtC = models.DecimalField(max_digits=4, decimal_places=3)

    def __str__(self):
        return self.name
    
    def predict_value(self, invest):
        """
        Predict the value of "investment" (a list of the investment every year) after time.
        Time needs to be in the same units as growth.

        Returns:
            - Dict of projected values and times
            - Dict of static values and times
        dsdtDict = {"VASGX": 0.016, "VFIFX": 0.017, "VMIGX": 0.04, "VMMSX": 0.035, "VSCGX": 0.009}
        dsdtCDict = {"VASGX": 0.094, "VFIFX": 0.097, "VMIGX": 0.1, "VMMSX": 0.131, "VSCGX": 0.059}
        """
        time = len(invest)
        value = 0
        static_val = 0

        projection = {}
        static = {}
        value_ls = []
        static_ls = []
        upper = []
        lower = []
        time_ls = []
        
        checkpoint = np.array([     0.,      0.,      0.,      0.,      0.,      0.,      0.,
            0.,      0.,      0., -10000., -10000., -10000., -10000.,
            -10000., -20000., -20000., -20000., -20000., -20000., -20000.,
            -20000., -20000., -20000., -20000., -20000., -20000., -20000.,
            -30000., -30000., -30000., -30000., -10000., -20000., -20000.,
            -20000., -20000.,      0.,      0.,      0.,      0.,      0.,
            0.,      0.,      0.,      0.,      0.,      0.,      0.,
            0.,      0.,      0.,      0.,      0.,      0.,      0.,
            0.,      0.,      0.,      0.])
        
        for i in range(time):
            value += invest[i] + checkpoint[i]
            if value < 0:
                value = 0
            static_val += invest[i] + checkpoint[i]
            time_ls.append(i)
            d_value = value * float(self.mean)
            if d_value > 2000:
                taxable = d_value - 2000
            else:
                taxable = 0
            value *= 1 + float(self.mean)
            value -= taxable * 0.381
            up = value * (1 + (float(self.dsdt)) * i + float(self.dsdtC))
            low = value * (1 - (float(self.dsdt)) * i - float(self.dsdtC))
            value_ls.append(value)
            static_ls.append(static_val)
            upper.append(up)
            lower.append(low)

        projection["Time"] = time_ls
        projection["Value"] = value_ls
        projection["Lower"] = lower
        projection["Higher"] = upper


        static["Time"] = time_ls
        static["Value"] = static_ls

        return projection, static
