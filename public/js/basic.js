function drawArrayRectsTimeout(array) {
    setTimer(setInterval(function () {
        addCoordinate(array[0][0], array[0][1], array[0][2]);
        updateCanvas();
        array.shift();

        if (array.length === 0) {
            stopDrawing();
        }
    }, getTimeout() * 100));
}