import Vector from './Vector.js';

class Icarus {
    constructor($canvas, x, y, color) {
        this.$canvas = $canvas;
        this.ctx = $canvas.getContext(`2d`);
        this.x = x;
        this.y = y;
        this.color = color;

    }
    draw(speed) {
        console.log(speed);
        if (speed != undefined) {
            this.velocityY = (speed/5);
        } else {
            this.velocityY = 0;
        }

        this.y -= this.velocityY;

        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

}

export default Icarus;
