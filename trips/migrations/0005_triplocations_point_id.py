# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0004_auto_20160618_2058'),
    ]

    operations = [
        migrations.AddField(
            model_name='triplocations',
            name='point_id',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]
