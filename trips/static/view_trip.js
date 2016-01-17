// Leaflet Map
function map_init_basic (map) {
                    
    // Initialise the FeatureGroup to store editable layers (no edit funcrionality yet)
    var savedMarkers = new L.featureGroup();
    
    // Return saved marker locatons and add markers to map
    var count = locationList.length;
    if (count > 0) {

        for(var i = 0; i < count; i++) {
            _location = locationList[i];
            savedMarkers.addLayer(L.geoJson(_location));
        };
        savedMarkers.addTo(map);
        savedMarkers.bindPopup("Pop-Up");

        // Set map scale in relation to marker bounds
        var bounds = savedMarkers.getBounds();
        map.fitBounds(bounds);
    };
}
