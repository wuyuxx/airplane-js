import Enemy from '../object/enemy.js';
import Bullet from '../object/bullet.js';

export default class Pool {

    constructor(canvasCtx) {
        this.canvasCtx = canvasCtx;

        this.bulletPool = [];
        this.enemyPool = [];
        this.awardCharacterPool = [];
    }

    getBullet(character) {
        const bullet = this.bulletPool.length ? this.bulletPool.shift() : new Bullet(this.canvasCtx);
        bullet.isVisible(true);
        bullet.initPosition(character);
        bullet.initSpeed();
        return bullet;
    }

    recoverBullet(bullet) {
        this.bulletPool.push(bullet);
    }

    getEnemy() {
        const enemy = this.enemyPool.length ? this.enemyPool.shift() : new Enemy(this.canvasCtx);
        enemy.isVisible(true);
        enemy.initPosition();
        enemy.initSpeed();
        return enemy;
    }

    recoverEnemy(enemy) {
        this.enemyPool.push(enemy);
    }

}