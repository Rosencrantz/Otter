var imageOverlayer = (function() {
    var comments = {designer: [], general: []}, version = 1.0,container, type, stroke;
    
        

	Raphael.eve.on("overlay.loaded.images",function(paper) {
		paper.canvas.onmousedown = function(e) {
		    type = $("body").attr("data-user-type"),
		    stroke = type == "designer" ?  "#339" : "#FF9900";
            var moved = false,
				x = e.clientX,
				y = e.clientY,
				rect = paper.rect(x - 10,y -100, 1, 1).attr({stroke:stroke,"stroke-width":3});
                container = paper.set();
                container.push(rect);
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
                    $("body").attr("")
                    version = version + .1;
                    var type = "D"; // Designer annotation
					var file_id = $("#design").attr("data-fileid");

                    var x = rect.attr("x");
                    var y = rect.attr("y");
                    var width = rect.attr("width");
                    var height = rect.attr("height");
                    
                    var ix =  x + width - 40;
                    var iy = y;
					var region = {x:x,y:y,width:width,height:height,type:type,file:file_id};

        
                   
                    rect = paper.rect(ix,iy, 40, 20).attr({"fill": stroke,"stroke":stroke}); 
                    text =  paper.text(ix + 23 ,iy + 13,"3.0").attr({stroke: "#FFF", "font-size": "14" });
                    container.push(rect);
                    
              
                    Raphael.eve("overlayer.drawing.stop",window,{version: version,rect: container, region:region, type:type,file:file_id});   
                    comments.general.push(container);
                    container = null;
                    container = paper.set();
                }
                pathObj = null;
            }
        };
	});
	return {
	    add : function() {
	        
	    },
	    clear : function() {
	        for(var i = 0, ii = comments.general.length; i < ii; i++) {
	            comments.general[i].remove();
	        }
            for(var i = 0, ii = comments.designer.length; i < ii; i++) {
    	            comments.designer[i].remove();
            }
	        rects = [];
	        container = null;
	        version = 1.0;
	    },
	    show : function(type) {
	        for(var i = 0, ii = comments[type].length; i < ii; i++) {
	            comments[type][i].show();
	        }
	    },
	    hide : function(type) {
	        for(var i = 0, ii = comments[type].length; i < ii; i++) {
	            comments[type][i].hide();
	        }
	    }
	    
	}
	
})();


var imageOverlays = (function(container) {
	var image, paper, holder, currentImage;
	
	$(".buttons .group button").click(function(e) {
	    var button = $(this);
	    if(button.is('.info')) {
	          if(button.hasClass("on")) {
    	            imageOverlayer.hide("designer");
    	             button.removeClass("on");
    	        } else {
    	            imageOverlayer.show("designer");
    	            button.addClass("on");
    	        }
	    } else {
	        if(button.hasClass("on")) {
	            imageOverlayer.hide("general");
	            button.removeClass("on");
	        } else {
	            imageOverlayer.show("general");
	              button.addClass("on");
	        }
	    }
	});
	
	
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
			currentImage = paper.image(image.src, 0, 0,800,600);
			Raphael.eve('overlay.loaded.images',this,paper);
		},
		getCurrentImage : function(){
		    return currentImage;
		},
		loadOverlays : function(points,options) {
			for(var i = 0, ii = points.length; i < ii; i++) {
				paper.rect(points[i].x, points[i].y, points[i].width,points[i].height);
			}
		},
		toggleOverlays : function(type) {
		    
		},
		clear : function() {
		    imageOverlayer.clear();
		}
	}
});
