from django.forms import ModelForm
from trips.models import TripLocations, LocationData

# Good tutrial for AJAX for submissions
# https://realpython.com/blog/python/django-and-ajax-form-submissions/

class TripLocationsForm(ModelForm):
	class Meta:
		model = TripLocations
		# exclude = ['point_id', ]
		fields = ['geom', 'trip']

class LocationDataForm(ModelForm):
	class Meta:
		model = LocationData
		fields = ['photo', 'photo_caption', 'location']