$(document).ready(function() {
    
    Raphael.eve.on("update-todo-count",function() {
         $("#showTodoList span").text( $("#tasks-todo form article section").length);
         $("#showCompleteList span").text( $("#tasks-done form article section").length);
    });
    
    
     Raphael.eve("update-todo-count");
    
    $("a.create").click(function(e) {
        e.preventDefault();
        var text = $(this).closest(".group").find(".information").text();
        var version = $(this).closest(".group").find(".annotationId span").text();
        var date = ''+Date();
        var template = $("script[name='todo']")[0].text;
        var todo = {
            text: text,
            version: version,
            date: date
        }
        var a =  $.tmpl( template , todo).appendTo("#tasks-todo form article");
        $('html,body').animate({ scrollTop: $(a).offset().top }, { duration: 'slow', easing: 'swing'});
        Raphael.eve("update-todo-count");
    });
});