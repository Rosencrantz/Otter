(function() {
   
		var addComment = function(comment) {
				
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
        var commentDialog = $("#comment-dialog");
        commentDialog.show();

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
        
<<<<<<< HEAD
				$("#comment-cancel").one(function() {
						opts.rect.remove();
				});
=======
        
    });
    
    $("#comment-cancel").click(function() {
      container && container.remove();
>>>>>>> d9e4344be9699199d3a7b5c89e79b4c5cc21cf32
    });
    
		$(document).ready(function() {
       $(".reply").click(function(e) {
            e.preventDefault();
            var commentDialog = document.getElementById("comment-dialog");
            commentDialog.style.display = "block";
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
