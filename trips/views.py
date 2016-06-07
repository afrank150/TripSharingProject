## Views for Trips App

import json
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers

from trips.models import Trip, TripLocations



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
        response_data = {}
        
        location = TripLocations(geom=point_coordinates, trip=this_trip)
        location.save()
        
        response_data['result'] = 'Create trip location successful!'
        
        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )

def view_trip(request, trip_id):
    this_trip = Trip.objects.get(id=trip_id)
    this_trip_name = this_trip.trip_name
    this_trip_locations = TripLocations.objects.filter(trip=this_trip)
    this_trip_data = serializers.serialize("geojson", this_trip_locations)

    return render(request, 'view_trip.html', {'trip_name': this_trip_name, 
        'trip_data': this_trip_data}
    )