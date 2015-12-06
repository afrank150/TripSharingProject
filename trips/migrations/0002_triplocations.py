# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TripLocations',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('geom', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('trip', models.ForeignKey(to='trips.Trip', default=None)),
            ],
        ),
    ]
