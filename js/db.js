/////let loggedUsername = null
let dbUsers = [{uname: "p",pass: "testuser",fname: "test",lname: "test",email: "test@test.com",birthday: "01/01/2000"}];

//add new user to dbUsers
function addUserToDB(username, password, firstName, lastName, email, birthday){
    let user = {uname: username, pass: password, fname: firstName,
                lname: lastName, email: email, birthday: birthday};
    dbUsers.push(user);
}

//validate login credentials
function validateloginCred(username, password) {
    for (let i = 0; i < dbUsers.length; i++) {
        if (dbUsers[i].uname === username && dbUsers[i].pass === password) {
            return true;
        }
    }
    return false;
}

// function updateloggedinUsername(username, password) {
//     let user = dbUsers.find(user => user.username === username && user.pass === password);
//     logegdUsername = user.fname;
// }
