let video;
let poseNet;
let poses = [];
let time=0;
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  console.log(video.width,video.height);
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video,console.log('ready'));
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
    // console.log(poses);
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

// function modelReady() {
//   select('#status').html('Model Loaded');
// }

function draw() {
  translate(video.width, 0);
  // then scale it by -1 in the x-axis
  //to flip the image
  scale(-1, 1);
  //draw video capture feed as image inside p5 canvas
  image(video, 0, 0);
  fill(0, 255, 0);
  circle(100,100,80);
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      // let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (pose.nose.confidence > 0.2||pose.rightWrist.confidence>0.2) {
        // console.log(poses)
        fill(255, 0, 0);
        noStroke();
        ellipse(pose.nose.x, pose.nose.y, 30);
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 30);
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 30);
        if(pose.nose.x>20&&pose.nose.x<180&&pose.nose.y>20&&pose.nose.y<180&&time==0){
          time = setTimeout(()=>{
            var sound = new Howl({
              src: ['sounds/base.mp3'],
              onend: function() {
                console.log('Finished!');
              }
            });
            sound.play();
            time=0
          },1000)
        }
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}