from django.conf.urls import include, url
from django.contrib import admin
from trips.views import home_page


urlpatterns = [
    url(r'^$', home_page, name='home_page'),
    url(r'^trips/', include('trips.urls')),

    # url(r'^admin/', admin.site.urls),,
]
