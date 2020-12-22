var db;
var pc = 0,gs = 0
var welcome;
var currentIndex = 0;
var car1,car2,cars = []
function setup(){
  db = firebase.database();
  
  createCanvas(1200,600);

  db.ref('GameState').on("value",function(data){
    gs = data.val()
  })

  db.ref('PlayerCount').on("value",function(data){
    pc = data.val()
  })
  
  input = createInput("Name")
  input.position(500,100)
  button = createButton("Play")
  button.position(500,200)
  button.mousePressed(enterPlayer)
  


  car1 = createSprite(200,590,30,30)
  car1.shapeColor = "green"

  car2 = createSprite(400,590,30,30)
  car2.shapeColor = "yellow"

  cars = [car1,car2]

  resetButton = createButton("Reset")
  resetButton.position(1000,100)
  resetButton.mousePressed(reset)
}

function draw(){
  background(180);
  
  //update gameState to 1 when 2 players are join
  if(pc===2 && gs===0){
    db.ref('/').update({GameState:1})
  }
   if(gs===1){
    drawSprites();
   }
   
  
}
function enterPlayer(){
  welcome = createElement('h2')
  welcome.position(300,200)
  var name = input.value()
  
  welcome.html("WELCOME " +name+ ". Please wait for others to join")
  input.hide()
  button.hide()

  //increase playerCount by 1 and update database
  pc++
  db.ref('/').update({PlayerCount:pc})

  //updateing the players information in database
  db.ref('Players/player'+pc).set({PlayerName:name,
  index:pc,
  y:590})
  
  currentIndex = pc
}

function reset(){
  db.ref('/').update({
    GameState : 0,
    PlayerCount : 0
  })
  db.ref('Players').remove()
}