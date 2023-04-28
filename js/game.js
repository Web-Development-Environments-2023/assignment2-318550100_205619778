import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

$(document).ready(function(){
    //click on start game button in setting screen
    $("#settingsForm").submit(function(event) {
        var Keyshoot = document.getElementById("shootKeyPre").value;
        var timeSelected = document.getElementById("timeDuration").value;
        event.preventDefault();
        showGameScreen();
        initGame(Keyshoot,timeSelected,starship);
        scoreTable.splice(0,scoreTable.length)
        startInterval(game);
        });
});



document.getElementById("newGamebtn").addEventListener("click",newGame)

//when click new game clear the interval and create new 
function newGame(){
    stopInterval();
    document.getElementById("gameOverDialog").style.display="none";
    console.log(scoreTable)
    canvas.focus();
    var Keyshoot = document.getElementById("shootKeyPre").value;
    var timeSelected = document.getElementById("timeDuration").value;
    initGame(Keyshoot,timeSelected,starship);
    startInterval(game);
}
//show game screen
function showGameScreen() {
    $("#loginScreen").hide();
    $("#registerScreen").hide();
    $("#welcomeScreen").hide();
    $("#settingsScreen").hide();
    $("#gameScreen").show();
    // $("#settingsForm")[0].reset();
}

const scoreTable = [];

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.heigth = 600;
const background = new Image();
background.src = "images/backgroud2.jpeg";

var playerBulletController;

var enemyBulletController;
var enemyController;

var player;
var isGameOver;
var didWin;

//Timer
var timeLimit
var startTime 
var TimeElapsed
var incrase
var timeToIncrase 
var massage


//save Player Postion at start of the game
var xPlayerPosAtStart
var yPlayerPosAtStart

function initGame(Keyshoot,timeSelected,starship){
    playerBulletController = new BulletController(canvas,10,"images/laser2.png" ,true);
    enemyBulletController = new BulletController(canvas,10, "images/egg.png" ,false);
    enemyController = new EnemyController(canvas,enemyBulletController,playerBulletController);
    player = new Player(canvas,5,playerBulletController,Keyshoot,starship)
    isGameOver = false;
    didWin = false;
    timeLimit = timeSelected;
    startTime = new Date()
    xPlayerPosAtStart = player.x;
    yPlayerPosAtStart = player.y;
    incrase=0
    timeToIncrase=5
}

//Incrase speed every 5 sec (4 times)
function incraseSpeedInGame(){
    if(TimeElapsed >= timeToIncrase && incrase<4){
        incrase+=1
        timeToIncrase+=5
        enemyController.incraseSpeed()  
        }
}

//game running in interval 
function game() {
    checkGameOver();
    checkTimeLimit();
    incraseSpeedInGame();
    ctx.drawImage(background,0,0,canvas.width,canvas.heigth);
    displayGameOver();
    if(!isGameOver){
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
        draw(ctx);
    }  

}

//Display game over
function displayGameOver(){
    if(isGameOver){
        stopInterval()
        clearDiv()
        scoreTable.push(enemyController.score)
        var recordTable = document.getElementById("recordTable")
        var span = document.createElement('span')
        var text1 = document.createTextNode("Your Score: "+enemyController.score)
        span.appendChild(text1)
        var span2 = document.createElement('span')
        var text2 = document.createTextNode(massage)
        span2.setAttribute("id","span-mes")
        span2.appendChild(text2)
        recordTable.appendChild(span)
        recordTable.appendChild(span2)
        drawRecordTable(scoreTable)
        document.getElementById("gameOverDialog").style.display="block";

    }

}

//Clear Previues game score display
function clearDiv()
{
    var div = document.getElementById("recordTable");
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
}

//draw the game over dialog
function drawRecordTable(recTable){
    var sortRec = recTable.sort((a,b)=>b-a);
    var recTable = document.getElementById('recordTable')
    var table = document.createElement('TABLE');
    console.log(table)
    table.border = '0'

    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var text1 = document.createTextNode("Place");
    var text2 = document.createTextNode("Points");
    td1.appendChild(text1);
    td2.appendChild(text2);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
    console.log(sortRec.length)
    for (let i = 0; i < sortRec.length; i++)
    {
            var tr = document.createElement('tr');   
        
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            console.log(i)
            var text1 = document.createTextNode((i+1) + " - ");
            var text2 = document.createTextNode(sortRec[i]);
        
            td1.appendChild(text1);
            td2.appendChild(text2);
            tr.appendChild(td1);
            tr.appendChild(td2);
        
            table.appendChild(tr);
    }

    recTable.appendChild(table);     
}


// function that check if the game over while interval is running and change the massage 
function checkGameOver(){
    if(isGameOver){

      return;  
    }
    if(enemyBulletController.collideWith(player)){
        player.reduceLives();
        player.playerDeathSound.currentTime=0;
        player.playerDeathSound.play();
        player.setPosition(xPlayerPosAtStart,yPlayerPosAtStart)
        if(player.lives==0){
            massage = "You Lost!"
            isGameOver = true;
          
        }
    }
    if(enemyController.enemyRows.length === 0){
        didWin = true;
        massage = "Champion!"
        isGameOver =true;
        
    }
}

//check the time limit and assert game over
function checkTimeLimit(){
	var currentTime = new Date();
	TimeElapsed = (currentTime - startTime) / 1000;
	if (TimeElapsed >= timeLimit){
        if(enemyController.score < 100){
            massage = "You can do better"
        }
        else{
            massage = "Winner!"
        }
        isGameOver = true
        
	}
    }

// draw the score and time while game is running
function draw(ctx){
    var lives = new Image();
    lives.src = "/images/lives.png"
    for(var i=0;i<player.lives;i++){
        ctx.drawImage(lives,10+i*25,375,20,20);
    }

    ctx.font = "20px serif"
    ctx.fillStyle  = "white"
    ctx.fillText("time left: "+(timeLimit - TimeElapsed).toPrecision(3),200,390,100,1)
    ctx.fillText("Score: "+enemyController.score,360,390,100,1)

}
