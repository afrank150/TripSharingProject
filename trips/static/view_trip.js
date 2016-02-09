// Leaflet Map
function map_init_basic (map) {
                    
    // Initialise the FeatureGroup to store editable layers (no edit funcrionality yet)
    var savedMarkers = new L.featureGroup();

    $(locationList).addLocationsToFeatureGroup(savedMarkers);
    savedMarkers.addTo(map);
    savedMarkers.bindPopup("Pop-Up");
    var bounds = savedMarkers.getBounds();
    map.fitBounds(bounds);
}
