// Handling the CSRF Token
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

// Leaflet Map
function map_init_basic (map, options) {

    // Initialise the FeatureGroup to store editable layers (no edit funcrionality yet)
    var savedMarkers = new L.featureGroup();

    var features = tripData.features;
    var count = features.length;

    if (count > 0) {
    
        // Return saved marker locations and add markers to map
        console.log(L.geoJson(tripData));
        savedMarkers.addLayer(L.geoJson(tripData));
        savedMarkers.addTo(map);
        var bounds = savedMarkers.getBounds();
        map.fitBounds(bounds);

        savedMarkers.on('click', function (e) {
            var marker = e.layer;
            var markerId = marker.toGeoJSON();
            console.log(markerId);
        });

        savedMarkers.on('click', function(event){
            openModal();
        });
    };


    // draw options config
    var options = {
        position: 'topleft',
        draw: {
            polygon: false,
            polyline: false,
            circle: false,
            rectangle: false,
        },
        edit: false
    };

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);
    map.on('draw:created', function (e) {
        var type = e.layerType,
        layer = e.layer;
        

        if (type === 'marker') {
        // Do marker specific actions
            var lat = layer.getLatLng().lat;
            var lng = layer.getLatLng().lng;
            var pointCords = '{"type": "Point", "coordinates": ['+lng+', '+lat+']}';
            document.getElementById('pointGeom').value = pointCords;
            
        }
        
        // Create event for Marker being added
        layer.on('add', function(event){
            create_post();
        });
        
        // Add marker to map
        map.addLayer(layer);
        layer.on('click', function(event){
            openModal();
        });
    });
}

// AJAX for posting
function create_post() {
    $.ajax({
        url : document.getElementById('savepoint').action, // the endpoint
        type : "POST", // http method
        data : { the_location : $('#pointGeom').val() }, // data sent with the post request

        // handle a successful response
        success : function(json) {
            $('#pointGeom').val(''); // remove the value from the input
            console.log(json); // log the returned json to the console
        },
    });
};

// Modal for creating photo post
function openModal() {
    $('#pointDataModal').modal('show')
};




