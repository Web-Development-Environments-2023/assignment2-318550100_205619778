//About modal dialog js

$(document).ready(function(){
    //click on 'About'
    $('#about').click(function(){
        $("#aboutModalDialog").show();

    });
    //click on 'X' button in the modal dialog
    $(".closeAboutModalDialog").click(function(){
        $("#aboutModalDialog").hide();
    })
});

//ESC key pressed & released
document.addEventListener('keyup', function(event) {
    if (event.key === 'Escape')   { 
        $("#aboutModalDialog").hide();  
    }
  })

  //click with mouse outside of the modal dialog
$(document).mouseup(function(event) {
    var dialog = $("#aboutModalDialog");
    var target = $(event.target);
    if (!target.is(dialog) && !dialog.has(target).length) {
        dialog.hide();
    }
});