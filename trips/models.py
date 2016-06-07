from django.contrib.gis.db import models


class Trip(models.Model):
    trip_name = models.TextField(default='')
    
class TripLocations(models.Model): 
    geom = models.PointField(srid=4326)
    trip = models.ForeignKey(Trip, default=None)

class LocationData(models.Model):
	photo = models.URLField(max_length=1000, default='')
	photo_width = models.PositiveIntegerField()
	photo_height = models.PositiveIntegerField()
	photo_caption = models.TextField(default='')
	location = models.ForeignKey(TripLocations, default=None)
