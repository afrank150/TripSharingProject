// Leaflet Map
function map_init_basic (map) {

    $(".leaflet-container").height($(window).height()-75);

    map.on('resize', function () {
        $(".leaflet-container").height($(window).height()-75);
    });

    // Initialise the FeatureGroup to store editable layers (no edit funcrionality yet)
    var savedMarkers = new L.featureGroup();

    // get count of features in geojson
    var features = tripData.features;
    var count = features.length;

    if (count > 0) {
        savedMarkers.addLayer(L.geoJson(tripData));
        savedMarkers.addTo(map);
        var bounds = savedMarkers.getBounds();
        map.fitBounds(bounds);

        savedMarkers.on('mouseover', function (e) {
        	var locationPopup = '<b>Click trip location<br>to see photos</b>';
        	var popupOptions = {
        		closeButton: false,
        	};
            var marker = e.layer;
            marker.bindPopup(locationPopup, popupOptions).openPopup();
        });

        savedMarkers.on('mouseout', function (e) {
            var marker = e.layer;
            marker.closePopup().unbindPopup();
        });

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
		alert("No photos added to this location")
	}
	else {
		for(var i = 0; i < count; i++) {
		    var obj = json[i];
		    photoItems.push({
		    	src: basePhotoUrl+obj.fields.photo,
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
