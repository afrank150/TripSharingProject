# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0002_triplocations'),
    ]

    operations = [
        migrations.CreateModel(
            name='LocationData',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('photo', models.URLField(max_length=1000, default='')),
                ('photo_width', models.PositiveIntegerField()),
                ('photo_height', models.PositiveIntegerField()),
                ('photo_caption', models.TextField(default='')),
                ('location', models.ForeignKey(to='trips.TripLocations', default=None)),
            ],
        ),
    ]
