import Icarus from './classes/Icarus.js'
import Platform from './classes/Platform.js'

 const $canvas = document.querySelector(`.canvas`);
    const ctx = $canvas.getContext("2d");
let platforms = [];
{
   
    let video;
    let poseNet;
    let pose;
    let speed;
    let rightWristDistances = [];
    let currentPosition;
    let xPositionNose;
    let lastPosition
    const grid = document.querySelector('.grid');
    let icarus;
    let startPoint = 100;
    let icarusLeftSpace;
    let icarusBottomSpace = startPoint;
    let icarusTopSpace;
    const platformAmount = 2;
    let isGameOver = false;
    const gridHeight = 800;
    const gridWidth = 500;
    
    let upTimerId;
    let downTimerId;
    //only jump if jump is false (dont double jump)
    let isFlying = true;
    let flyTimerId;
    let leftTimerId;
    let rightTimerId;
    let score = 0;
    let speedPlatforms = 0.5;
    const button = document.querySelector('.button');

    window.setup = function setup() {

        video = createCapture(VIDEO);
        video.hide();
        video.size(320, 240);
        //get poses
        poseNet = ml5.poseNet(video, { flipHorizontal: true }, modelLoaded);

    }

    function gotPoses(poses) {

        if (poses.length > 0) {
            pose = poses[0].pose;
        }
    }

    function modelLoaded() {
        console.log('poseready');
        poseNet.on('pose', gotPoses);
    }

    window.draw = function draw() {
        
        if (pose) {
            setInterval(function () {
                xPositionNose = pose.nose.x;
            }, 1000);
        }

        // if (pose) {
        //     setInterval(function () {
        //         var newWristPosition = {
        //             newRightWristX: pose.rightWrist.x,
        //             newRightWristY: pose.rightWrist.y,
        //         };
        //         rightWristDistances.push(newWristPosition);
        //         xPositionNose = pose.nose.x;

        //         //this code runs every second 
        //     }, 1000);
        // }
        // //console.log(rightWristDistances);
        // calculateSpeed();
    }

    // const calculateSpeed = () => {

    //     if (pose) {
    //         currentPosition = rightWristDistances[rightWristDistances.length - 1];
    //         lastPosition = rightWristDistances[rightWristDistances.length - 2];

    //         if (currentPosition != undefined && lastPosition != undefined) {
    //             speed = dist(currentPosition.newRightWristX, currentPosition.newRightWristY, lastPosition.newRightWristX, lastPosition.newRightWristY);
    //             //console.log(speed);
    //         }
    //     }
    // }
    
    const createPlatforms = () => {
        for (let i = 0; i < platformAmount; i++) {
            let platformGap = gridHeight / platformAmount;
            let newPlatformBottom = 50 + (i * platformGap) / 2;
            let newPlatform = new Platform(Math.random() * 415, newPlatformBottom, ctx);
            platforms.push(newPlatform);
            console.log(platforms);
        }
        
    }

    // const animatePlatforms = () => {
    //     ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    //         platforms.forEach(platform => {
    //             platform.draw(speedPlatforms);
                
    //             if (platform.y > 790) {
    //                 platforms.shift();
    //                 //add
    //                 score++
    //                 let newPlatform = new Platform(Math.random() * 415, 0, ctx);
    //                 platforms.push(newPlatform);
    //             }
    //         }
    //     );
    // }

    const calculatePlatforms = () => {
        speedPlatforms = speedPlatforms + 0.05; 
    }

    const restart = () => {
        isGameOver = false;
        grid.innerHTML = "";
        start();
    }

    const gameOver = () => {

        console.log("gameOver");
        isGameOver = true;
        platforms = [];
        //get rid of all children in parent
        ctx.clearRect(0, 0, $canvas.width, $canvas.height);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(20, 20, 150, 100);
        //score

        //no longer moving down bcs downtimerId is cleared
        

        button.addEventListener('click', restart);
    }

    const drawIcarus = () => {
        ctx.clearRect(0, 0, $canvas.width, $canvas.height);

        icarus.draw(xPositionNose);

        for(const platform of platforms) {
            platform.draw(speedPlatforms);

            if (platform.y > 790) {
                platform.y = 0;
                platform.x = Math.random() * 415;
                //add
                score++
                //let newPlatform = new Platform(Math.random() * 415, 0, ctx);
                //platforms.push(newPlatform);
            }
            if (icarus.x - 43.5 >= platform.x + 42.5 || icarus.y + 42.5 <= platform.y-15 ||
                icarus.x + 43.5 <= platform.x - 42.5 || icarus.y - 42.5 >= platform.y+15){
                requestAnimationFrame(drawIcarus);
            } else {
                gameOver();
            }
        }
        
    }

    const start = () => {
        //only make function if this function is awoke
        if (!isGameOver) {
            createPlatforms();
            setInterval(calculatePlatforms, 1000);
            drawIcarus();
                    //createIcarus();
            
            //setInterval(movePlatforms, 100);
            //animatePlatforms();
            //setInterval(fly, 30)
                    //document.addEventListener('keyup', control);
        }
    }


    const init = () => {
        
        icarus = new Icarus($canvas, $canvas.width / 2, 600, `#ff0000`, ctx);
        button.addEventListener('click', start);
    };

    init();
}