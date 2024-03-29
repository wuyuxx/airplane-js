import Sprite from '../base/sprite.js';
import heroPng from '../../resources/images/hero.png';

import config from '../config';

const awardCharacterConf = config.award.character;

export default class AwardCharacter extends Sprite {

    constructor(canvasCtx) {
        super(canvasCtx, heroPng, awardCharacterConf.initialWidth, awardCharacterConf.initialHeight);
    }

    initPosition() {
        const canvas = this.canvasCtx.canvas;
        this.x = (canvas.width - this.width) * Math.random();
        this.y = -this.height;
    }

    initSpeed() {
        this.speed = awardCharacterConf.initialSpeed;
    }

    update() {
        this.y += this.speed;
    }

}