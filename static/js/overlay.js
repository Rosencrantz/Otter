var imageOverlayer = (function() {
	Raphael.eve.on("overlay.loaded.images",function(paper) {
		paper.canvas.onmousedown = function(e) {
            var moved = false,
				x = e.clientX,
				y = e.clientY,
				rect = paper.rect(x - 13,y - 13, 1, 1);

            this.onmousemove = function(e) {
                moved = true;
				var dx = e.clientX - x,
					dy = e.clientY - y;
				if(dx < 0 || dy < 0) {
					rect.attr({x: e.clientX - 13, y: e.clientY - 13, width: Math.abs(dx), height: Math.abs(dy) })
				} else {
					rect.attr({width: dx,height: dy});
				}
            }
            this.onmouseup = function(e) {
                this.onmousemove = null;
                if(moved) {
					//todo add some things for colour hover etc
                    Raphael.eve("overlayer.drawing.stop",window,rect);      
                }
                pathObj = null;
            }
        };
	});
	
})();


var imageOverlays = (function(container) {
	var image, paper, holder;
	function getImage(path) {
		var img = new Image();
		img.src = path;
		
		return img;
	};
	function setup() {
		holder = document.getElementById(container);
		paper = Raphael(container, 800, 600); 
	};
	setup();
	return {
		loadImage : function(path) {
			var image = getImage(path);
			paper.image(image.src, 0, 0,800,600);
			Raphael.eve('overlay.loaded.images',this,paper);
		},
		loadOverlays : function(points,options) {
			for(var i = 0, ii = points.length; i < ii; i++) {
				paper.rect(points[i].x, points[i].y, points[i].width,points[i].height);
			}
		}
	}
});