var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var bloods,bloodGroup;
var score;
var survivalTime;

function preload(){
  towerImg = loadImage("tower.jpg");
  doorImg = loadImage("door.jpg");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-stand.png");
  spookySound = loadSound("ghost02.wav");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  bloodGroup = new Group();
  
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  
  score=0
  
}
function draw(){
  
 background(0) 
  
  if (tower.y>400){
   tower.y=300 
  }
  spawnDoors();
  
  if (keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-3
  }
  
  if (keyDown("RIGHT_ARROW")){
   ghost.x=ghost.x+3 
  }
  
  if (keyDown("SPACE")){
   ghost.velocityY=-3 
  }
  
  ghost.velocityY=ghost.velocityY+0.8
  
  if(climbersGroup.isTouching(ghost)||doorsGroup.isTouching(ghost)){
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    score=score-1            
  }
 
  if (bloodGroup.isTouching(ghost)){
   bloodGroup.destroyEach();
   score=score+3
 }
  
  
  
  drawSprites();
  blood();
  stroke(600)
  fill(600)
  textSize(20)
  text("Score: "+score,200,20)
  
  if (ghost.y>windowHeight){
    stroke("red")
    fill("red")
    textSize(25)
    textAlign(CENTER)
    text("GAME OVER!!!!",300,300)
    bloodGroup.destroyEach();
    climbersGroup.destroyEach();
    doorsGroup.destroyEach();
    ghost.destroy(ghostImg);
    tower.velocityY=0
  }
  
  
}

function spawnDoors(){
  
  if (frameCount%240==0){
   var door=createSprite(200,-50)
   door.addImage(doorImg)
   var climber=createSprite(200,10)
   climber.addImage(climberImg)
   door.x=Math.round(random(120,400))  
   climber.velocityY=2
   climber.x=door.x 
   door.velocityY=2
   door.lifetime=300
   climber.liftime=300 
   doorsGroup.add(door)
   climbersGroup.add(climber) 
   ghost.depth=door.depth
   ghost.depth=ghost.depth+1 
  }
}  
  function blood(){
if(frameCount%120==0){
var bloods=createSprite(200,50,20,20)
bloods.shapeColor="red" 
bloods.velocityY=2
bloods.x=Math.round(random(10,390))
 
  if (frameCount%10 === 0){
    survivalTime=survivalTime+2;
  }
 bloodGroup.add(bloods)
  
}
}