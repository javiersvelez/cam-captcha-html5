_LIMLEF = 160;
_LIMRIG = 350;
_LIMTOP = 320;
_LIMBOT = 80;

_THRESHOLD = 14000;

function draw(video, c, w, h) {

    if (video.paused || video.ended)
        return false;
    // if no video, exit here
    context.drawImage(video, 0, 0, w, h);
    // draw video feed to canvas
    var uri = canvas.toDataURL("image/png");

}

function validateSample(ctx, imageData) {
    drawGuideLines(ctx);

    if (imageData.count > _THRESHOLD) {
        ctx.fillText("[A C C E P T E D]", 173, 358);
        return true;
    } else {
        return false;
    }

}

function detectSkin(ctx, imageData) {

    var newData = ctx.createImageData(imageData.width, imageData.height);

    context.font = "20px Arial";
    context.fillStyle = "#2EFE2E";

    newData["count"] = 0;

    //Color Range
    var ri = 40;
    var rs = 168;
    var gi = 30;
    var gs = 98;
    var bi = 18;
    var bs = 88;

    var p = 0;

    for (var i = 0; i < imageData.height; i++) {
        for (var j = 0; j < imageData.width; j++) {

            var r = imageData.data[p + 0];
            var g = imageData.data[p + 1];
            var b = imageData.data[p + 2];
            var valor = 255;

            //Alfa should always be 255
            newData.data[p + 3] = 255;

            if (validatePixel(r, g, b, i, j)) {

                newData.data[p + 0] = 46;
                newData.data[p + 1] = 254;
                newData.data[p + 2] = 46;
                newData.data[p + 3] = 150;
                newData["count"]++;

            } else {
                newData.data[p + 0] = r;
                newData.data[p + 1] = g;
                newData.data[p + 2] = b;
            }

            p += 4;
        }
    }

    return newData;

}

function validatePixel(r, g, b, i, j) {

    //Check for Window region
    if (j > _LIMLEF && j < _LIMRIG && i > _LIMBOT && i < _LIMTOP) {
        //Color Range
        var ri = 40;
        var rs = 168;
        var gi = 30;
        var gs = 98;
        var bi = 18;
        var bs = 88;

        if ((r > ri && r < rs) && (g > gi && g < gs) && (b > bi && b < bs)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

function drawGuideLines(ctx) {
    //Dibujar guias
    ctx.fillRect(_LIMLEF, 0, 1, _CANVASHEIGHT);
    ctx.fillRect(_LIMRIG, 0, 1, _CANVASHEIGHT);
    ctx.fillRect(0, _LIMBOT, _CANVASWIDTH, 1);
    ctx.fillRect(0, _LIMTOP, _CANVASWIDTH, 1);
}


