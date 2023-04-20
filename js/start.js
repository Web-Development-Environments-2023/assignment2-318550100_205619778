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

function game() {
    ctx.drawImage(background,0,0,canvas.width,canvas.heigth);    
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);

}



setInterval(game,1000/60);