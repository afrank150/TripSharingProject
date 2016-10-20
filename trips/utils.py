from datetime import datetime


# Creates the photo upload path
def photo_upload_path(instance, filename):
    current_date = datetime.now()
    year = current_date.year
    trip_id = 'trip_%d' % (instance.trip.id)
    return 'photos/%s/%s/%s' % (year, trip_id, filename)
