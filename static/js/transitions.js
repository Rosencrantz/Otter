(function($) {
   function transition(element, style) {
        element.css(style);
   } 

   $(document).bind('versionHistory', function(e) {
       $('#toggleVersionHistory').toggleClass('on');
       if($('#toggleVersionHistory').hasClass('on')) {
            $('#versionHistory').css({"bottom": -$('#versionHistory').height() + 1});
        } else {
            $('#versionHistory').css({"bottom": 0});
        }
   });
  
   $(document).bind('showTodoList', function(e) {
        $('#tasks-todo').show();
        $('#tasks-done').hide();
        $('#showCompleteList').attr('class', '');
        $('#showTodoList').attr('class', 'active');
   }); 

   $(document).bind('showCompleteList', function(e) {
        $('#tasks-todo').hide();
        $('#tasks-done').show();
        $('#showCompleteList').attr('class', 'active');
        $('#showTodoList').attr('class', '');
   }); 

   $(document).bind('showProjects', function(e) {
        $('#projects').toggle();
   });

   $(document).bind('click', function(e) {
       if($(e.target).attr('type') == 'checkbox') {
           $(e.target).attr({checked:"true", "disabled": "disabled"});
           var item = $(e.target).closest('section').clone();
           item.appendTo("#tasks-done form article");
           $(e.target).closest('section').fadeOut(400, function() {
               $(this).remove();
               Raphael.eve("update-todo-count");
           });
       }

       switch(e.target.id) {
            case 'toggleVersionHistory':
                e.preventDefault();
                $(e.target).trigger('versionHistory');
                break;
            case 'showTodoList':
                e.preventDefault();
                $(e.target).trigger('showTodoList');
                break;
            case 'showCompleteList':
                e.preventDefault();
                $(e.target).trigger('showCompleteList');
                break;
            case 'showProjects':
                e.preventDefault();
                $(e.target).trigger('showProjects');
        }
   });
})(jQuery);
