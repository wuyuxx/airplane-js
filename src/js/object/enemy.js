import Sprite from '../base/sprite.js';
import enemyPng from '../../resources/images/enemy.png';

import config from '../config';

const enemyConf = config.enemy;

export default class Enemy extends Sprite {

    constructor(canvasCtx) {
        super(canvasCtx, enemyPng, enemyConf.initialWidth, enemyConf.initialHeight);
    }

    initPosition() {
        const canvas = this.canvasCtx.canvas;
        this.x = (canvas.width - this.width) * Math.random();
        this.y = -this.height;
    }

    initSpeed() {
        this.speed = enemyConf.initialSpeed;
    }

    update() {
        this.y += this.speed;
    }

}