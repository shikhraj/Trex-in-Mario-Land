
var backgroundImg,canvas,playerImg,groundImg,ground,player,invisibleGround;
var enemyGroup,enemy,enemyAnim,pipesImg,cloudsimg,coinimg;
var score = 1;
var pipes;
var coinCount = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart;
var marioDead;
var gameOver,instructions;
var instructions1;
var mariohead;
var marioheadimg;


function preload(){
    backgroundImg = loadImage("bg.png");
    playerImg = loadAnimation("trex_1.png","trex_2.png", "trex_3.png");
    //playerdeadImg = loadImage("mario_dead.png");
    groundImg = loadImage("ground.png");
enemyAnim = loadAnimation("enemy1.png", "enemy2.png");
pipesImg = loadImage("pipes.png");
cloudsimg = loadImage("cloud.png");
coinimg = loadImage("coin.png");
bulletImg = loadImage("bullet.png");
restartImg = loadImage("restart.png");
marioDead = loadAnimation("trex_collided.png");
gameOverImg = loadImage("gameOver.png");
instructionsImg = loadImage("text.png");
marioheadimg = loadImage("mario-head.png");
}



function setup(){
    player = createSprite(50,displayHeight-200,50,50);
ground = createSprite(displayWidth/2-30,displayHeight - 145,displayWidth,20);
canvas = createCanvas(displayWidth-60,displayHeight-115);

player.addAnimation("mario",playerImg);
player.addAnimation("mariodead",marioDead);
player.scale = 0.1;
ground.addImage(groundImg);

invisibleGround = createSprite(displayWidth/2-30,displayHeight-158,displayWidth,20);
invisibleGround.visible = false;
restart = createSprite(displayWidth/2,displayHeight/4);
restart.addImage(restartImg);
restart.scale = 0.3;
restart.visible = false;

gameOver = createSprite(displayWidth/2,displayHeight/6);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.3;
gameOver.visible = false;


instructions1 = createSprite(displayWidth-200, 30);
instructions1.addImage(instructionsImg);
instructions1.scale = 0.5





enemyGroup = createGroup();
pipesGroup = createGroup();
coinGroup = createGroup();
cloudsGroup = createGroup();
bulletGroup = createGroup();


}
function draw(){
    background(backgroundImg);
    fill("black");
    textSize(26);
    text("SCORE : " + score, 40,25);
    
    if(gameState == PLAY){
        ground.velocityX = -7;
        if(ground.x < 0 ){
            ground.x = ground.width/2;
        }
        if(keyDown(UP_ARROW) && player.isTouching(ground)){
            player.velocityY = -20;
        }
        player.velocityY = player.velocityY + 0.8;
        if(enemyGroup.isTouching(player)){
            score -= 1;
            gameState = END;
          }
          if(keyDown("space")){
            bullet = createSprite(player.x,player.y,20,10);
            bullet.addImage(bulletImg);
            bullet.velocityX = 4;
    bulletGroup.add(bullet);
          }
          if(bulletGroup.isTouching(enemyGroup)){
            bulletGroup.destroyEach();
            enemyGroup.destroyEach();
        }
        for(var j = 0;j<coinGroup.length;j++){
            if(coinGroup.isTouching(player)){
                coinGroup.get(j).destroy();
                coinCount += 1;
                score += 1;
                
            }
        }
        if(pipesGroup.isTouching(player)){
            score -= 1;
            gameState = END;

        }
        
        spawnPipes();
    spawnClouds();
    spawnCoins();
    spawnEnemy();
    }

    if(gameState == END){
        restart.visible = true;
        gameOver.visible = true;
        ground.velocityX = 0;
        cloudsGroup.setVelocityXEach(0);
        pipesGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);

        cloudsGroup.setLifetimeEach(-1);
        coinGroup.setLifetimeEach(-1);
        enemyGroup.setLifetimeEach(-1);
        pipesGroup.setLifetimeEach(-1);

        player.velocityY = 0;
        player.changeAnimation("mariodead",marioDead);
        if(mousePressedOver(restart)){
            gameState = PLAY;
            pipesGroup.destroyEach();
            coinGroup.destroyEach();
            cloudsGroup.destroyEach();
            enemyGroup.destroyEach();

            restart.visible = false;
            gameOver.visible = false;
            player.changeAnimation("mario",playerImg);
            score = 1;
            coinCount = 0;
            
        }


    }
    
    
    
    
   
    player.collide(invisibleGround);
    
   
    
      
      
      
      
   
    
    drawSprites();
    text("YOUR COIN COUNT : "+ coinCount,displayWidth/2,50);

}
function spawnEnemy(){
    if(frameCount % 300 === 0){
        var enemy = createSprite(displayWidth, displayHeight-200, 50,50);
        enemy.velocityX = -4;
        enemy.addAnimation("enemy",enemyAnim);
        enemy.scale = 0.15;
        enemyGroup.add(enemy);
        enemy.lifetime = 342;
        enemy.velocityX = -7;
    }


}
function spawnPipes(){ 
    if(frameCount %90 === 0){ 
        pipes = createSprite(displayWidth,displayHeight-220,10,10); 
        pipes.addImage("pipes",pipesImg); 
        pipes.velocityX = -7; 
        pipes.scale = 0.5; 
        pipes.lifetime = 342; 
        pipesGroup.add(pipes); 
    } 
}
function spawnClouds(){ 
    if(frameCount %100 === 0){ 
        clouds = createSprite(1200,random(50,150),10,10); 
        clouds.addImage("clouds",cloudsimg); 
        clouds.velocityX = -3; 
        clouds.scale = 2; 
        clouds.lifetime = 542; 
        cloudsGroup.add(clouds); 
    } 
}
function spawnCoins(){ 
    if(frameCount%200 === 0){ 
        for(var i=0 ; i<5 ;i++){ 
            coin = createSprite(displayWidth+i*20,displayHeight/2+30 ,10,10); 
            coin.addImage("coin",coinimg); 
            coin.velocityX = -4; 
            coin.lifetime = 432; 
            coinGroup.add(coin); 
        } 
    } 
}