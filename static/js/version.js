var switchMode = function(mode) {
    if(mode == "d") {
        
    } else {
        
    }
}


$(document).ready(function() {
    $(".version-item").click(function(e) {
        var val = $(this).text();
        $(this).addClass("on");
        $("#toggleVersionHistory").text(val);
        $("#page").attr({"data-revision": val});
        e.preventDefault();
        var fileid;
        $.ajax({
          url: "/get/files/" + val,
          datatype: "json",
          success: function(data) {
              overlayer.getCurrentImage().remove();
              var something = JSON.parse(data);
              overlayer.loadImage(something[0].fields.filedata);
              $("#design").attr({"data-fileid":something[0].pk})
              fileid = something[0].pk;
              $.ajax({
                  url: "/get/regions/" + fileid,
                      success: function(data) {
                          if(data) {
                              Raphael.eve("render-regions",window,data);
                          }
                      }
               });
               $.ajax({
                     url: "/get/comments/" + fileid,
                         success: function(data) {
                             if(data) {
                                 Raphael.eve("render-comments",window,data);
                             }
                         }
               });
              //load comments
              //load overlays
          },
        });
        
     
        
        
    });
});