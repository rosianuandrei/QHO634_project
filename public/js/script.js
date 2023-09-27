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
    const labelsDescriptions = await loadImages();
    const faceMatch = new faceapi.FaceMatcher(labelsDescriptions, 0.6)
    
    button.addEventListener('click', () => {
        console.log('Start Recognition');

        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);

        const size = {width: video.width, height: video.height};
        faceapi.matchDimensions(canvas, size)  

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();

            const resizeDetections = faceapi.resizeResults(detections, size);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

            const results = resizeDetections.map((d) => {
                return faceMatch.findBestMatch(d.descriptor)
            })

            results.forEach((result, i) => {
                if (!array.includes(result.label)) {
                    array.push(result.label);
                }
                const box = resizeDetections[i].detection.box;
                const drawBox =new faceapi.draw.DrawBox(box, {label: result.toString()})
                drawBox.draw(canvas);
            })
        }, 100)
    })
}

function loadImages() {
    const names = ['Adams Davis']

    return Promise.all(
        names.map(async (name) => {
            const faceDescriptions = []
            for(let i=1; i<=3; i++) {
                const img = await faceapi.fetchImage(`../images/${name}/${i}.jpg`);
                const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                faceDescriptions.push(detection.descriptor)
            }
            return new faceapi.LabeledFaceDescriptors(name, faceDescriptions)
        })
    )
}