var backgroundImg;
var bg;
var sonic, sonicAnimation;
var knockAnimation, jumpAnimation;
var invisibleGround;
var edges;
var obstacle, obstaclesGroup, robotnikAnimation, tailsAnimation;
var fs, fsAnimation, fsGroup;
var explosionAnimation;
var score = 0;
var bgMusic;
var soundButton, muteButton;


function preload() {

  backgroundImg = loadImage("assets/backgroundImg.jpg")
  sonicAnimation = loadAnimation("assets/SR1.png", "assets/SR2.png", "assets/SR3.png", "assets/SR4.png", "assets/SR5.png", "assets/SR6.png",);
  knockAnimation = loadAnimation("assets/knock/Sk1.png", "assets/knock/Sk2.png", "assets/knock/Sk3.png", "assets/knock/Sk4.png", "assets/knock/Sk5.png", "assets/knock/Sk6.png")
  jumpAnimation = loadAnimation("assets/Jump/J1.png", "assets/Jump/J2.png", "assets/Jump/J3.png", "assets/Jump/J4.png", "assets/Jump/J5.png");
  robotnikAnimation = loadAnimation("assets/Robotnik/R1.png", "assets/Robotnik/R2.png", "assets/Robotnik/R3.png",);
  tailsAnimation = loadAnimation("assets/Tails/T1.png", "assets/Tails/T2.png");
  fsAnimation = loadAnimation("assets/Robotnik/Fs1.png", "assets/Robotnik/Fs2.png", "assets/Robotnik/Fs3.png", "assets/Robotnik/Fs4.png", "assets/Robotnik/Fs5.png", "assets/Robotnik/Fs6.png",)
  explosionAnimation = loadAnimation("assets/Explosion/E1.png", "assets/Explosion/E2.png", "assets/Explosion/E3.png", "assets/Explosion/E4.png", "assets/Explosion/E5.png", "assets/Explosion/E6.png",)
  bgMusic = loadSound("assets/Sounds/Lofi.mp3");

  obstaclesGroup = new Group();
  fsGroup = new Group();


}

function setup() {
  canvas = createCanvas(windowWidth - 100, windowHeight - 100);
  bg = createSprite(width / 2 + 50, height / 2);
  bg.addImage("background", backgroundImg);
  bg.scale = 1.3;
  bg.velocity.x = -5;

  sonic = createSprite(100, height / 2 + 60);
  sonic.addAnimation("running", sonicAnimation);
  sonic.scale = 0.85;
  sonic.addAnimation("jumping", jumpAnimation);

  soundButton = createButton("Play Sound")
  soundButton.position(4, 265);
  soundButton.mousePressed(playSound);

  muteButton = createButton("Mute Sound")
  muteButton.position(1724, 265);
  muteButton.mousePressed(muteSound);





  sonic.addAnimation("knocking", knockAnimation);
  invisibleGround = createSprite(0, 540, 300, 10);
  invisibleGround.visible = false;
  invisibleRoof = createSprite(0, 280, 300, 10);
  invisibleRoof.visible = false;

  edges = createEdgeSprites();


}

function draw() {

  background(255,255);
  if (bg.position.x < 620) {
    bg.position.x = width / 2 - 47;
  }

  if (keyDown("s")) {
    if (frameCount % 10 === 0) {
      fs = createSprite(sonic.x, sonic.y, 10, 10);
      sonic.depth = fs.depth + 1;
      fs.velocity.x = 5;
      fs.addAnimation("fireShot", fsAnimation);
      fs.scale = 0.6;
      fs.lifetime = width / 5;
      fsGroup.add(fs);
    }
  }
    
  for(var i = 0; i < fsGroup.length; i++) {
    for (var j = 0; j < obstaclesGroup.length; j++) {
      if(fsGroup[i].isTouching(obstaclesGroup[j])) {
        fsGroup[i].destroy()
        obstaclesGroup[j].destroy();
    }

    
      
    } 
  }

  // if (fsGroup.isTouching(obstaclesGroup)) {
  //   console.log("collided");
  //   fsGroup.destroyEach();
  //   obstaclesGroup.destroyEach();
  //   score = score+1;
  // }
  
  fill("aquamarine");
  textSize(30);
  text("Score: "+score, width/2, height/2-150);






  if (keyDown("e")) {
    sonic.changeAnimation("knocking");
    sonic.scale = 1.35;
  }

  if (frameCount % 100 === 0) {
    spawnObstacles();
  }

  if (keyWentUp("e")) {
    sonic.changeAnimation("running");
    sonic.scale = 0.85;
  }


  //gravity
  sonic.velocity.y = sonic.velocity.y + 0.5


  if (keyDown("space")) {
    sonic.velocity.y = -7;
    sonic.changeAnimation("jumping");
  }

  if (keyWentUp("space")) {
    sonic.velocity.y = sonic.velocity.y + 0.5
    sonic.changeAnimation("running");
  }

  console.log(sonic.y)

  sonic.collide(invisibleGround);
  sonic.collide(invisibleRoof);




  drawSprites();
}

function destroyObstacle(obs, fire) {
    obs.destroy();
}

function spawnObstacles() {

  obstacle = createSprite(width, random(350, 475));
  obstacle.velocity.x = -3;


  obstacle.lifetime = width / 3;
  sonic.depth = obstacle.depth + 1;
  var rand = round(random(1, 2));
  console.log(rand);

  if (rand === 2) {
    obstacle.addAnimation("tails", tailsAnimation)
    obstacle.changeAnimation("tails");
  }

  if (rand === 1) {
    obstacle.addAnimation("robotnik", robotnikAnimation);
    obstacle.changeAnimation("robotnik");
  }

  obstaclesGroup.add(obstacle)
}

function playSound() {
  bgMusic.play();
}

function muteSound() {
  bgMusic.stop();
}
