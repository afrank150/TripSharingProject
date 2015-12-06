from django.conf.urls import include, url
from django.contrib import admin


urlpatterns = [
    url(r'^$', 'trips.views.home_page', name='home'),
    url(r'^trips/', include('trips.urls')),

    # url(r'^admin/', include(admin.site.urls)),
]
