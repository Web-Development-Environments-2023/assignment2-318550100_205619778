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
        console.log(starship)
        initGame(Keyshoot,timeSelected,starship);
        startInterval(game);

        });
    
    
});





//show game screen
function showGameScreen() {
    $("#loginScreen").hide();
    $("#registerScreen").hide();
    $("#welcomeScreen").hide();
    $("#settingsScreen").hide();
    $("#gameScreen").show();
    $("#settingsForm")[0].reset();
    
    
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.heigth = 500;
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



}


function game() {
    checkGameOver();
    checkTimeLimit();
    ctx.drawImage(background,0,0,canvas.width,canvas.heigth);
    displayGameOver();
    if(!isGameOver){
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
        draw(ctx);
        console.log(player.x,player.y)

    }  

}

function displayGameOver(){
    if(isGameOver){
        let text = didWin ? "You Win" : "Game Over";
        let textOffset = didWin ? 3.5 : 5;

        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.fillText(text,canvas.width/textOffset,canvas.heigth/2);
    }

}


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
            isGameOver = true;
        }
    }
    if(enemyController.enemyRows.length === 0){
        didWin = true;
        isGameOver =true;
    }
}

function checkTimeLimit(){
	var currentTime = new Date();
	TimeElapsed = (currentTime - startTime) / 1000;
	if (TimeElapsed >= timeLimit){
        isGameOver = true
        

	}

}

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
