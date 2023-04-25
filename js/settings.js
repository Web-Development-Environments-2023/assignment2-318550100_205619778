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

var chosed = false;
var curr;
var starship=6;

//show settings screen
function showSettingsScreen() {
    $("#loginScreen").hide();
    $("#registerScreen").hide();
    $("#welcomeScreen").hide();
    $("#settingsForm")[0].reset();
    $("#settingsScreen").show();
    $("#gameScreen").hide();
}


function shootKey(event){
    let Keyshoot = document.getElementById("shootKeyPre");
    if(event.which >= 65 && event.which <= 90 || event.which == 32){
        Keyshoot.value = event.code
        if(event.which ===32){
            Keyshoot.value = "Space"
        }
    }
    else{
        Keyshoot.value = "Space"
    }   
}

function choosePlayer(el){
    if(!chosed){
        el.style.border="1px solid blue";
        chosed = true;
        curr = el;
        starship = curr.alt;
    }
    else{
        curr.style.border="0px solid blue";
        el.style.border="3px solid blue";
        curr = el;
        starship=curr.alt
    }


}