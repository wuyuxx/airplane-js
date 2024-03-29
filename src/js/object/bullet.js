import Sprite from '../base/sprite.js';
import bulletPng from '../../resources/images/bullet.png';

import config from '../config';

const bulletConf = config.bullet;

export default class Bullet extends Sprite {

    constructor(canvasCtx) {
        super(canvasCtx, bulletPng, bulletConf.initialWidth, bulletConf.initialHeight);

        this.initSpeed();
    }

    initPosition(character) {
        this.x = character.x + character.width / 2 - this.width / 2;
        this.y = character.y - this.height;
    }

    initSpeed() {
        this.speed = bulletConf.initialSpeed;
    }

    update() {
        this.y -= this.speed;
    }

}