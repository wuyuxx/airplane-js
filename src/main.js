import './css/style.css';
import { getCanvasCtx } from './js/base/canvas.js';
import Background from './js/runtime/background.js';
import Controller from './js/runtime/controller.js';

const canvasCtx = getCanvasCtx('mainCanvas', window.innerWidth, window.innerHeight);
const background = new Background(canvasCtx);
const controller = new Controller(canvasCtx);

loop();

function loop() {
    update();
    render();
    window.requestAnimationFrame(loop);
}

function update() {
    background.update();
    controller.update();
}

function render() {
    const canvas = canvasCtx.canvas;
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    background.render();
    controller.render();
}