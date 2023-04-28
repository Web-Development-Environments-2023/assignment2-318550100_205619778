import Enemy from "Enemy.js";
import MovingDirection from "MovingDirection.js";
export default class EnemyController{

    enemyMap = [
        [1,1,1,1,1],
        [2,2,2,2,2],
        [3,3,3,3,3],
        [4,4,4,4,4],
    ];
    enemyRows=[];

    currentDirection = MovingDirection.rigth;
    xVelocity = 0;
    yVelocity = 0;
    defultXVelocity =2;
    defultYVelocity =2;
    MoveDownTimerDefult = 8;
    MoveUpTimerDefult = 8;
    MoveDownTimer = this.MoveDownTimerDefult;
    MoveUpTimer = this.MoveUpTimerDefult;
    fireBulletTimerDefult = 60;
    fireBulletTimer = this.fireBulletTimerDefult;
    fireBulletVelocity = -4;

    /*Score */
    scoreDefult = 0;
    score = this.scoreDefult;

    constructor(canvas,enemyBulletController,playerBulletController){
        this.canvas =canvas;
        this.enemyBulletController=enemyBulletController;
        this.playerBulletController=playerBulletController;
        this.enemyDeathSound = new Audio('sounds/chicken_hit.wav')
        this.enemyDeathSound.volume = 0.5
        this.createEnemies();
    }

    incraseSpeed(){
        this.defultXVelocity+=1;
        this.defultYVelocity+=1;
        this.MoveDownTimerDefult-=2;
        this.MoveUpTimerDefult-=2;
        this.fireBulletVelocity-=0.5;
        this.fireBulletTimerDefult-=5;
    }

    draw(ctx){
        this.decrementMoveDownTimer();
        this.decrementMoveUpTimer();
        this.updateVelocityAndDirection();
        this.collisionDetection();
        this.drawEnemies(ctx);
        this.resetMoveDownTimer()
        this.fireBullet();
    }

    collisionDetection() {
        this.enemyRows.forEach((enemyRow) => {
          enemyRow.forEach((enemy, enemyIndex) => {
            if (this.playerBulletController.collideWith(enemy)) {
              this.enemyDeathSound.currentTime = 0;
              this.enemyDeathSound.play();
              enemyRow.splice(enemyIndex, 1);
              if(enemy.type==1){this.score+=20}
              else if(enemy.type == 2){this.score+=15}
              else if(enemy.type == 3){this.score+=10}
              else if(enemy.type == 4){this.score+=5}
            }
          });
        });
    
        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
      }

    fireBullet(){
        this.fireBulletTimer--;
        if(this.fireBulletTimer <= 0){
            this.fireBulletTimer = this.fireBulletTimerDefult;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random()*allEnemies.length);
            const enemy = allEnemies[enemyIndex]
            this.enemyBulletController.shoot(enemy.x,enemy.y,5,6,this.fireBulletVelocity);
        }
    }
    resetMoveDownTimer(){
        if(this.MoveDownTimer <= 0){
            this.MoveDownTimer = this.MoveDownTimerDefult;
        }
    }

    decrementMoveDownTimer(){
        if(this.currentDirection === MovingDirection.downLeft || this.currentDirection === MovingDirection.downRigth){
            this.MoveDownTimer--;
        }
    }

    decrementMoveUpTimer(){
        if(this.currentDirection === MovingDirection.upLeft || this.currentDirection === MovingDirection.upRigth){
            this.MoveDownTimer--;
        }
    }

    updateVelocityAndDirection(){
        for(const enemyRows of this.enemyRows){
            if(this.currentDirection == MovingDirection.rigth){
                this.xVelocity = this.defultXVelocity;
                this.yVelocity = 0;
                const rigthMostEnemy = enemyRows[enemyRows.length -1];
                if(rigthMostEnemy.x + rigthMostEnemy.width >= this.canvas.width-20){
                    this.currentDirection =MovingDirection.downLeft;
                    break;
                }
            }
            else if(this.currentDirection === MovingDirection.downLeft){
                if(this.MoveDown(MovingDirection.left)){
                    break;
                }
            }
            else if(this.currentDirection === MovingDirection.left){
                this.xVelocity = -this.defultXVelocity;
                this.yVelocity = 0;
                const leftMostEnemy = enemyRows[0];
                if(leftMostEnemy.x <= 0){
                    this.currentDirection = MovingDirection.upRigth;
                    break;
                }
            }
            else if(this.currentDirection === MovingDirection.upRigth){
                if(this.MoveUp(MovingDirection.rigth)){
                    break;
                }

            }
        }
    }
    MoveDown(newDirection){
      this.xVelocity=this.defultXVelocity;
      this.yVelocity = this.defultYVelocity;
      if(this.MoveDownTimer <=0){
        this.currentDirection=newDirection;
        return true;
      }
      return false;

    }
    MoveUp(newDirection){
        this.xVelocity=this.defultXVelocity;
        this.yVelocity = -this.defultYVelocity;
        if(this.MoveDownTimer <=0){
          this.currentDirection=newDirection;
          return true;
        }
        return false;
      }

    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy)=>{
            enemy.move(this.xVelocity,this.yVelocity);
            enemy.draw(ctx);
        });
    }

    createEnemies(){
        this.enemyMap.forEach((row, rowIndex) => {
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber,enemyIndex)=>{
                if(enemyNumber > 0){

                    this.enemyRows[rowIndex].push(new Enemy(enemyIndex*50, rowIndex*35,enemyNumber)
                    );
                }
            });
        });
    }
}
