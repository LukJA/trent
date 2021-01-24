from django.db import models
import random


class Fund(models.Model):
    name = models.CharField(max_length=5)
    mean = models.DecimalField(max_digits=4, decimal_places=3)
    variance = models.DecimalField(max_digits=4, decimal_places=3)

    def __str__(self):
        return self.name
    
    def predict_value(self, invest):
        """
        Predict the value of "investment" (a list of the investment every year) after time.
        Time needs to be in the same units as growth.

        Returns:
            - Dict of projected values and times
            - Dict of static values and times
        """
        time = len(invest)
        value = 0
        static_val = 0

        projection = {}
        static = {}
        value_ls = []
        time_ls = []
        static_ls = []

        for i in range(time):
            value += invest[i]
            static_val += invest[i]
            time_ls.append(i)
            value *= random.gauss(float(self.mean) + 1, float(self.variance)**0.5)
            value_ls.append(value)
            static_ls.append(static_val)

        projection["Time"] = time_ls
        projection["Value"] = value_ls

        static["Time"] = time_ls
        static["Value"] = static_ls

        return projection, static

