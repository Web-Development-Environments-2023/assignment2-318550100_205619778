
export default class Player {
    rightPressed = false;
    leftPressed =false;

    upPressed=false;

    downPressed=false;
    shootPressed=false;

    constructor(canvas,velocity,bulletController,keyShoot="Space",starship=6){
        this.Keyshoot = keyShoot;
        this.canvas=canvas;
        this.velocity=velocity;
        this.bullet = bulletController;
        this.starship = starship;
        this.x = Math.floor(Math.random()*(canvas.width-70));
        this.y = this.canvas.height-70;

        this.width=50;
        this.height=48;
        this.image = new Image();
        this.image.src = `images/spaceship${this.starship}.png`;

        document.addEventListener("keydown",this.keydown)
        document.addEventListener("keyup",this.keyup)
        this.lives = 3;
        this.playerDeathSound = new Audio("sounds/playerHit.wav")
        this.playerDeathSound.volume = 0.5

    }
    setPosition(x,y){
        this.x =x;
        this.y=y;
    }

    reduceLives(){
        this.lives--;
    }

    draw(ctx) {
        if(this.shootPressed){
            this.bullet.shoot(this.x + this.width / 2, this.y,5,20, 4, 10);
        }
        this.move()
        this.collideWithWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collideWithWalls(){
        //left
        if(this.x<0){
            this.x=0;
        }

        //right
        if(this.x>this.canvas.width-this.width){
            this.x=this.canvas.width -this.width;
        }

        //up 40%
        if(this.y<(this.canvas.height -this.height)*0.6){
            this.y=(this.canvas.height-this.height)*0.6;
        }

        //down
        if(this.y > this.canvas.height-this.height-22){
            this.y =this.canvas.height-this.height-22;
        }

    }

    move(){
        if(this.rightPressed){
            this.x += this.velocity;
        }
        else if(this.leftPressed){
            this.x += -this.velocity;
        }
        else if(this.upPressed){
            this.y += -this.velocity;
        }
        else if(this.downPressed){
            this.y += +this.velocity;
        }
    }

    keydown = event =>{
        if(event.code == "ArrowRight"){
            this.rightPressed = true;
        }
        if(event.code == "ArrowLeft"){
            this.leftPressed = true;
        }
        if(event.code == "ArrowUp"){
            this.upPressed = true;
        }
        if(event.code == "ArrowDown"){
            this.downPressed = true;
        }
        if(event.code == this.Keyshoot){
            this.shootPressed =true;
        }
    };
    keyup = event =>{
        if(event.code == "ArrowRight"){
            this.rightPressed = false;
        }
        if(event.code == "ArrowLeft"){
            this.leftPressed = false;
        }
        if(event.code == "ArrowUp"){
            this.upPressed = false;
        }
        if(event.code == "ArrowDown"){
            this.downPressed = false;
        }
        if(event.code == this.Keyshoot){
            this.shootPressed =false;
        }
    };
}