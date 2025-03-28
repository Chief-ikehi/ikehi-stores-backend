from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField(blank=True)  # Can add local image support later
    stock = models.PositiveIntegerField()

    def __str__(self):
        return self.name