// ALL GLOABL VARIABLES HERE :
window.Global = {};
Global.DEFAULT_FONT;
Global.airplane_model;
Global.airplane_texture;
Global.surfer_img;
Global.gravity = 1;
Global.rotation_debug = 0;
Global.default_windParticle_src;
Global.carton_texture;
Global.gray_windParticle_src;
Global.debug_cam = {
  position:{
    x:0,y:0,z:0
  },
  update:function(){},
  following:{update:function(){}},
  draw(){}
}

var aux = {
  x:2500,
  y:350,
  z:0
}
Global.light = {
  position: new SuperVector(-150+aux.x,250+aux.y,100+aux.z),
  draw(){
    push();
    Brush.translate(this.position.x, this.position.y, this.position.z);
    texture(Global.light1)
    Brush.rotateY(-debug_rotation.y)
    Brush.rotateX(-debug_rotation.x)
    Brush.rotateZ(-debug_rotation.z)
    noStroke();
    plane(1000)

    pop();
  },
  
  debugDraw: function() {
    push();
    Brush.translate(this.position.x, this.position.y, this.position.z);
    sphere(10);
    pop();
  }
}
Global.BG = {R:0, G:100, B:100};
// CONTROLES DE ESTADO
var debug_mode = window.location.host.includes('localhost');



// OBJETOS
var player;
var fractals = [];
var bgPlane = new Plane(new SuperVector(-100+aux.x,200+aux.y,-50+aux.z), new SuperVector(1,0,0), new SuperVector(0,0,1));

var cloths = [];

var pause = false;
var stickers;


// SRC
function preload() {
  Global.DEFAULT_FONT = loadFont('fuentes/timesnewarial.ttf');
  Global.airplane_model = loadModel('src/models/paper_airplane.obj');
  Global.airplane_texture = loadImage('src/textures/paper_texture.jpg');
  Global.surfer_img = loadImage('src/images/surfer.png');
  Global.shadow_textre = loadImage('src/textures/shadow_texture.png');
  Global.papel2 = loadImage('src/images/papel2.png');
  Global.light1 = loadImage('src/images/light1.png');
  
  Global.sticker1 = loadImage('src/images/sticker1.png');  
  Global.sticker2 = loadImage('src/images/sticker2.png');
  Global.sticker3 = loadImage('src/images/sticker3.png');
  Global.sticker4 = loadImage('src/images/sticker4.png');
  Global.sticker5 = loadImage('src/images/sticker5.png');
  Global.sticker6 = loadImage('src/images/sticker6.png');

  Global.default_windParticle_src = loadImage('src/images/wind_default.png');
  Global.gray_windParticle_src = loadImage('src/images/wind_gray.png')

  

  Global.carton_texture = loadImage('src/textures/carton_texture.png');
  bgPlane.texture = Global.carton_texture;

  window.onkeydown = playing_onkeydown;
  window.onkeyup = playing_onkeyup;

}

// SETUP
function setup(){


  // EVENTOS
  window.onmousedown = playing_onmousedown;
  window.onmouseup = playing_onmouseup;
  window.onkeydown = playing_onkeydown;
  window.onkeyup = playing_onkeyup;

  // INICIALIZACIÓN DE OBJETOS
  
  // fractal1
  var f = new Fractal(new SuperVector(10,10,-800), 1000,1000, 0.5, TAU);
  f.drawingContext.strokeWeight(4);

  f.drawingContext.stroke(200, 100, 0);  
  f.drawingContext.line(-400,400,400,400);
  f.drawingContext.line(0,0,00,400);
  f.i = f.angleIN; 
  f.update = function (){
    this.i += 0.001;
    
    this.angle = this.i;
    this.angleOUT = TAU/this.i;
  }
  fractals.push(f);

  // fractal2
  f = new Fractal(new SuperVector(4400,150,-1000), 1000,1000, -1000, TAU);
  f.drawingContext.strokeWeight(4);
  f.drawingContext.stroke(200);  
  f.drawingContext.line(0,0,400,400);
  f.drawingContext.line(0,0,00,400);
  f.i = 0.5; 
  f.update = function (){
    this.i += 0.001;
    this.angle = this.i;
    this.angleOUT = TAU/this.i;
  }
  fractals.push(f);


  // fractal3
  f = new Fractal(new SuperVector(800,750,-850), 1000,1000, TAU/24, TAU);
  f.drawingContext.strokeWeight(4);

  f.drawingContext.stroke(180);
  f.drawingContext.line(0,200,250,325);
  f.drawingContext.line(0,200,-250,325);
  f.drawingContext.line(0,0,0,400);

  f.i = f.angleIN; 
  f.update = function (){
    this.i += 0.001;
    
    this.angle = this.i;
    this.angleOUT = TAU/this.i;
  }
  //fractals.push(f);

  // fractal4
  f = new Fractal(new SuperVector(8000,750,-850), 1000,1000, TAU/24, TAU);
  f.drawingContext.strokeWeight(4);

  f.drawingContext.stroke(180);
  f.drawingContext.line(0,200,250,325);
  f.drawingContext.line(0,200,-250,325);
  f.drawingContext.line(0,0,0,400);

  f.i = f.angleIN; 
  f.update = function (){
    this.i += 0.001;
    
    this.angle = this.i;
    this.angleOUT = TAU/this.i;
  }
  fractals.push(f);

  // fractal5
  f = new Fractal(new SuperVector(10800,4110,800), 1000,1000, TAU/48, TAU);
  f.drawingContext.strokeWeight(4);

  f.drawingContext.stroke(200,180,180);
  f.drawingContext.line(0,0,0,400);
  f.drawingContext.line(0,50,20,350);
  f.drawingContext.line(0,100,40,300);
  f.drawingContext.line(0,150,60,250);

  f.i = f.angleIN; 
  f.update = function (){
    this.i += 0.0003;
    
    this.angle = this.i;
    this.angleOUT = TAU/this.i;
  }
  fractals.push(f);


  player = new AirPlane (0,-500,0);
  winds = [];
  objs = [];

  stickers = [
    new Sticker(new SuperVector(6700,0,400), new SuperVector(1.3,0,0), 5, 'Global.sticker1'),
    new Sticker(new SuperVector(3520,60,-200), new SuperVector(0,0,0), 5, 'Global.sticker2'),
    new Sticker(new SuperVector(8700,3080,-200), new SuperVector(0,1,0), 3, 'Global.sticker3'),
    new Sticker(new SuperVector(6700,0,-1000), new SuperVector(-1.3,0,0), 10, 'Global.sticker4'),
    new Sticker(new SuperVector(11500,3900,0), new SuperVector(0,TAU/4,0), 20, 'Global.sticker5'),
    new Sticker(new SuperVector(750,-75,-190), new SuperVector(-TAU/16,-TAU/16,0), 2, 'Global.sticker6')  ];
  
  
  Camera.reference = new FollowerReference( new TrailFollower(player, cameraTrail));
  UI.context = createGraphics(windowWidth, windowHeight);


  winds.push(new Wind(1,{x:4158.209071138042,y:1058.5502783195477},{x:3542.6274275948194,y:460.8981972096223}));
  winds.push(new Wind(1,{x:2263.6590232008193,y:1226.7159296998047},{x:3555.1211363278208,y:140.5018955482575}));
  winds.push(new Wind(1,{x:7775.348204608089,y:2332.855331965705},{x:7925.61501357287,y:1736.9108282303791}));
  

  cloths.push(new Cloth(new SuperVector(1200,300,200), 10, 1000, 1000,0,-1,0));
  // AJUSTES
  createCanvas(windowWidth, windowHeight, WEBGL);

  UMI.setup(); 

  setInterval(() => {
    CURRENT_FPS = (FPS_COUNT-1)*10;
    FPS_COUNT = 1;
  }, 100);

  if(debug_mode)
    setDebugMode();

  noCursor();
   
}











  

