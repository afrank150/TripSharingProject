## Views for Trips App

import json
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.serializers import serialize

from trips.models import Trip, TripLocations



def home_page(request):
    latest_trip_list = Trip.objects.order_by('-id')[:10]

    keys = []
    values = []
    for row in latest_trip_list:
        keys.append(row.id)
        values.append(row.trip_name)

    latest_trip_dict = dict(zip(keys, values))

    return render(request, 'home.html', {'latest_trip_dict': latest_trip_dict})
    
def new_trip(request):
    trip = Trip.objects.create(trip_name=request.POST['trip_name_text'])
    return redirect('/trips/edit/%d/' % (trip.id))
    
def edit_trip(request, trip_id):
    this_trip = Trip.objects.get(id=trip_id)
    this_trip_name = this_trip.trip_name
    this_trip_locations = TripLocations.objects.filter(trip=this_trip)
    
    location_list = []
    for location in this_trip_locations:
        geom = location.geom
        geojson_object = json.loads(geom.geojson)
        location_list.append(geojson_object)

    return render(request, 'edit_trip.html', {'trip_name': this_trip_name, 
        'location_list': location_list}
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
    
    location_list = []
    for location in this_trip_locations:
        geom = location.geom
        geojson_object = json.loads(geom.geojson)
        location_list.append(geojson_object)

    return render(request, 'view_trip.html', {'trip_name': this_trip_name, 
        'location_list': location_list}
    )