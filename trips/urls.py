from django.conf.urls import include, url

from . import views

urlpatterns = [
    url(r'^new/$', views.new_trip),
    url(r'^(\d+)/$', views.view_trip),
    url(r'^(\d+)/add_point/$', views.add_point),

]