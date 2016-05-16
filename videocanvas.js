console.log("Script OK");

var _VIDEOMODE = true;
var _CANVASWIDTH = undefined;
var _CANVASHEIGHT = undefined;

var _DATA = "";
var _SAMPLENUM = 0;

var video = document.querySelector("#videoElement");

// check for getUserMedia support
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

if (navigator.getUserMedia) {
    // get webcam feed if available
    navigator.getUserMedia({
        video : true
    }, handleVideo, videoError);
}

function handleVideo(stream) {
    // Attach feed to video element
    video.src = window.URL.createObjectURL(stream);

}

function videoError(e) {
    console.log("Error opening the camera");
}

var video, canvas, context, w, h;

$(document).ready(function() {
    // when DOM loaded, get canvas 2D context and store width and height of element
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    _CANVASWIDTH = canvas.width;
    _CANVASHEIGHT = canvas.height;

    w = canvas.width;
    h = canvas.height;

    var counter = 0;

    if (_VIDEOMODE) {

        setInterval(function() {
            draw(video, context, w, h);
            imageData = context.getImageData(0, 0, w, h);
            var skinData = detectSkin(context, imageData);

            //Deteccion y validacion
            context.putImageData(skinData, 0, 0);
            validateSample(context, skinData);
            drawGuideLines(context);
            
            //console.log("cuenta: " + skinData.cuenta);
            counter++;

        }, 50);
    }

});

/* EVENTS */
$("#buttonSample").click(function() {

    console.log("Sample: " + _SAMPLENUM);
    draw(video, context, w, h);

    //Detection and validation
    imageData = context.getImageData(0, 0, w, h);
    var skinData = detectSkin(context, imageData);
    
    
    _SAMPLENUM ++;
    
    context.putImageData(skinData, 0, 0);
    var result = validateSample(context, skinData);
    _DATA += _SAMPLENUM + " " + result + "\n";

});




