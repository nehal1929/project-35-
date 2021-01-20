//Create variables here
var dog,happyDog, database, foodS, foodStock, happyDogImage, dogImage,

function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png")
  happyDogImage=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500,500);
  
  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(250,300);
  dog.addImage(dogImage)
  dog.scale = 0.15

 // happyDog= createSprite(100,200);
  //happyDog.addImage(happyDogImage)

  

}


function draw() {  

  background( 46,139,87 )

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS)
    happyDog.addImage(happyDogImage)

  }
  drawSprites();

  //add styles here
  
  push();
  textSize(16);
  stroke("black");
  strokeWeight(2);
  fill("white");
  text("Note: Press UP_ARROW key to feed Milk",100,30);
  text("Food Remaining: "+foodS,170,260);
  pop();

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })
} 



