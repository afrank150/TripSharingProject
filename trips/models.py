import uuid
from PIL import Image
from django.contrib.gis.db import models


class Trip(models.Model):
    trip_name = models.TextField(default='')
    
class TripLocations(models.Model):
    point_id = models.UUIDField(unique=True, primary_key=False, default=uuid.uuid4, editable=False)
    geom = models.PointField(srid=4326)
    trip = models.ForeignKey(Trip, default=None)

class LocationData(models.Model):
    photo = models.ImageField(upload_to='photos/', height_field='image_height', width_field='image_width', max_length=100)
    image_width = models.IntegerField()
    image_height = models.IntegerField()
    photo_caption = models.TextField(default='')
    location = models.ForeignKey(TripLocations, to_field='point_id', default=None)
