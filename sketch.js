const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var fundo
var torre
var torreImg
var canhao
var angle=20
var bala
var balas=[]
var barco
var barcos=[]
var barcoanime=[]
var barcospritedata,barcospritesheet
var quebradoanime=[]
var quebradospritedata,quebradospritesheet
var respingoanime=[]
var respingospritedata,respingospritesheet
var somdefundo
var somderisada
var somdeagua
var somdeexplosao

function preload() {
 fundo=loadImage("assets/background.gif")
 torreImg=loadImage("assets/tower.png")
 barcospritedata=loadJSON("assets/boat/boat.json")
 barcospritesheet=loadImage("assets/boat/boat.png")
 quebradospritedata=loadJSON("assets/boat/broken_boat.json")
 quebradospritesheet=loadImage("assets/boat/broken_boat.png")
 respingospritedata=loadJSON("assets/water_splash/water_splash.json")
 respingospritesheet=loadImage("assets/water_splash/water_splash.png")
 somdefundo=loadSound("assets/background_music.mp3")
 somderisada=loadSound("assets/pirate_laugh.mp3")
 somdeagua=loadSound("assets/cannon_water.mp3")
 somdeexplosao=loadSound("assets/cannon_explosion.mp3")
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  
 options={
 isStatic:true
 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);
 torre=Bodies.rectangle(160,350,160,310,options)
 World.add(world,torre);
 canhao=new Canhao(160,110,130,100,angle)
 barco=new Barco (width-79,height-60,170,170,-80)
 var barcoframe=barcospritedata.frames
 for(var i=0;i<barcoframe.length;i++){
  var pos=barcoframe[i].position
  var img= barcospritesheet.get(pos.x,pos.y,pos.w,pos.h)
  barcoanime.push(img)
 }
 var quebradoframes=quebradospritedata.frames
 for (var i=0; i<quebradoframes.length;i++){
  var pos=quebradoframes[i].position
  var img=quebradospritesheet.get(pos.x,pos.y,pos.w,pos.h)
  quebradoanime.push(img)
 }
 var respingoframes=respingospritedata.frames
 for(var i=0;i<respingoframes.length;i++){
 var pos=respingoframes[i].position
 var img=respingospritesheet.get(pos.x,pos.y,pos.w,pos.h)
 respingoanime.push(img)
 
}}

function draw() {
  background(189);
  image(fundo,0,0,1200,600)
  Engine.update(engine);
 if(!somdefundo.isPlaying()){
  somdefundo.play()
  somdefundo.setVolume(0.1)
 }
 rect(ground.position.x, ground.position.y,width*2,1);
 push()
 imageMode(CENTER)
 image (torreImg,torre.position.x, torre.position.y,160,310)
 pop()
 canhao.display()
 Matter.Body.setVelocity(barco.body,{x:-0.9,y:0})
 showBarcos()
 for(var i=0;i<balas.length;i++){
  showBalas(balas[i],i)
  colisaobarcos(i)
 }
}
function keyPressed(){
  if(keyCode===DOWN_ARROW){
  bala=new Baladecanhao(canhao.x,canhao.y)
  balas.push(bala)
  }
}
function keyReleased(){
  if(keyCode===DOWN_ARROW){
    balas[balas.length-1].atirar()
    somdeexplosao.play()
  }
}
function showBalas(bala,index){
  if(bala){
    bala.display()
    bala.animate()
    if(bala.body.position.x>= width || bala.body.position.y>=height-50){
      if(!bala.isSink&& !somdeagua.isPlaying()){
        somdeagua.play()
      bala.remove(index)}
    }
  }
}
function showBarcos(){
  if(barcos.length>0){
    if(barcos[barcos.length-1]===undefined||barcos[barcos.length-1].body.position.x<width-300){
      var posiçoes=[-40,-60,-70,-20]
      var position=random(posiçoes)
      var barco=new Barco(width, height-100,170,170,position,barcoanime)
      barcos.push(barco)
    }
    for (var i=0;i<barcos.length;i++){
      if(barcos[i]){
        Matter.Body.setVelocity(barcos[i].body,{x:-0.9,y:0})
        barcos[i].display()
        barcos[i].animate()
        var colisao=Matter.SAT.collides(torre,barcos[i].body)
        if(colisao.collided && !barcos[i].isBroken){
          isGameOver=true
          gameover()
        }
      }
    }
  }
  else{
    var barco=new Barco(width,height -60 , 170, 170,-60,barcoanime)
    barcos.push(barco)
  }
}
function colisaobarcos(index){
  for(var i=0;i<barcos.length;i++){
    if(balas[index]!== undefined && barcos[i]!== undefined){
    var colisao=Matter.SAT.collides(balas [index].body,barcos[i].body)
    if(colisao.collided){
      barcos[i].remove(i)
      Matter.World.remove(world,balas[index].body)
      delete balas[index]
    }
    }
  }
}
function gameover(){
  swal({
    title:` FIM DE JOGO`,
    text:"obrigado por jogar", 
    imageUrl:"https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize:"150x150",
    confirmButtonText:"jogar novamente"
  },
  function(isConfirm){
    if(isConfirm){location.reload()}
  })
}