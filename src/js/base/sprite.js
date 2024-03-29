export default class Sprite {

    constructor(canvasCtx,
                imageSrc = "",
                width = 0,
                height = 0,
                x = 0,
                y = 0) {
        this.canvasCtx = canvasCtx;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;

        this.isVisible();
    }

    isVisible(value = true) {
        this.visible = value;
    }

    /**
     * 绘制
     */
    draw() {
        if (this.visible) {
            this.canvasCtx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    /**
     * 碰撞判断
     * @param sprite
     * @returns {boolean}
     */
    isCollideWith(sprite, reduceX = 0, reduceY = 0) {
        if (!(sprite && sprite instanceof Sprite && sprite.visible && this.visible)) {
            return false;
        }
        const thisLeft = this.x;
        const thisRight = this.x + this.width;
        const spriteLeft = sprite.x + reduceX;
        const spriteRight = sprite.x + sprite.width - reduceX;
        const thisTop = this.y;
        const thisBottom = this.y + this.height;
        const spriteTop = sprite.y + reduceY;
        const spriteBottom = sprite.y + sprite.height - reduceY;
        const collideX = !(thisRight < spriteLeft || thisLeft > spriteRight);
        const collideY = !(thisBottom < spriteTop || thisTop > spriteBottom);
        return collideX && collideY;
    }

    isOutTheCanvas() {
        const canvas = this.canvasCtx.canvas;
        const thisLeft = this.x;
        const thisRight = this.x + this.width;
        const thisTop = this.y;
        const thisBottom = this.y + this.height;
        const outTheX = thisLeft > canvas.width || thisRight < 0;
        const outTheY = thisTop < -this.height || thisBottom > canvas.height + this.height;
        return outTheX || outTheY;
    }

}