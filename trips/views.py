## Views for Trips App

import json
import uuid
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.core import serializers
from django.template import RequestContext
from django.core.urlresolvers import reverse
from django.conf import settings

from trips.models import Trip, TripLocations, LocationData
from trips.forms import TripLocationsForm, LocationDataForm



def home_page(request):
    latest_trip_list = Trip.objects.order_by('-id')[:10]
    return render(request, 'home.html', {'latest_trip_list': latest_trip_list})
    
def new_trip(request):
    trip = Trip.objects.create(trip_name=request.POST['trip_name_text'])
    return redirect('/trips/edit/%d/' % (trip.id))
    
def edit_trip(request, trip_id):
    this_trip = Trip.objects.get(id=trip_id)
    this_trip_name = this_trip.trip_name
    this_trip_locations = TripLocations.objects.filter(trip=this_trip)
    this_trip_data = serializers.serialize("geojson", this_trip_locations)

    return render(request, 'edit_trip.html', {'trip_name': this_trip_name, 
        'trip_data': this_trip_data}
    )
    
def add_point(request, trip_id):
    if request.method == 'POST':
        this_trip = Trip.objects.get(id=trip_id)
        point_coordinates = request.POST.get('the_location')
        
        location = TripLocations(geom=point_coordinates, trip=this_trip)
        location.save()

        this_location = TripLocations.objects.filter(id=location.pk)
        this_location_data = serializers.serialize("geojson", this_location)

        return HttpResponse(this_location_data, content_type="application/json")

def add_point_data(request):
    if request.method == 'POST':
        form = LocationDataForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponse('Image upload succeeded.')
    else:
        form = LocationDataForm()

    return render(request, 'form.html', {'form': form})

def view_trip(request, trip_id):
    this_trip = Trip.objects.get(id=trip_id)
    this_trip_name = this_trip.trip_name
    this_trip_locations = TripLocations.objects.filter(trip=this_trip)
    this_trip_data = serializers.serialize("geojson", this_trip_locations)
    s3_url = settings.S3_URL

    return render(request, 'view_trip.html', {'trip_name': this_trip_name, 
        'trip_data': this_trip_data, 's3_url': s3_url}
    )

def get_point_data(request, trip_id):
    this_trip = Trip.objects.get(id=trip_id)
    this_trip_locations = TripLocations.objects.filter(trip=this_trip)
    this_trip_locations_ids = []
    for trip_location in this_trip_locations:
        this_trip_locations_ids.append(str(trip_location.point_id))

    if request.method == 'GET':
        location_id = request.GET['location_id']

        if location_id in this_trip_locations_ids:
            this_trip_location_data = LocationData.objects.filter(location=location_id)
            response = serializers.serialize("json", this_trip_location_data)

            return HttpResponse(response, content_type="application/json")

        else:
            pass # need to return a 404 here   