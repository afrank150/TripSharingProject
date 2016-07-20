from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static

from . import views

urlpatterns = [
    url(r'^new/$', views.new_trip),
    url(r'^edit/(\d+)/$', views.edit_trip),
    url(r'^edit/(\d+)/add_point/$', views.add_point),
    url(r'^edit/\d+/photo_upload/$', views.add_point_data),
    url(r'^(\d+)/$', views.view_trip),
] # + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)