from django.contrib.gis.db import models


class Trip(models.Model):
    trip_name = models.TextField(default='')
    
class TripLocations(models.Model): 
    geom = models.PointField(srid=4326)
    trip = models.ForeignKey(Trip, default=None)
