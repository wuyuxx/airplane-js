import commonPng from '../../resources/images/Common.png';

const commonImage = new Image();
commonImage.src = commonPng;

export default class GameInfo {

    constructor(canvasCtx) {
        this.canvasCtx = canvasCtx;
    }

    renderGameScore(score) {
        this.canvasCtx.fillStyle = '#ffffff';
        this.canvasCtx.font = '20px Arial';
        this.canvasCtx.fillText(score, 10, 30);
    }

    renderGameOver(score) {
        const ctx = this.canvasCtx;
        const screenWidth = ctx.canvas.width;
        const screenHeight = ctx.canvas.height;

        ctx.drawImage(commonImage, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)
        ctx.fillStyle = '#ffffff'
        ctx.font = '20px Arial'
        ctx.fillText(
            '游戏结束',
            screenWidth / 2 - 40,
            screenHeight / 2 - 100 + 50
        )
        ctx.fillText(
            `得分: ${score}`,
            screenWidth / 2 - 40,
            screenHeight / 2 - 100 + 130
        )
        ctx.drawImage(
            commonImage,
            120, 6, 39, 24,
            screenWidth / 2 - 60,
            screenHeight / 2 - 100 + 180,
            120, 40
        )
        ctx.fillText(
            '重新开始',
            screenWidth / 2 - 40,
            screenHeight / 2 - 100 + 205
        )
        // 重新开始按钮区域
        this.btnArea = {
            startX: screenWidth / 2 - 40,
            startY: screenHeight / 2 - 100 + 180,
            endX: screenWidth / 2 + 50,
            endY: screenHeight / 2 - 100 + 255
        }
    }

}