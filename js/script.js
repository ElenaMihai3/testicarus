import Icarus from './classes/Icarus.js'
// import Vector from './classes/Vector.js';

{
    let icarus;
    let video;
    let poseNet;
    let pose;
    let rightWristDistances = [];
    let $canvas;
    //const $canvas = document.querySelector('.canvasIcarus');
    //const ctx = $canvas.getContext(`2d`);
    const canvasVideo = document.querySelector('.canvasVideo');
    const ctxVideo = canvasVideo.getContext('2d');
    const canvasIcarus = document.querySelector('.canvasIcarus');
    const ctxIcarus = canvasIcarus.getContext('2d');
    let speed;


    window.setup = function setup() {
        //make camera
        
        $canvas = createCanvas(640, 480);
        console.log($canvas);
        background(0);

        //videoCanvas.parent('canvasIcarus')
        video = createCapture(VIDEO);
        video.hide();
        video.size(320,240);
        //get poses
        poseNet = ml5.poseNet(video, modelLoaded);
        poseNet.on('pose', gotPoses);
        
    }

    function gotPoses(poses) {

        //if more than 1 person
        if (poses.length > 0) {
            pose = poses[0].pose;
        }
    }

    function modelLoaded() {
        console.log('poseready');
    }

    window.draw = function draw() {
        //image(video, 0, height-video.height);

        // //red nose
        // //check if valid pose (here nose) exists
        // if (pose) {
        //     //get the distance from the camera by looking at how far apart the eyes are.
        //     let LeftE = pose.leftEye;
        //     let RightE = pose.rightEye;
        //     let d = dist(RightE.x, RightE.y, LeftE.x, LeftE.y)

        //     fill(255, 0, 0);
        //     //as the d is the size, the closer you get the red nose changes the size
        //     ellipse(pose.nose.x, pose.nose.y, d);
        //     ellipse(pose.leftWrist.x, pose.leftWrist.y, 30);
        //     ellipse(pose.rightWrist.x, pose.rightWrist.y, 30);
        // }

        if (pose) {
            setInterval(function () {
            var newWristPosition = {
                newRightWristX: pose.rightWrist.x,
                newRightWristY: pose.rightWrist.y,
            };
            rightWristDistances.push(newWristPosition);
            //this code runs every second 
        }, 1000);
        }
        //console.log(rightWristDistances);
        calculateSpeed();
    }

    const calculateSpeed = () => {
        //get the last tem from array

        if(pose) {
            let currentPosition = rightWristDistances[rightWristDistances.length - 1];
            let lastPosition = rightWristDistances[rightWristDistances.length - 2];
            //console.log(currentPosition);
            //console.log(lastPosition);
            
            if(currentPosition != undefined && lastPosition != undefined) {
                speed = dist(currentPosition.newRightWristX, currentPosition.newRightWristY, lastPosition.newRightWristX, lastPosition.newRightWristY);
                //console.log(speed);
            }
            
        }
    }

    const drawIcarus = () => {
        ctxIcarus.clearRect(0, 0, canvasIcarus.width, canvasIcarus.height);
        icarus.draw(speed);
        //console.log(speed);
        requestAnimationFrame(drawIcarus);
    }

    const init = () => {
        console.log('ml5 version:', ml5.version);
        document.body.append(document.createTextNode(ml5.version));
        
        icarus = new Icarus(canvasIcarus, canvasIcarus.width / 2, canvasIcarus.height - 10, `#ff0000`);
        drawIcarus();
        
    };

    init();
}