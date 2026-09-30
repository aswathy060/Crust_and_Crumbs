from django.db import models


class CakeBooking(models.Model):
    customer_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    flavour = models.CharField(max_length=50)
    cake_size = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField(default=1)
    booking_date = models.DateField()
    message = models.TextField(blank=True)

    def __str__(self):
        return f"{self.customer_name} - {self.flavour}"


class Cake(models.Model):
    name = models.CharField(max_length=100)
    flavour = models.CharField(max_length=50)
    image = models.ImageField(upload_to='cakes/')

    price_05kg = models.DecimalField(max_digits=8, decimal_places=2)
    price_1kg = models.DecimalField(max_digits=8, decimal_places=2)
    price_15kg = models.DecimalField(max_digits=8, decimal_places=2)
    price_2kg = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name