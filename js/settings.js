$(document).ready(function(){
    //click on login button in login screen
    $("#loginForm").submit(function (event) {
        let username = $("#usernameL").val();
        let password = $("#passwordL").val();
        if (validateloginCred(username, password)) {
            // updateloggedinUsername(username, password);
            event.preventDefault()
            showSettingsScreen();
        }
        else {
            alert("Invalid user name or password") ? "" : event.preventDefault();   
            }
        });
});

//show settings screen
function showSettingsScreen() {
    $("#loginScreen").hide();
    $("#registerScreen").hide();
    $("#welcomeScreen").hide();
    $("#settingsScreen").show();
    $("#gameScreen").hide();
}