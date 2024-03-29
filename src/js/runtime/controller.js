import Pool from './pool.js';
import GameInfo from './gameinfo.js';
import Character from '../object/character.js';
import config from '../config';

const bulletConf = config.bullet;
const enemyConf = config.enemy;
const awardCharacterConf = config.award.character;

export default class Controller {

    constructor(canvasCtx) {
        this.canvasCtx = canvasCtx;

        this.pool = new Pool(this.canvasCtx);
        this.gameInfo = new GameInfo(this.canvasCtx);

        this.reset();
    }

    reset() {
        this.frame = 0;

        this.characters = [ new Character(this.canvasCtx) ];
        this.bullets = [];
        this.enemys = [];
        this.awardCharacters = [];

        this.score = 0;
        this.gameOver = false;

        if (this.isBindHandler) {
            this.removeRestartHandler();
        }
    }

    update() {
        this.frame++;

        if (this.gameOver) {
            return;
        }

        // 更新敌机
        this.enemys.forEach(enemy => {
            enemy.update();
            if (enemy.isOutTheCanvas()) {
                this.pool.recoverEnemy(this.enemys.shift());
            }
        })
        // 更新奖励机
        this.awardCharacters.forEach(awardCharacter => {
            awardCharacter.update();
            if (awardCharacter.isOutTheCanvas()) {
                this.pool.recoverAwardCharacter(this.awardCharacters.shift());
            }
        })
        // 更新子弹
        this.bullets.forEach(bullet => {
            bullet.update();
            if (bullet.isOutTheCanvas()) {
                this.pool.recoverBullet(this.bullets.shift());
            }
        })
        // 生成敌机
        if (this.frame % enemyConf.initialGenerateInterval === 0) {
            this.enemys.push(this.pool.getEnemy());
        }
        // 生成奖励机
        if (this.frame % awardCharacterConf.initialGenerateInterval === 0) {
            this.awardCharacters.push(this.pool.getAwardCharacter());
        }
        // 生成子弹
        if (this.frame % bulletConf.initialGenerateInterval === 0) {
            for (const character of this.characters) {
                this.bullets.push(this.pool.getBullet(character));
            }
        }
        // 碰撞检测
        this.collisionDetection();
    }

    render() {
        // 渲染敌机
        this.enemys.forEach(enemy => enemy.draw());
        // 渲染奖励机
        this.awardCharacters.forEach(awardCharacter => awardCharacter.draw());
        // 渲染子弹
        this.bullets.forEach(bullet => bullet.draw());
        // 渲染本机
        this.characters.forEach(character => character.draw());
        // 渲染分数
        this.gameInfo.renderGameScore(this.score);
        // 渲染结束页面
        if (this.gameOver) {
            this.gameInfo.renderGameOver(this.score);
            if (!this.isBindHandler) {
                // 设置重新开始点击事件
                this.setRestartHandler();
            }
        }
    }

    collisionDetection() {
        // 敌机碰撞检测
        for (const enemy of this.enemys) {
            for (const bullet of this.bullets) {
                if (enemy.isCollideWith(bullet)) {
                    enemy.isVisible(false);
                    bullet.isVisible(false);
                    this.score += 1;
                    break;
                }
            }
            for (let i = 0; i < this.characters.length; i++) {
                if (enemy.isCollideWith(this.characters[i], 10, 30)) {
                    enemy.isVisible(false);
                    this.characters.splice(i, 1);
                    if (this.characters.length === 0) {
                        this.gameOver = true;
                    }
                    break;
                }
            }
            for (const character of this.characters) {

            }
        }
        // 奖励机碰撞检测
        for (const awardCharacter of this.awardCharacters) {
            for (const character of this.characters) {
                if (awardCharacter.isCollideWith(character, 10, 30)) {
                    awardCharacter.isVisible(false);
                    this.characters.push(new Character(this.canvasCtx));
                    break;
                }
            }
        }
    }

    mobileRestartHandler = (e) => {
        e.preventDefault();

        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        const area = this.gameInfo.btnArea;

        if (x >= area.startX && x <= area.endX && y >= area.startY && y <= area.endY) {
            this.reset();
        }
    }

    pcRestartHandler = (e) => {
        e.preventDefault();

        const x = e.x;
        const y = e.y;
        const area = this.gameInfo.btnArea;

        if (x >= area.startX && x <= area.endX && y >= area.startY && y <= area.endY) {
            this.reset();
        }
    }

    setRestartHandler() {
        // pc端
        this.canvasCtx.canvas.addEventListener("mousedown", this.pcRestartHandler);
        // 手机端
        this.canvasCtx.canvas.addEventListener("touchstart", this.mobileRestartHandler);
        this.isBindHandler = true;
    }

    removeRestartHandler() {
        // pc端
        this.canvasCtx.canvas.removeEventListener("mousedown", this.pcRestartHandler);
        // 手机端
        this.canvasCtx.canvas.removeEventListener("touchstart", this.mobileRestartHandler);
        this.isBindHandler = false;
    }

}