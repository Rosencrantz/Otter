var uploader = (function(dropzoneid) {

        var center = function(element, callback) {
            var left = ($(window).width() / 2) - (element.width() / 2),
                top = ($(window).height() / 2) - (element.height() / 2);

            element.css({"top": top, "left": left});
            
            if(typeof callback == 'function') {
                callback();
            }
        };

        var renderDialog = function(dialog, veil, className, callback) {
            veil.find('.dialog').hide();

            veil.fadeIn('fast', function() {  
                center(dialog);
                dialog.show();

                if(className && className != '') {
                    dialog.removeClass(['comment', 'explain']).addClass(className);
                }

                if(typeof callback == 'function') {
                    callback();
                }
            });
        };    

    var dropzone = document.getElementById(dropzoneid), bound = false;
    $(".upload").click(function() {
        renderDialog($('#drag-dialog'), $('#dialogs'), '', '');
    });
    
    
    function preview(e) {
        var container = document.getElementById("design");
        var img = container.firstElementChild;
        overlayer.getCurrentImage().remove();
        overlayer.loadImage(e.srcElement.result);
        overlayer.clear();
        $("#dialogs").fadeOut(function() {
             $('#drag-dialog').hide();
        });

        bound = false;
    }

    $('#drag-dialog header').bind('click', function(e) {
        $("#dialogs").fadeOut(function() {
             $('#drag-dialog').hide();
        });        
    });

    $("#dragFilesHere").bind("dragenter",function() {
           //$(this).css({"background-color": "#ccc"});
           $(this).addClass('dragged');
     });

     $("#dragFilesHere").bind("dragleave",function() {
         //$(this).css({"background-color": ""});
         $(this).removeClass('dragged');
     });

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
     
    dropzone.addEventListener('dragenter', function(e) {
        if (e.preventDefault) {
            e.preventDefault();
          }
          
          renderDialog($('#drag-dialog'), $('#dialogs'), '', '');
          
    }, false);
    dropzone.addEventListener('dragover', function(e) {
        if (e.preventDefault) {
            e.preventDefault();
          }
    }, false);
    
 
    
    
});



