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
        var submitButton = document.querySelector("#submit-all");
        locationDropzone = this;
        submitButton.addEventListener("click", function() {
            // Tell Dropzone to process all queued files.
            locationDropzone.processQueue();
        });

        this.on("addedfile", function() {
            // Remove large marks
            $(".dz-success-mark").remove();
            $(".dz-error-mark").remove();
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

        this.on("success", function(file, responseText) {

        });

        this.on("reset", function() {
            // add back the upload instrcutions text after all files are removed
            $("#uploadInstructions").text('Drop files or click here to upload');
            $("#submit-all").prop('disabled', true);
            locationDropzone.options.autoProcessQueue = false;
        });
    }
};
