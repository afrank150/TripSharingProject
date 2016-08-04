// Leaflet Map
function map_init_basic (map) {
     
    // Initialise the FeatureGroup to store editable layers (no edit funcrionality yet)
    var savedMarkers = new L.featureGroup();

    // get count of features in geojson
    var features = tripData.features;
    var count = features.length;

    if (count > 0) {
    
        // Return saved marker locations and add markers to map
        savedMarkers.addLayer(L.geoJson(tripData))
        savedMarkers.addTo(map);
        var bounds = savedMarkers.getBounds();
        map.fitBounds(bounds);

        savedMarkers.on('click', function (e) {
            var marker = e.layer;
            var markerGeoJson = marker.toGeoJSON();
            var markerId = markerGeoJson.properties.point_id;
            $('#pointId').val(markerId);
            console.log(markerId);

            getPhotoLocations();
        });
    };
}

// Get Photos and Initiate Photoswipe
function getPhotoLocations() {
	$.ajax({
        url: document.getElementById('getPhotos').action, // the endpoint,
        data: { location_id : $('#pointId').val() },

        // handle a successful response
        success: function(respnonseJson) {
        	$('#pointId').val('');
        	console.log(respnonseJson);
        	viewPhotos(respnonseJson);
		},
	});
};

// phtoswipe function
function viewPhotos(json) {
	var photoItems = [];
	var count = json.length;
	if (count === 0) {
		alert("no photos added")
	}
	else {
		for(var i = 0; i < count; i++) {
		    var obj = json[i];
		    photoItems.push({
		    	src: 'https://dev-tripsharephotos.s3-us-west-2.amazonaws.com/'+obj.fields.photo,
		    	w: obj.fields.image_width,
		    	h: obj.fields.image_height,
		    });
	    };

		console.log(photoItems);
		var pswpElement = document.querySelectorAll('.pswp')[0];

		// build items array
		var items = photoItems;

		// define options (if needed)
		var options = {
		    // optionName: 'option value'
		    // for example:
		    index: 0, // start at first slide
		    history: false // removes the GalleryUID from URL
		};

		// Initializes and opens PhotoSwipe
		var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
	};
};
