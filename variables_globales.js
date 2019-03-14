Array.prototype.update = function (){
  for (let i = 0; i < this.length; i++) 
      if(this[i] != null) this[i].update();
}

Array.prototype.draw = function (){
  for (let i = 0; i < this.length; i++) 
      if(this[i] != null) this[i].draw();
}

Array.prototype.destroy = function (i){
  this[i] = null;
  this.added--;
}

Array.prototype.addObj = function (obj){
  
  for (let i = 0; i < this.length; i++){
      if(this[i] == null){
          this[i] = obj;
          this.added ++;
          break;
      }

  } 
}

Array.prototype.setAllNull = function (){
  for (let i = 0; i < this.length; i++) {
      this[i] = null;
  }
  this.added = 0;
}

Array.prototype.added = 0;

document.addEventListener('contextmenu', event => event.preventDefault());

// using UMI.js
var pj = new Player(-60, 0);
var cameraReference;
var score = 0;



// var poly = [[-10,10], [-30, 50], [40, 30], [55,31]];
var poly = [[-10,6], [-30, 50], [40, 30],[50, -10] ];

var hexagons = Array(100);
var enemies = new Array(100);
var enemiesAway = new Array(100);
var enemiesProjectiles = new Array(100);
var enemiesLines = new Array(100);
var projectiles = new Array(100);
var linesShoot = new Array(100);
var enemiesWaves = new Array(100);
var waves = new Array(100);
var particles = new Array(400);

enemies.setAllNull();
enemiesAway.setAllNull();
enemiesProjectiles.setAllNull();
enemiesLines.setAllNull();
projectiles.setAllNull();
linesShoot.setAllNull();
enemies.setAllNull();
enemiesWaves.setAllNull();
waves.setAllNull();
hexagons.setAllNull();
particles.setAllNull();


var pu_count = 0;
var hunted = 0;


var ball;

var dificultad = 1;

var game_over = false;
var game_over_speed;
var game_over_default_speed;
var game_over_status;

var hay_portal = false;
var portal_X;
var portal_y;


//Hexagons:
var hexagon_reference;
var hexagon_lado;
var hexagon_height;
var hex_reg_x = 1.5;
var hex_reg_y = 0.82;

//src's:
var music;
var room_music;
var bg;
var bg_room;
var bg_texture;
var stairs;
var power_up_speed_img;
var power_up_duplicate_img;
var power_up_health_img
var power_up_random_img;
var power_up_shield_img;
var throne_img;
var power_up_sound;
var button_red_img;
var stairs_2;



var world_gameloop_phase = 1;

var alone = false;

var display_controls = false;

var distance_to_destroy = 1000;

function preload() {
    power_up_sound = new Sound('./src/get_power_up.mp3',1);
    music = new Sound('./src/disco-shmisco.mp3',0.5);
    room_music = new Sound('./src/room_music.mp3',0.5);;
    bg_room = loadImage('./src/bg_room_texture.png',100,100);
    pj.loadAssets();
    stairs = loadImage('./src/stairs.png');
    stairs_2 = loadImage('./src/stairs_2.png');
    power_up_speed_img = loadImage('./src/power_up_speed.png');
    power_up_duplicate_img = loadImage('./src/power_up_duplicate.png'); 
    power_up_health_img = loadImage('./src/power_up_health.png');
    throne_img = loadImage('./src/throne.png'); 
    bg_texture = loadImage('./src/bg_texture.png');

    power_up_random_img= loadImage('./src/power_up_random.png');
    power_up_shield_img= loadImage('./src/power_up_shield.png');
  
  }

  


  var on_world = false;

  var portal_abierto = false;

  var portal_x;
  var portal_y;