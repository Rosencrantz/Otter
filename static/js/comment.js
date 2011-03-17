(function() {
   
        var center = function(element, callback) {
            var left = ($(window).width() / 2) - (element.width() / 2),
                top = ($(window).height() / 2) - (element.height() / 2);

            element.css({"top": top, "left": left});
            
            if(typeof callback == 'function') {
                callback();
            }
        };

        var renderDialog = function(dialog, veil, className, callback) {
            //veil.in('.dialog').hide();

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

		var addComment = function(comment) {
				Raphael.eve("comment.added");
				$.ajax({
						url : '/add/comments',
						dataType : 'json',
						contentType : 'application/json',
						type : 'post',
						data : JSON.stringify(comment),
						success : function() {
						  Raphael.eve("comment.added");
						}
				});
		}

		Raphael.eve.on("overlayer.drawing.stop",function(opts) {
            renderDialog($('#comment-dialog'), $('#dialogs'), '');
			var template =$("script[name='comment']")[0].text;
				
			// Form
			$("#comment-submit").one('click', function(e) {
                e.preventDefault();		
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
                    "name": "danj@otter.com",
                    "text" : commentDialog.find("#comment").val()
                };

                var addcomment = {"addcomment": {"region":region, "comment":comment}};
                addComment(addcomment);
                
                Raphael.eve.on("comment.added", function() {
                        $.tmpl( template , comment).appendTo("#annotation1")    
                        commentDialog.removeClass("loading");
                        commentDialog.addClass("success");

                        commentDialog.fadeOut(200, function() {
                                $(this).find("#comment").val("");
                                $(this).removeClass("success");
                        });
                });

            return false;
        });    
        	Raphael.eve.on("comment.added", function() {
					$.tmpl( template , comment).appendTo("#annotation1")    
					commentDialog.removeClass("loading");
					commentDialog.addClass("success");


					commentDialog.fadeOut(200, function() {
							$(this).find("#comment").val("");
							$(this).removeClass("success");
					});
			});
        
				$("#comment-cancel").one(function() {
						opts.rect.remove();
				});
        
    });
    
	$(document).ready(function() {
        $(".reply").click(function(e) {
            e.preventDefault();
            renderDialog($('#comment-dialog'), $('#dialogs'), 'comment');

            var button = document.getElementById("comment-submit");
            var insertAfter = $(this).closest(".comment");

            button.onsubmit = function(e) {
                e.preventDefault();
           
                var template =$("script[name='comment']")[0].text;
                var comment = {
                    "name": "something",
                    "version": "1.1",
                    "text" : document.getElementById("comment").value
                }

                var a =  $.tmpl( template , comment);
                commentDialog.style.display = "none";
                document.getElementById("comment").value = ""
                insertAfter.after(a);
            }
       });
    }); 
    
})();
