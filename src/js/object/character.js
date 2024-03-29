import Sprite from '../base/sprite.js';
import heroPng from '../../resources/images/hero.png';

import config from '../config';

const characterConf = config.character;

export default class Character extends Sprite {

    constructor(canvasCtx) {
        super(canvasCtx, heroPng, characterConf.initialWidth, characterConf.initialHeight);

        this.keydownMoveSpeed = characterConf.initialKeydownMoveSpeed;

        this.initPosition();
        this.initEvent();
    }

    initPosition() {
        const canvas = this.canvasCtx.canvas;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 30;
    }

    /**
     * 初始化触摸事件
     */
    initEvent() {
        const canvas = this.canvasCtx.canvas;
        // PC端
        canvas.addEventListener("mousedown", (e) => {
            e.preventDefault();
            const touchX = e.x;
            const touchY = e.y;
            if (this.isTouchedOnCharacter(touchX, touchY)) {
                this.touched = true;
            }
        })
        canvas.addEventListener("mousemove", (e) => {
            e.preventDefault();
            const touchX = e.x;
            const touchY = e.y;
            if (this.touched) {
                this.touchMoveCharacter(touchX, touchY);
            }
        })
        canvas.addEventListener("mouseup", (e) => {
            e.preventDefault();
            this.touched = false;
        })
        document.addEventListener("keydown", (e) => {
            const { code } = e;
            this.keydownMoveCharacter(code);
        })
        // 手机端
        canvas.addEventListener("touchstart", (e) => {
            e.preventDefault();
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            if (this.isTouchedOnCharacter(touchX, touchY)) {
                this.touched = true;
            }
        })
        canvas.addEventListener("touchmove", (e) => {
            e.preventDefault();
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            if (this.touched) {
                this.touchMoveCharacter(touchX, touchY);
            }
        })
        canvas.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.touched = false;
        })
    }

    /**
     * 判断是否触摸到角色
     * @param touchX
     * @param touchY
     * @returns {boolean}
     */
    isTouchedOnCharacter(touchX, touchY) {
        return touchX > this.x
            && touchX < (this.x + this.width)
            && touchY > this.y
            && touchY < (this.y + this.height);
    }

    /**
     * 触摸移动角色
     * @param touchX
     * @param touchY
     */
    touchMoveCharacter(touchX, touchY) {
        const canvas = this.canvasCtx.canvas;
        // x
        if (touchX < (this.width / 2)) {
            this.x = 0;
        }
        else if (touchX > (canvas.width - this.width / 2)) {
            this.x = canvas.width - this.width;
        }
        else {
            this.x = touchX - this.width / 2;
        }
        // y
        if (touchY < (this.height / 2)) {
            this.y = 0;
        }
        else if (touchY > (canvas.height - this.height / 2)) {
            this.y = canvas.height - this.height;
        }
        else {
            this.y = touchY - this.height / 2;
        }
    }

    /**
     * 按键移动角色
     * @param code
     */
    keydownMoveCharacter(code) {
        const canvas = this.canvasCtx.canvas;
        if (code === "ArrowLeft") {
            if (this.x > 0) {
                this.x -= this.keydownMoveSpeed;
            }
        }
        else if (code === "ArrowUp") {
            if (this.y > 0) {
                this.y -= this.keydownMoveSpeed;
            }
        }
        else if (code === "ArrowRight") {
            if (this.x < (canvas.width - this.width)) {
                this.x += this.keydownMoveSpeed;
            }
        }
        else if (code === "ArrowDown") {
            if (this.y < (canvas.height - this.height)) {
                this.y += this.keydownMoveSpeed;
            }
        }
    }

}