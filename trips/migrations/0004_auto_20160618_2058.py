# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0003_locationdata'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='locationdata',
            name='photo_height',
        ),
        migrations.RemoveField(
            model_name='locationdata',
            name='photo_width',
        ),
        migrations.AlterField(
            model_name='locationdata',
            name='photo',
            field=models.ImageField(upload_to=None),
        ),
    ]
