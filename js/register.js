$(document).ready(function(){
    //click on 'Register' in the menu
    $("#register").click(function(){
        showRegisterScreen();
        stopInterval();
        document.getElementById("gameOverDialog").style.display="none";
    });
    //click on 'Register' button in home screen
    $("#registerBtn").click(function(){
        showRegisterScreen();
    });
    //validate register form
    $("#registerForm").validate({
        focusInvalid: false,
        onkeyup: false,
        onclick: false,
        onfocusout: false,
        rules: {
            username: {
                required: true
            },
            password:{
                required: true,
                alphanumeric: true,
                minlength: 8
            },
            confirmPassword: {
                required: true,
                alphanumeric: true,
                minlength: 8,
                equalTo: "#password"
            },
            firstName: {
                required: true,
                onlyLetters: true
            },
            lastName: {
                required: true,
                onlyLetters: true
            },
            email: {
                required: true,
                validEmail: true
            },
            birthday: {
                required: true,
                datenotgreaterthantoday: true
            },
        },
        messages: {
            username: {
                required: "The username field is required"
            },
            password:{
                required: "The password field is required",
                alphanumeric: "Password must contain letters and numbers",
                minlength: "The password has to be minimum 8 letters long"
            },
            confirmPassword: {
                required: "The password confiramtion field is required",
                alphanumeric: "Password must contain letters and numbers",
                minlength: "The password has to be minimum 8 letters long",
                equalTo: "Passwords don't match"
            },
            firstName: {
                required: "The first name field is required",
                onlyLetters: "First name must contain only letters"
            },
            lastName: {
                required: "The last name field is required",
                onlyLetters: "Last name must contain only letters"
            },
            email: {
                required: "The email field is required",
                validEmail: "Please enter a valid email address"
            },
            birthday: {
                required: "The birthday field is required",
                datenotgreaterthantoday: "You cannot select a date greater than today"
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        // when form is all valid
        submitHandler: function (form) {
            registerUser();
            $('#registerScreen').fadeOut();
            $('#loginScreen').delay(550).show(0);
            resetRegisterForm();
        }
    });
});


//custom methods to the jquery validation plugin
jQuery.validator.addMethod("alphanumeric", function(value, element) {
    return this.optional(element) || /^(([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*)$/i.test(value);
}, "must contain only letters and numbers");

jQuery.validator.addMethod("onlyLetters", function(value, element) {
    return this.optional(element) || /^[a-zA-Z]+$/i.test(value);
}, "must contain only letters");

jQuery.validator.addMethod("validEmail", function(value, element) {
    return this.optional(element) || /^[\w\.]+@([\w]+\.)+[\w]{2,}$/i.test(value);
}, "Please enter a valid email address");

$.validator.addMethod("datenotgreaterthantoday",function(value, element) {
    var currentDate = new Date();
    var selectedDate = new Date(value);
    return (currentDate >= selectedDate);
},"You cannot select a date greater than today");


//show Register screen
function showRegisterScreen() {
    $("#welcomeScreen").hide();
    $("#loginScreen").hide();
    $("#settingsScreen").hide();
    resetRegisterForm();
    $("#registerScreen").show();
    $("#gameScreen").hide();
}

//register the user with form inputs
function registerUser() {
    let username = $("#username").val();
    let password = $("#password").val();
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let email = $("#email").val();
    let birthday = $("#birthday").val();
    addUserToDB(username, password, firstName, lastName, email, birthday);
}

//reset register form
function resetRegisterForm() {
    $("#registerForm")[0].reset();
    $("#registerForm").data("validator").resetForm();
}
