$(document).ready(function(){
    //click on 'Login' in the menu
    $("#login").click(function(){
        showloginScreen();
        stopInterval();
        if(document.getElementById('loginC').getElementsByTagName("a")[0].innerText == "Logout"){
            document.getElementById('loginC').getElementsByTagName("a")[0].innerText = "Login"
        }
    });
    //click on 'Login' button in home screen
    $("#loginBtn").click(function(){
        showloginScreen();
    });
});

//show Login screen
function showloginScreen() {
    $("#welcomeScreen").hide();
    $("#registerScreen").hide();
    $("#settingsScreen").hide();
    resetLoginForm();
    $("#loginScreen").show();
    $("#gameScreen").hide();
}

//reset Login form
function resetLoginForm() {
    $('#loginForm')[0].reset();
}