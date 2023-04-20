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

function game() {
    checkGameOver();
    ctx.drawImage(background,0,0,canvas.width,canvas.heigth);
    displayGameOver();
    if(!isGameOver){
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
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
        isGameOver = true;
    }
    if(enemyController.enemyRows.length === 0){
        didWin = true;
        isGameOver =true;
    }
}



setInterval(game,1000/60);