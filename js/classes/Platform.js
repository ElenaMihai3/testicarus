//import Vector from './Vector.js';

class Platform {
    constructor(x, y, ctx) {
        this.bottom = y;
        this.left = x;
        this.width = 85;
        this.height = 30;
        this.velocity = 2;
        this.color = `#ff0000`;
        this.x = x;
        this.y = y;
        

        this.ctx = ctx;

    }
    draw(speedPlatforms) {
        this.y += speedPlatforms;
        

        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.closePath();

        

        
    }

}

export default Platform;
