video = "";
object_status = "";
object = [];

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (object_status != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "status: objects detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are- " + object.length;
            fill('#FF0000');
            percent = floor(object[i].confidence * 100);
            text(object[i].label + ' ' + percent + '%', object[i].x + 15, object[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(object[i].x, object[i].y, object[i].width, object[i].length);
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        object = results;
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting object";
}

function modelLoaded() {
    console.log("model loaded");
    object_status = true;
}