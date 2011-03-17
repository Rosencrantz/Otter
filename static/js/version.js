$(document).ready(function() {
    $(".version-item").click(function(e) {
        var val = $(this).text();
        $(this).addClass("on");
        $("#toolbar").find("a span").text(val);
        e.preventDefault();
        
        $.ajax({
          url: "/get/files/" + val,
          datatype: "json",
          success: function(data) {
              overlayer.getCurrentImage().remove();
              var something = JSON.parse(data);
              overlayer.loadImage(something[0].fields.filedata);
              $("#design").attr({"data-fileid":something[0].pk})
              //load comments
              //load overlays
          },
        });
        
        
    });
});