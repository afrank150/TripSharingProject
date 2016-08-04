# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='locationdata',
            name='image_height',
            field=models.IntegerField(default=800),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='locationdata',
            name='image_width',
            field=models.IntegerField(default=1200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='locationdata',
            name='photo',
            field=models.ImageField(height_field='image_height', upload_to='photos/', width_field='image_width'),
        ),
    ]
