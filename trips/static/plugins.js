// To add point locations (GeoJSON) in list to feature group
(function($) {
    $.fn.extend({
        addLocationsToFeatureGroup: function(_featureGroup) {
            var count = this.length;
            if (count > 0) {

                for(var i = 0; i < count; i++) {
                    _location = this[i];
                    _featureGroup.addLayer(L.geoJson(_location));
                };
            };
        }
    });
})(jQuery);


// To get and zoom to bounds of point locations in a feature group
/*(function($) {
    $.fn.extend({
        zoomToLocations: function() {
            var bounds = this.getBounds();
            map.fitBounds(bounds);
        }
    });
})(jQuery);*/