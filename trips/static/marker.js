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
                    
    // Initialise the FeatureGroup to store editable layers
    var markerItems = new L.FeatureGroup();
    map.addLayer(markerItems);
    
    // Return saved marker locatons and add markers to map
    var count = locationList.length;
    for(var i = 0; i < count; i++) {
        _location = locationList[i];
        console.log(_location);
        L.geoJson(_location).addTo(map);
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
            var pointCords = "POINT(" + lng + " " + lat + ")";
            document.getElementById('pointGeom').value = pointCords;
            layer.bindPopup("Pop-Up");
            
        }
        
        // Create event for Marker being added
        layer.on('add', function(event){
            create_post();
        });
        
        // Add marker to map
        map.addLayer(layer);
    });
}

// AJAX for posting
function create_post() {
    console.log("create post is working!") // sanity check
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