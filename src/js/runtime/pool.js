import Enemy from '../object/enemy.js';
import Bullet from '../object/bullet.js';
import AwardCharacter from '../object/award.character.js';

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

    getAwardCharacter() {
        const awardCharacter = this.awardCharacterPool.length ? this.awardCharacterPool.shift() : new AwardCharacter(this.canvasCtx);
        awardCharacter.isVisible(true);
        awardCharacter.initPosition();
        awardCharacter.initSpeed();
        return awardCharacter;
    }

    recoverAwardCharacter(awardCharacter) {
        this.awardCharacterPool.push(awardCharacter);
    }

}