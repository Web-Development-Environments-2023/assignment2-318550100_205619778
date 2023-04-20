$(document).ready(function(){
    //click on start game button in setting screen
    $("#settingsForm").submit(function(event) {
        event.preventDefault();
        showGameScreen();

        });
});

//show game screen
function showGameScreen() {
    $("#loginScreen").hide();
    $("#registerScreen").hide();
    $("#welcomeScreen").hide();
    $("#settingsScreen").hide();
    $("#gameScreen").show();
    
}
