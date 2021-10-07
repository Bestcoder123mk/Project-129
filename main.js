song1="";
song2="";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
song1_status="";
song2_status="";
scoreLeftWrist=0;
function setup(){
    canvas= createCanvas(600,500)
    canvas.center();

    video= createCapture(VIDEO);
    video.hide()
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill('#FF0000');
    stroke('#FF6348');

    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
        }
    }
}
function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}
function modelLoaded(){
    console.log("PoseNet Is Initialised");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X=" + leftWristX + "Left Wrist Y =" + leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X=" + rightWristX + "Right Wrist Y =" + rightWristY);

    }
}
function preload(){
    song1=loadSound("music2.mp3");
    song2=loadSound("music.mp3");
}
