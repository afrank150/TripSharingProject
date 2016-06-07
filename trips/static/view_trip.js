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
        savedMarkers.on('click', function(event){
            viewPhotos();
        });
    };
}

// phtoswipe function
function viewPhotos() {
	var pswpElement = document.querySelectorAll('.pswp')[0];

	// build items array
	var items = [
	    {
	        src: 'https://upload.wikimedia.org/wikipedia/en/7/76/6_bonobos_WHCalvin_IMG_1341.JPG',
	        w: 876,
	        h: 700
	    },
	    {
	        src: 'https://upload.wikimedia.org/wikipedia/en/7/76/6_bonobos_WHCalvin_IMG_1341.JPG',
	        w: 876,
	        h: 700
	    }
	];

	// define options (if needed)
	var options = {
	    // optionName: 'option value'
	    // for example:
	    index: 0 // start at first slide
	};

	// Initializes and opens PhotoSwipe
	var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
	gallery.init();
}
