(function() {
    Raphael.eve.on("overlayer.drawing.stop",function(opts) {
        var commentDialog = document.getElementById("comment-dialog");
        commentDialog.style.display = "block";
        var button = document.getElementById("comment-submit");
        button.onsubmit = function(e) {
            e.preventDefault();
            var template =$("script[name='comment']")[0].text;
            var comment = {
                "name": "something",
                "version": "1.1",
                "text" : document.getElementById("comment").value
            }
            $.tmpl( template , comment).appendTo("#annotation1")    
            
            return false;
        }    
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
                insertAfter.after(a);
            }
       });
    }); 
    
})();