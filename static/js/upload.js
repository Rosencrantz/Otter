var uploader = (function(dropzoneid) {
    var dropzone = document.getElementById(dropzoneid), bound = false;
    
    function preview(e) {
        var container = document.getElementById("design");
        var img = container.firstElementChild;
        overlayer.getCurrentImage().remove();
        overlayer.loadImage(e.srcElement.result);
        overlayer.clear();
         $(".dragFile").hide();
    }

    dropzone.addEventListener('dragenter', function(e) {
        if (e.preventDefault) {
            e.preventDefault();
          }
          $(".dragFile").show();
          
          
         $("#dragFilesHere").bind("dragenter",function() {
               $(this).css({"background-color": "#ccc"});
         });
         $("#dragFilesHere").bind("dragleave",function() {
             $(this).css({"background-color": ""});
         });
        
  
        if(!bound) {
        bound = true;
         $("#dragFilesHere")[0].addEventListener("drop",function(e) {
                   var xhr = new XMLHttpRequest(),
                      	fileUpload = xhr.upload;
                      if(e.dataTransfer.files.length > 0) {
                          for(var i = 0, ii = e.dataTransfer.files.length; i < ii; i++) {
                              file = e.dataTransfer.files[i];
                              if(file.type.indexOf("image") > -1) {
                                  var reader = new FileReader();
                                  reader.onloadend = function(e) {
                                      xhr.onreadystatechange = function (e) {
                                        if (xhr.readyState == 4) {
                                           if(xhr.status == 200){ 
                                            document.getElementById("page").dataset["revision"] = xhr.responseText;
                                            var li = $("<li />").append("<a href='#' class='version-item'>"+  xhr.responseText +"</a>");
                                            $("#versionHistory").append(li);
                                            }
                                        }
                                      };
                                    
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
                      return false;
         },false);
     }
          
          
         
          
    }, false);
    dropzone.addEventListener('dragover', function(e) {
        if (e.preventDefault) {
            e.preventDefault();
          }
    }, false);
    
 
    
    
});



