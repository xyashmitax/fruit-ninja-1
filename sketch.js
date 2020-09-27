var sword, swordImage, SwordSound;


//gamestates
var END;
var PLAY;
var gameState;

//var hehe;

var score;

var Fruit, FruitGroup,FruitImage1, FruitImage2, FruitImage3, FruitImage4;

var EnemyAnimation, Enemy, EnemyGroup;

var backgroundImage;

var GameOver, GameOverImage, GameOverSound;

function preload(){
  
  
  swordImage = loadImage("sword.png");
  SwordSound = loadSound("knifeSwooshSound.mp3");

  FruitImage1 = loadImage("fruit1.png");
  FruitImage2 = loadImage("fruit2.png");
  FruitImage3 = loadImage("fruit3.png");
  FruitImage4 = loadImage("fruit4.png");
  
  EnemyAnimation = loadAnimation("alien1.png", "alien2.png");
  
  GameOverImage = loadImage("gameover.png");
  GameOverSound = loadSound("gameover.mp3");
  
}

function setup(){
  
  createCanvas(500,500);
  
  //hehe = createSprite(200,300,50,50);
  
  PLAY = 1;
  END = 0;
  gameState = 1;
  
  FruitGroup = new Group();
  EnemyGroup = new Group();
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.5
  
  score = 0;
}

function draw(){
  background(rgb(135,206,235));
  
  if(gameState===PLAY){
  sword.y=World.mouseY;
  sword.x=World.mouseX;

    text("score = "+score,400,450);
    
  if(FruitGroup.isTouching(sword)){
    FruitGroup.destroyEach();
    score = score+2;
  }
  if(EnemyGroup.isTouching(sword)){
  gameState=END;
  }
  
  }
if(gameState===END){
  EnemyGroup.setLifeTimeEach=-1;
  FruitGroup.setLifeTimeEach=-1;
  
  EnemyGroup.setVelocityXEach(0);
  EnemyGroup.setVelocityYEach(0);
  
  FruitGroup.setVelocityX = 0;
  FruitGroup.setVelocityY = 0;
  
  sword.addImage(GameOverImage);
  
  text("score = "+score,400,450);
  
  }
  
  enemy();
  fruits();
  drawSprites();
}

function fruits(){
if(World.frameCount%80===0){
Fruit = createSprite(400,200,20,20);
  Fruit.scale=0.2;
  r=Math.round(random(1,4));
  if(r===1){
  Fruit.addImage(FruitImage1);
  }else if(r===2){
  Fruit.addImage(FruitImage2);
  }else if(r===3){
  Fruit.addImage(FruitImage3);
  }else if(r===4){
  Fruit.addImage(FruitImage4);
  }
  
  Fruit.y=Math.round(random(50,340));
  Fruit.velocityX=-7;
  Fruit.lifetime=100;
  
  FruitGroup.add(Fruit);
}

}

function enemy(){
if(World.frameCount%200===0){
  Enemy = createSprite(400,200,20,20);
  Enemy.addAnimation("bombs?", EnemyAnimation);
  Enemy.y=Math.round(random(100,300));
  Enemy.velocityX=-8;
  Enemy.setLifeTime=50;
  
  EnemyGroup.add(Enemy);
  
}

}