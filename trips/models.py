import uuid
from django.contrib.gis.db import models


class Trip(models.Model):
    trip_name = models.TextField(default='')
    
class TripLocations(models.Model):
    point_id = models.UUIDField(unique=True, primary_key=False, default=uuid.uuid4, editable=False)
    geom = models.PointField(srid=4326)
    trip = models.ForeignKey(Trip, default=None)

class LocationData(models.Model):
	photo = models.ImageField(upload_to='uploads/%Y/%m/%d/', height_field=None, width_field=None, max_length=100)
	photo_caption = models.TextField(default='')
	location = models.ForeignKey(TripLocations, to_field='point_id', default=None)
