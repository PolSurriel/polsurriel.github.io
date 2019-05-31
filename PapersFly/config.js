document.addEventListener('contextmenu', event => event.preventDefault());
Array.prototype.update = function (){
  for (let i = 0; i < this.length; i++) 
      if(this[i] != null) this[i].update();
}

Array.prototype.draw = function (){
  for (let i = 0; i < this.length; i++) 
      if(this[i] != null){
        push();
        this[i].draw();
        pop();
      } 
}


Array.prototype.debugDraw = function (){
  for (let i = 0; i < this.length; i++) 
      if(this[i] != null && this[i].debugDraw){
        push();
        this[i].debugDraw();
        pop();
      } 
}

Array.prototype.collisionReact = function (obj){
  for (let i = 0; i < this.length; i++) 
  if(this[i] != null)
    this[i].collisionReact(obj);

}

Array.prototype.destroy = function (i){


  this.casillas_libres[this.ultima_casilla_por_escribir ++] = i;
  if(this.ultima_casilla_por_escribir  >= this.length) this.ultima_casilla_por_escribir  = 0;

  this[i] = null;
  this.added--;
}

Array.prototype.addObj = function (obj){

  this.ultima_casilla_libre++;
  if(this.ultima_casilla_libre >= this.length) this.ultima_casilla_libre = 0;
  
  this[this.casillas_libres[this.ultima_casilla_libre]] = obj;
  obj.index_in_main_array = this.casillas_libres[this.ultima_casilla_libre];
  
  this.added ++;
    
}

Array.prototype.setAllNull = function (){

  this.casillas_libres = new Array(this.length);
  this.ultima_casilla_libre = 0;
  this.ultima_casilla_por_escribir = 0;

  for (let i = 0; i < this.length; i++) {
      this[i] = null;
      this.casillas_libres[i] = i;
  }
  this.added = 0;
}

Array.prototype.added = 0;
p5.disableFriendlyErrors = true; 
var FPS_COUNT = 0;
var CURRENT_FPS = 60;
var testModeActive = false;
var gameloop = {};

function drawObjects(){
  if(debug_mode){
    objectsToDraw().forEach(obj => {
      push();
      obj.draw();
      pop();
      if(obj.debugDraw){
        push();
        obj.debugDraw();
        pop();
      }
    });


    push();
    cameraTrail.draw();
    pop();

  }else {
    objectsToDraw().forEach(obj => {
      push();
      obj.draw();
      pop();
    });

  }
}
var debug_rotation = {x:0, y:0, z:0};

var CANONIC_BASE = {
  vx : new SuperVector(1,0,0),
  vy : new SuperVector(0,1,0),
  vz : new SuperVector(0,0,1)
};

var gameover = false;
