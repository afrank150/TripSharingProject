from django.forms import ModelForm
from trips.models import LocationData

# Good tutrial for AJAX for submissions
# https://realpython.com/blog/python/django-and-ajax-form-submissions/

class LocationDataForm(ModelForm):
	class Meta:
		model = LocationData
		fields = ['photo', 'photo_caption', 'location']