var switchMode = function(mode) {
    if(mode == "d") {
       $('body').attr('data-user-type',"designer"); 
    } else {
       $('body').attr('data-user-type',"general"); 
    }
}


$(document).ready(function() {
    $(".version-item").click(function(e) {
        var val = $(this).text();
        $(this).addClass("on");
        $("#toggleVersionHistory").text(val);
        $("#page").attr({"data-revision": val});
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
