from django.forms import ModelForm
from trips.models import Trip, TripLocations


class TripPointLocation(ModelForm):
    class Meta:
        model = TripLocations
        fields = ['geom']
        widgets = {
            'geom': forms.HiddenInput(
                attrs={'id': 'pointGeom'}
            ),
        }