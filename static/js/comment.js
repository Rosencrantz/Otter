(function() {
    
    
    
    
    
        Raphael.eve.on("render-comments",function(data) {
           $("#annotation1").text(''); 
           var max_version = 1;
           var versions = [];
           for (var i = data.length - 1; i >= 0; i--){
     
             var comment ={
               name : data[i].displayname,
               text : data[i].comment,
               version : data[i].version
            }
            versions.push(data[i].version);
            
            	var template =$("script[name='comment']")[0].text;
                var item = $.tmpl( template , comment).appendTo("#annotation1");
           
           
           }
           
           for (var i=0; i < versions.length; i++) {
               var myversion =  versions[i].split(".")[1];
               if(myversion > max_version) {
                   max_version = myversion;
               }
               
           }
           max_version++;
           Raphael.eve("new-version",window,max_version);
           
        });

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

				var unrender = function(veil) {
						veil.fadeOut('fast', function() {});
				}

		var addComment = function(comment) {
				$.ajax({
						url : '/add/comments',
						dataType : 'json',
						contentType : 'application/json',
						type : 'post',
						data : JSON.stringify(comment),
						success : function() {
						  Raphael.eve("comment.added", this, {comment:comment});
						}
				});
		}
		
		Raphael.eve.on("comment.added", function(opts) {
			var template =$("script[name='comment']")[0].text;
                        var item = $.tmpl( template , opts.comment.addcomment.comment).appendTo("#annotation1")    
						var commentDialog = $("#comment-dialog");
                        commentDialog.removeClass("loading");
                        commentDialog.addClass("success");
                       
                        

                        $("#dialogs").fadeOut('fast', function() {
                                commentDialog.find("#comment").val("");
                                commentDialog.removeClass("success");
                                $('html,body').animate({ scrollTop: $(item).offset().top }, { duration: 'slow', easing: 'swing'});
                        });

                });


		Raphael.eve.on("overlayer.drawing.stop",function(opts) {
            renderDialog($('#comment-dialog'), $('#dialogs'), '');
				
			// Form
			$("#comment-submit").one('click', function(e) {
                e.preventDefault();		
				
								var commentDialog = $("#comment-dialog");
								commentDialog.addClass("loading");
            		
                var region = {
                    "x" : opts.region.x,
                    "y" : opts.region.y,
                    "width" : opts.region.width,
                    "height" : opts.region.height,
                    "file" : opts.region.file,
                    "title" : opts.version,
                    "type" : opts.region.type
                };

				var comment = {
                    "version" : opts.version,
                    "name": $("#display-name").text(),
                    "text" : commentDialog.find("#comment").val()
                };

                var addcomment = {"addcomment": {"region":region, "comment":comment}};
                addComment(addcomment);
                
                
            return false;
        });    
/*        	Raphael.eve.on("comment.added", function() {
						$.tmpl( template , comment).appendTo("#annotation1")    
						var commentDialog = $("#comment-dialog");
						commentDialog.removeClass("loading");
						commentDialog.addClass("success");


						$("#dialogs").fadeOut(fast, function() {
								$(commentDialog).find("#comment").val("");
								$(commentDialog).removeClass("success");
						});
			});*/
        
				$("#comment-cancel").one('click',function(e) {
						opts.rect.remove();
						  $("#dialogs").fadeOut('fast', function() {
                                    commentDialog.find("#comment").val("");   
                            });
						e.preventDefault();
				});
        
    });
    
	$(document).ready(function() {
        $(".reply").live("click",function(e) {
            e.preventDefault();
            renderDialog($('#comment-dialog'), $('#dialogs'), 'comment');
						var commentDialog = $("#comment-dialog");

            var button = document.getElementById("comment-submit");
            var insertAfter = $(this).closest(".explain");
						var insertAA = $(this).parents('.explain');

						var cversion = insertAfter.find(".annotationId").attr('data-version-id');
						cversion += ".1";


            $(button).one('click', function(e) {
                e.preventDefault();
          var bbb = insertAfter; 
					var ccc = insertAA;
                var template =$("script[name='comment']")[0].text;
                var comment = {
                    "name": $("#display-name").text(),
                    "version": cversion,
                    "text" : document.getElementById("comment").value
                }

                var a =  $.tmpl( template , comment);
                //commentDialog.hide();
						  $("#dialogs").fadeOut('fast', function() {
                                    commentDialog.find("#comment").val("");   
                            });

//document.getElementById("comment").value = "";
                insertAfter.after(a);
            });
       });
    }); 
    
})();
