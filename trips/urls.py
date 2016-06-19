from django.conf.urls import include, url

from . import views

urlpatterns = [
    url(r'^new/$', views.new_trip),
    url(r'^edit/(\d+)/$', views.edit_trip),
    url(r'^edit/(\d+)/add_point/$', views.add_point),
    url(r'^edit/(\d+)/locationupload/$', views.add_point_data),
    url(r'^(\d+)/$', views.view_trip),

]