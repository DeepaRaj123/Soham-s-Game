var bg,bgImg
var gameState="START"
var zombierandomcount,level1title,level1titleImg,bullettitle,bullettitleImg,scoretitle,scoretitleImg;
var zombie,bullet1;
var zombieGroup,blast,blastImg;
var score=0,bulletcount=21,timer1=0,timer2=30;
var gamewin,gameover,gamewinImg,gameoverImg;
var gamelose = false,restart,bomb,bombImg,bombtimer=0;

function preload()
{
bgImg = loadImage("bg.jpg")
logoImg = loadImage("logoImg.png")
buttonImg = loadImage("buttonImg.png")
bg1Img = loadImage("bg1.jpeg")
plyr1Img = loadImage("plyr1.png")
zombieImg = loadAnimation("zombie.gif")
bullet1Img = loadImage("bullet1.png")
zombie1Img = loadAnimation("zombie1.gif")
zombie2Img = loadAnimation("zombie2.gif")
level1titleImg = loadImage("level1title.png")
bullettitleImg = loadImage("bulletscounttitle.png")
scoretitleImg = loadImage("coin.png")
gamewinImg = loadImage("gamewin1.png")
gameoverImg = loadImage("gameover.png");
bombImg = loadImage("bomb.png");
blastImg = loadImage("blast2.gif");

}


function setup()
{
 createCanvas(windowWidth,windowHeight);
 logoimg = createSprite(width/2,height/2,40,40)
 logoimg.addImage(logoImg)
 logoimg.scale=1.5
PlaybuttonImg = createSprite(width/2,height-70,40,40)
PlaybuttonImg.addImage(buttonImg)
PlaybuttonImg.scale=0.1
logoimg.visible=false;  
PlaybuttonImg.visible=false;
plyr1 = createSprite(246,511,40,40)
plyr1.addImage(plyr1Img)
plyr1.scale=0.7
zombieGroup=new Group()
bullet1 = createSprite(plyr1.x,457,40,40)
bullet1.addImage(bullet1Img)
bullet1.scale=0.2
bullet1.visible = false;

level1title = createSprite(width/2,100,40,40)
level1title.addImage(level1titleImg)
level1title.scale=0.2
level1title.visible = false;

scoretitle = createSprite(width-140,70,40,40)
scoretitle.addImage(scoretitleImg)
scoretitle.scale=0.135
scoretitle.visible = false;

bullettitle = createSprite(width-140,150,40,40)
bullettitle.addImage(bullettitleImg)
bullettitle.scale=0.13
bullettitle.visible = false;

gamewin = createSprite(width/2,height/2,40,40)
gamewin.addImage(gamewinImg)
gamewin.scale=0.5
gamewin.visible = false;

gameover = createSprite(width/2,height/2-50,40,40)
gameover.addImage(gameoverImg)
gameover.scale=0.35
gameover.visible = false;

restart = createSprite(width/2,height/2+120,40,40)
restart.scale=3;
restart.visible = false;

bomb = createSprite(width/3,height/2-200,40,40)
bomb.addImage(bombImg)
bomb.scale=0.35
bomb.visible = false;

blast = createSprite(width/2,height-200,40,40)
blast.addImage(blastImg);
blast.scale=3;
blast.visible = false;

}

function draw() {
 if(gameState === "START"){
  background(bgImg)
  logoimg.visible=true;
  PlaybuttonImg.visible=true;
 plyr1.visible=false;
  if(mousePressedOver(PlaybuttonImg)){
gameState = "level1"
  }
 }
 else if(gameState === "level1"){
   
   background(bg1Img);
   if(frameCount%10===0)
   {
     timer1++;
     if(timer1%5===0&&score!=20&&bulletcount!=0&&timer2!=0&&gamelose===false)
     {
       timer2--;
     }
   }
  
   logoimg.visible=false; 
   PlaybuttonImg.visible=false;
   plyr1.visible=true;
   level1title.visible = true;
   scoretitle.visible = true;
   bullettitle.visible = true;

   Zombie()
   

   if (keyDown("left")) {
    plyr1.x = plyr1.x-5;
      }

      if (keyDown("right")){
        plyr1.x = plyr1.x+5
      }

      if (keyWentDown("space")&&gamelose===false){
        bullet1 = createSprite(plyr1.x+120,457,40,40)
        bullet1.addImage(bullet1Img)
        bullet1.scale=0.2
         bullet1.velocityX=15;
         bulletcount--;

      }
for(var i=0;i<zombieGroup.length;i++){


      if(bullet1.isTouching(zombieGroup.get(i))&&gamelose===false){
            zombieGroup.get(i).destroy()
            bullet1.destroy();
            score++;
      }
    }
    if(score===20)
    {
      zombieGroup.destroyEach();
      gamewin.visible = true;
    }
    if(bulletcount===0||timer2===0)
    {
      zombieGroup.destroyEach();
      gameover.visible = true;
    }
    if(plyr1.isTouching(zombieGroup))
    {
      zombieGroup.destroyEach();
      gamelose = true;
      gameover.visible = true;  
    }
    if(score === 10)
    {
    bomb.visible = true;
    }

 }
if(mousePressedOver(restart))
{
  score=0;
  bulletcount =21;
  timer1=0;
  timer2=30;
  gameover.visible = false;
  gamelose= false;
}
if(mousePressedOver(bomb))
{
  zombieGroup.destroyEach();
  blast.visible = true;
  bulletcount = bulletcount+1;
  bombtimer++;

}
if(bombtimer>=5){
bomb.visible = false;
blast.visible = false;
}
  drawSprites();
  if(gameState==="level1"){
    textSize(40);
    textFont('Georgia');
    fill("orange");
    text(score + "/20", scoretitle.x-75,scoretitle.y+15);
    text(bulletcount, bullettitle.x-30,bullettitle.y+15);
    fill("yellow");
    text(timer2, bullettitle.x+40,bullettitle.y+15);
  }
 console.log(bombtimer);

}
function Zombie(){
  if(World.frameCount%70 === 0&&gamelose===false){
    zombie = createSprite(width,513,40,40)
zombierandomcount=Math.round(random(1,3))
switch(zombierandomcount){
  case 1 :  zombie.addAnimation("zombieAnimation",zombieImg) 
  break;
  case 2 : zombie.addAnimation("zombie1Animation",zombie1Img)
  break;
  case 3 :  zombie.addAnimation("zombie2Animation",zombie2Img)
  break;
  default:break;
}
   
    zombie.scale=0.8
    zombie.velocityX=-5.5
    zombieGroup.add(zombie)
  }
}