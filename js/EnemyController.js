import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";
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
    MoveDownTimerDefult = 10;
    MoveUpTimerDefult = 10;
    MoveDownTimer = this.MoveDownTimerDefult;
    MoveUpTimer = this.MoveUpTimerDefult;

    constructor(canvas){
        this.canvas =canvas;
        this.createEnemies();
    }

    draw(ctx){
        this.decrementMoveDownTimer();
        this.decrementMoveUpTimer();
        this.updateVelocityAndDirection();
        this.drawEnemies(ctx);
        this.resetMoveDownTimer()
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
