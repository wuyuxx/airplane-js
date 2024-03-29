const getCanvasCtx = (elementId, width, height) => {
    const canvas = document.getElementById(elementId);
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
}

export { getCanvasCtx }