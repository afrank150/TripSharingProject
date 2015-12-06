## Unit Tests for the Trips App Views

from django.test import TestCase
from django.core.urlresolvers import resolve
from django.http import HttpRequest
from django.template.loader import render_to_string

from trips.views import home_page, view_trip
from trips.models import Trip


class HomePageTest(TestCase):
    
    def test_root_url_resloves_to_home_page_view(self):
        found = resolve('/')
        self.assertEqual(found.func, home_page)
        
    def test_home_page_returns_correct_html(self):
        request = HttpRequest()
        response = home_page(request)
        expected_html = render_to_string('home.html')
        self.assertEqual(response.content.decode(), expected_html)
     
    def test_new_trip_creation(self):
        Trip.objects.create(trip_name='Colorado Visit')
        
        self.assertEqual(Trip.objects.count(), 1)
        new_trip = Trip.objects.first()
        self.assertEqual(new_trip.trip_name, 'Colorado Visit')
        
    def test_redirects_after_POST_for_new_trip(self):  ## to do!!
        response = Trip.objects.create(trip_name='Colorado Visit')
        
        new_trip = Trip.objects.first()

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response['location'], '/trips/%d' % (new_trip.id))
    