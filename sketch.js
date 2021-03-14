var path, boy, cash, diamonds, jwellery, sword, gameOver;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg, endImg;
var score = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
var PLAY = 1
var END = 0
var gameState = PLAY
var hit, die;

function preload() {
  //loading all the images
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
  hit = loadSound("27568__suonho__memorymoon-space-blaster-plays.wav");
  die = loadSound("35643__sandyrb__usat-bomb.wav");

}

function setup() {

  createCanvas(600,600);
  // Moving background
  path = createSprite(600/2, 200);
  path.addImage(pathImg);
  path.velocityY = 4;

  //creating the gameOver sign
  gameOver = createSprite(300, 200, 10, 10);
  gameOver.addAnimation("d", endImg)
  gameOver.visible = false;

  //creating boy running
  boy = createSprite(300, 600, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;
  

  


  //creating groups
  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  background(0);
  //making the boy move with the mouse
  boy.x = World.mouseX;

  
  edges = createEdgeSprites();




  //code to reset the background
  if (path.y > 400) {
    path.y = height / 2;
  }

  createCash();
  createDiamonds();
  createJwellery();
  createSword();


// making it when the boy touches the objects it will dissapear
  if (gameState === PLAY) {
    boy.collide(edges);

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      score = score + 50
      hit.play();
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      score = score + 100
      hit.play();
    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      score = score + 50
      hit.play();

    } else {
      //when the boy touches sword everything stops, and gameover sign showes
      if (swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        die.play();
        gameState = END

      }
    }
  }

  if (gameState === END) {
    boy.visible = false;
    gameOver.visible = true;
    path.velocityY = 0;

    diamondsG.setVelocityYEach(0);
    cashG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);

    swordGroup.destroyEach();
    jwelleryG.destroyEach();
    diamondsG.destroyEach();
    cashG.destroyEach();


  }

  drawSprites();
  //creating the score
  textSize(20);
  fill(255);
  text("Treasure: " + score, 450, 30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(0, windowWidth), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(0, windowWidth), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
    var jwellery = createSprite(Math.round(random(0, windowWidth), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 90 == 0) {
    var sword = createSprite(Math.round(random(0, windowWidth), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}
