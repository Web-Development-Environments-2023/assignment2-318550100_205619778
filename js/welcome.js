$(document).ready(function(){
    //click on 'Home' in the menu
    $("#home").click(function(){
        showWelcomeScreen();
        stopInterval();

    });
});

//show welcome screen
function showWelcomeScreen() {
    $("#loginScreen").hide();
    $("#registerScreen").hide();
    $("#settingsScreen").hide();
    $("#welcomeScreen").show();
    $("#gameScreen").hide();
    
}

