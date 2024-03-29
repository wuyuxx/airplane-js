import bgImage from '../../resources/images/bg.jpg';

export default class Background {

    constructor(canvasCtx) {
        this.canvasCtx = canvasCtx;
        this.image = new Image();
        this.image.src = bgImage;

        this.top = 0;
    }

    update() {
        this.top += 1;

        if (this.top >= this.canvasCtx.canvas.height) {
            this.top = 0;
        }
    }

    render() {
        const canvas = this.canvasCtx.canvas;

        this.canvasCtx.drawImage(
            this.image,
            0,
            -canvas.height + this.top,
            canvas.width,
            canvas.height
        );
        this.canvasCtx.drawImage(
            this.image,
            0,
            this.top,
            canvas.width,
            canvas.height
        );
    }

}