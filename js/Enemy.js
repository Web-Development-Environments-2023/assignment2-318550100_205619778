export default class Enemy {
    constructor(x,y,imageNumber){
        this.x = x;
        this.y = y;
        this.width = 44;
        this.heigth = 32;

        this.image = new Image();
        this.image.src = `images/chicken${imageNumber}.png`
    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.heigth);
    }

    move(xVelocity,yVelocity){
        this.x += xVelocity;
        this.y += yVelocity;
    }
}