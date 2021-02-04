var rightWristY;
var rightWristX;
var rightScore;
var climb="";
var story="";

function preload(){
    climb=loadSound("climb.mp3");
    story=loadSound("story.mp3")
}

function setup(){
    canvas=createCanvas(480,380);
    camera=createCapture(VIDEO);
    camera.hide();
    posenet=ml5.poseNet(camera,modelLoaded);
    posenet.on('pose',getPoses);
}

function draw(){
    image(camera,0,0,479,379);
    stroke("#FFFFFF");
    fill("#FFFFFF");
    if (rightScore>0.003){
        circle(rightWristX,rightWristY,20);
        if (rightWristY>0&&rightWristY<=190){
            climb.pause();
            story.pause();
            console.log("It's The Climb");
            climb.play();
        }
        else if (rightWristY>190&&rightWristY<=380){
            climb.pause();
            story.pause();
            console.log("Live Your Story");
            story.play();
        }
    }
}

function play_song(){
    climb.play();
    climb.setVolume(1);
    climb.rate(1);
    story.setVolume(1);
    story.rate(1);
}

function stop(){
    climb.pause();
    story.pause();
}

function modelLoaded(){
    console.log("Model Loaded");
}

function getPoses(results){
    if (results.length>0){
        console.log(results);
        rightWristY=results[0].pose.rightWrist.y;
        rightWristX=results[0].pose.rightWrist.y;
        rightScore=results[0].pose.keypoints[10].score;
        console.log("right score: "+rightScore);
        console.log(rightWristY);
    }
    else{
        console.log("error");
    }
}
