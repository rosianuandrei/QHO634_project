const video = document.getElementById('videoInput');
const button = document.getElementById('start');

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start)

function start() {

    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream,
        error => console.error(error)
    )

    faceRecognizer();
}

async function faceRecognizer() {

}

function loadImages() {

}