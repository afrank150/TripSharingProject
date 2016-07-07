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

        // Open the photo upload modal on marker click
        savedMarkers.on('click', function(event){
            openModal();
        });

        // Enable submit button when file is uploaded
        savedMarkers.on('click', function (e) {
            var marker = e.layer;
            var markerGeoJson = marker.toGeoJSON();
            var markerId = markerGeoJson.properties.point_id;
            $('#locationUuId').val(markerId);
            console.log(markerId);
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
        // Create DOM element to POST GeoJSON via AJAX
            var lat = layer.getLatLng().lat;
            var lng = layer.getLatLng().lng;
            pointCords = '{"type": "Point", "coordinates": ['+lng+', '+lat+']}';
            document.getElementById('pointGeom').value = pointCords;        
        }

        // Create feature group and GeoJSON Representation for new layers
        var newSavedMarkers = new L.featureGroup();
        var markerGeoJson = layer.toGeoJSON();

        // Create event for Marker being added to feature group
        newSavedMarkers.on('layeradd', function(event){
            create_post();
        });
        
        // Add marker to map
        newSavedMarkers.addLayer(L.geoJson(markerGeoJson));
        newSavedMarkers.addTo(map);

        // AJAX Marker Post
        function create_post() {
            $.ajax({
                url : document.getElementById('savepoint').action, // the endpoint
                type : "POST", // http method
                data : { the_location : $('#pointGeom').val() }, // data sent with the post request

                // handle a successful response
                success : function(json) {
                    $('#pointGeom').val(''); // remove the value from the input
                    var newMarkerId = json.features[0].properties.point_id
                    updateLayerId(newMarkerId); // add ID to GeoJSON layer
                },
            });
        };

        // function to add the server created ID to GeoJSON layer
        function updateLayerId(_id) {
            markerGeoJson.properties.point_id = _id;
        };

        // Open the photo upload modal on marker click
        newSavedMarkers.on('click', function(event){
            openModal();
        });

        // Update Form with marker ID that was clicked
        newSavedMarkers.on('click', function (e) {
            var marker = e.layer;
            var markerGeoJson = marker.toGeoJSON();
            var markerId = markerGeoJson.properties.point_id;
            console.log(markerId);
            $('#locationUuId').val(markerId);
        });

    });
}

// Modal for creating photo post
function openModal() {
    $('#pointDataModal').modal('show')
    $("#submit-all").prop('disabled', true)
};

// Dropzone
Dropzone.options.locationDropzone = {
    // name the submitted photo
    paramName : "photo",
    // Prevents Dropzone from uploading dropped files immediately
    autoProcessQueue : false,
    acceptedFiles : "image/jpeg,image/tiff,image/png",
    addRemoveLinks : true,
    thumbnailWidth : 80,
    thumbnailHeight : 80,

    init : function() {
        var submitButton = document.querySelector("#submit-all")
        locationDropzone = this;
        submitButton.addEventListener("click", function() {
            // Tell Dropzone to process all queued files.
            locationDropzone.processQueue();
        });

        this.on("addedfile", function() {
            // Remove large marks
            $(".dz-success-mark").remove()
            $(".dz-error-mark").remove()
            // Enable submit button when file is uploaded
            $("#submit-all").prop('disabled', false);
            // Remove upload instructions text
            $("#uploadInstructions").text('');
        });

        this.on("processing", function() {
            locationDropzone.options.autoProcessQueue = true;
        });

        // Remove thubnails after upload completes and disable submit button
        this.on("complete", function(file) {
          locationDropzone.removeFile(file);
          $("#submit-all").prop('disabled', true);
        });

        this.on("reset", function() {
            // add back the upload instrcutions text after all files are removed
            $("#uploadInstructions").text('Drop files or click here to upload');
        });
    }
};
