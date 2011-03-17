var imageOverlayer = (function() {
    var rects = [], version = 1.0;
	Raphael.eve.on("overlay.loaded.images",function(paper) {
		paper.canvas.onmousedown = function(e) {
            var moved = false,
				x = e.clientX,
				y = e.clientY,
				rect = paper.rect(x - 10,y -100, 1, 1).attr({stroke:"#FF9900","stroke-width":3});

            this.onmousemove = function(e) {
                moved = true;
				var dx = e.clientX - x,
					dy = e.clientY - y;
				if(dx < 0 || dy < 0) {
					rect.attr({x: e.clientX - 10, y: e.clientY - 100, width: Math.abs(dx), height: Math.abs(dy) })
				} else {
					rect.attr({width: dx,height: dy});
				}
				
				
            }
            this.onmouseup = function(e) {
                this.onmousemove = null;
                if(moved) {
					//todo add some things for colour hover etc
                    Raphael.eve("overlayer.drawing.stop",window,{version: version,rect: rect});   
                    rects.push(rect);  
                    version = version + .1;
                    var x = rect.attr("x");
                    var y = rect.attr("y");
                    var width = rect.attr("width");
                    var height = rect.attr("height");
                    
                    var ix =  x + width - 40;
                    var iy = y;
                    
                    rect = paper.rect(ix,iy, 40, 20).attr({"fill": "#FF9900","stroke":"#FF9900"}); 
                }
                pathObj = null;
            }
        };
	});
	return {
	    clear : function() {
	        for(var i = 0, ii = rects.length; i < ii; i++) {
	            rects[i].remove();
	        }
	        rects = [];
	        version = 1.0;
	    }
	}
	
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
		},
		clear : function() {
		    imageOverlayer.clear();
		}
	}
});