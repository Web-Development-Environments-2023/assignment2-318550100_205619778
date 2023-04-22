import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.heigth = 500;

const background = new Image();
background.src = "images/backgroud2.jpeg";
// background.style.color = 'transparent'

const playerBulletController = new BulletController(canvas,10,"images/laser2.png" ,true);
const enemyBulletController = new BulletController(canvas,10, "images/egg.png" ,false);

const enemyController = new EnemyController(canvas,enemyBulletController,playerBulletController);
const player = new Player(canvas,5,playerBulletController);

let isGameOver = false;
let didWin = false;

//Timer
var timeLimit = 120
var startTime 
var TimeElapsed
startTime = new Date()

//save Player Postion at start of the game
var xPlayerPosAtStart = player.x;
var yPlayerPosAtStart = player.y;


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
        lblScore.value = enemyController.score
        lblTime.value = (timeLimit - TimeElapsed).toPrecision(3)
        lblLives.value = player.lives

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
            lblLives.value = 0;
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
        lblTime.value = 0.000
        

	}
}



setInterval(game,1000/60);