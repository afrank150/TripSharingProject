# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import uuid
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='LocationData',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('photo', models.ImageField(upload_to='uploads/%Y/%m/%d/')),
                ('photo_caption', models.TextField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='Trip',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('trip_name', models.TextField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='TripLocations',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('point_id', models.UUIDField(default=uuid.uuid4, unique=True, editable=False)),
                ('geom', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('trip', models.ForeignKey(default=None, to='trips.Trip')),
            ],
        ),
        migrations.AddField(
            model_name='locationdata',
            name='location',
            field=models.ForeignKey(default=None, to='trips.TripLocations', to_field='point_id'),
        ),
    ]
