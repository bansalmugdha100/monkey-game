
var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup,obsgr 
var survival=0,ground,groundimage,invisibleGround
var score=0,gamestate="play"
var jumpsound,scoresound,diesound;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided=loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundimage=loadImage("background.jpg")
  diesound=loadSound("die.mp3");
  jumpsound = loadSound("jump.mp3");
  scoresound=loadSound("checkPoint.mp3")
}



function setup() {
  createCanvas(400,400)
  ground=createSprite(400,200,900,10)
  ground.velocityX=-5
  ground.shapeColor="green"
  ground.addImage(groundimage)
  ground.scale=1.8
  
  invisibleGround = createSprite(200,350,900,10);
  invisibleGround.visible = false;
  
  monkey=createSprite(50,340,20,20)
  monkey.addAnimation("run",monkey_running)
  monkey.scale=0.15
  monkey.addAnimation("collided",monkey_collided)
  FoodGroup=new Group();
  obsgr=new Group();
}


function draw() {
  survival=Math.ceil(frameCount/frameRate()); 
  if(gamestate==="play"){
  if(monkey.isTouching(FoodGroup)){
   FoodGroup.destroyEach();
   score=score+1
    scoresound.play();
  }
  
  if(keyDown("space")&&monkey.y>290){
    monkey.velocityY=-12;
     jumpsound.play();
  }
   
   if(ground.x<0){
    ground.x=ground.width/2
  }
   if(monkey.isTouching(obsgr)){
     gamestate="end"
     diesound.play();
   }
  
  monkey.velocityY=monkey.velocityY+0.5
  
  food();
  obstacles();}
  drawSprites();
  if(gamestate==="end"){
    FoodGroup.destroyEach();
    ground.setVelocity(0,0)
    obsgr.destroyEach();
    monkey.changeAnimation("collided",monkey_collided)
    monkey.setVelocity(0,0)
    survival=0
    score=0
    stroke("black")
    fill("black")
    textSize(40)
    text("Gameover",100,150)  
   }
 
  monkey.collide(invisibleGround);
  stroke("black")
  fill("black")
  textSize(20)
  text("Survival Time: " +survival,230,50)
  text("score:" +score,230,70)
}
 function food(){
   if(frameCount%120===0){  
    banana=createSprite(400,Math.round(random(120,160),20,10))
    banana.addImage(bananaImage)
    banana.velocityX=-3
    banana.lifetime=130
    FoodGroup.add(banana);
    banana.scale=0.1
    //banana.debug=true
    banana.setCollider("rectangle",0,0,60,60)
   }
 }
 function obstacles(){
  if(frameCount%250===0){
   obstacle=createSprite(400,315,20,50);
   obstacle.lifetime=130
   obstacle.addImage(obstacleImage)
   obstacle.setCollider("rectangle",0,0,400,400)
   obstacle.velocityX=-5
   obsgr.add(obstacle);
   obstacle.scale=0.19
  }
   
 }



