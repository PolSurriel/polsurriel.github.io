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

var pu_1_w = new Wiggle(-210,80,1);
var pu_1_w_l2 = new Wiggle(-210,80,3);

var pu_2_w = new Wiggle(-18,80,1);
var pu_2_w_l2 = new Wiggle(-18,80,3);

var pu_3_w = new Wiggle(172,80,1);
var pu_3_w_l2 = new Wiggle(172,80,3);

var pu_4_w = new Wiggle(-120,180,1);
var pu_4_w_l2 = new Wiggle(-120,180,3);

var pu_5_w = new Wiggle(80,180,1);
var pu_5_w_l2 = new Wiggle(80,180,3);


// var poly = [[-10,10], [-30, 50], [40, 30], [55,31]];
var poly = [[-10,6], [-30, 50], [40, 30],[50, -10] ];

var hexagons = Array(30);
var enemies = new Array(60);
var enemiesAway = new Array(60);
var enemiesProjectiles = new Array(60);
var enemiesLines = new Array(60);
var projectiles = new Array(60);
var linesShoot = new Array(60);
var enemiesWaves = new Array(60);
var waves = new Array(60);
var particles = new Array(100);

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
var power_up_speed_img_layer_1;
var power_up_speed_img_layer_2;
var power_up_duplicate_img_layer_1;
var power_up_duplicate_img_layer_2;
var power_up_health_img_layer_1;
var power_up_health_img_layer_2;
var power_up_random_img_layer_1;
var power_up_random_img_layer_2;
var power_up_shield_img_layer_1;
var power_up_shield_img_layer_2;
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
    power_up_speed_img_layer_1 = loadImage('./src/power_up_speed_layer_1.png');
    power_up_speed_img_layer_2 = loadImage('./src/power_up_speed_layer_2.png');
    power_up_duplicate_img_layer_1 = loadImage('./src/power_up_duplicate_layer_1.png'); 
    power_up_duplicate_img_layer_2 = loadImage('./src/power_up_duplicate_layer_2.png'); 
    power_up_health_img_layer_1 = loadImage('./src/power_up_health_layer_1.png');
    power_up_health_img_layer_2 = loadImage('./src/power_up_health_layer_2.png');
    throne_img = loadImage('./src/throne.png'); 
    bg_texture = loadImage('./src/bg_texture.png');

    power_up_random_img_layer_1= loadImage('./src/power_up_random_layer_1.png');
    power_up_random_img_layer_2= loadImage('./src/power_up_random_layer_2.png');
    power_up_shield_img_layer_1= loadImage('./src/power_up_shield_layer_1.png');
    power_up_shield_img_layer_2= loadImage('./src/power_up_shield_layer_2.png');
  
  }

  


  var on_world = false;

  var portal_abierto = false;

  var portal_x;
  var portal_y;