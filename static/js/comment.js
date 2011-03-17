(function() {
    Raphael.eve.on("overlayer.drawing.stop",function(opts) {
        var commentDialog = document.getElementById("comment-dialog");
        commentDialog.style.display = "block";
    });
})();