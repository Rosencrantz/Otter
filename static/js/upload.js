var uploader = (function(dropzoneid) {
    var dropzone = document.getElementById(dropzoneid);
    
    function preview(e) {
        var container = document.getElementById("design");
        var img = container.firstElementChild;
        overlayer.loadImage(e.srcElement.result);
        overlayer.clear();
    }

    dropzone.addEventListener('dragenter', function(e) {
        if (e.preventDefault) {
            e.preventDefault();
          }
    }, false);
    dropzone.addEventListener('dragover', function(e) {
        if (e.preventDefault) {
            e.preventDefault();
          }
    }, false);
    dropzone.addEventListener('drop', function(e) {
        var xhr = new XMLHttpRequest(),
        	fileUpload = xhr.upload;
        	
        
        if(e.dataTransfer.files.length > 0) {
            for(var i = 0, ii = e.dataTransfer.files.length; i < ii; i++) {
                file = e.dataTransfer.files[i];
                if(file.type.indexOf("image") > -1) {
                    var reader = new FileReader();
                    reader.onloadend = function(e) {
                        preview(e);
                        xhr.open("POST", "/add/revision");
            		    xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
            		    xhr.setRequestHeader("File-Name", file.name);
            		    xhr.setRequestHeader("revision", document.getElementById("page").dataset["revision"]);
                        xhr.send(e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            }
        }
    }, false);
    
    
});



