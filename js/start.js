import EnemyController from "./EnemyController.js";
import Player from "./Player.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.heigth = 500;

const background = new Image();
background.src = "images/backgroud2.jpeg";
// background.style.color = 'transparent'

const player = new Player(canvas,3);
const enemyController = new EnemyController(canvas);

function game() {
    ctx.drawImage(background,0,0,canvas.width,canvas.heigth);    
    // enemyController.draw(ctx);
    player.draw(ctx);
    console.log(player.y)

}



setInterval(game,1000/60);