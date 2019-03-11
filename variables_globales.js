document.addEventListener('contextmenu', event => event.preventDefault());

// using UMI.js
var pj = new Player(-60, 0);
var cameraReference;
var score = 0;


var hexagons = Array();

// var poly = [[-10,10], [-30, 50], [40, 30], [55,31]];
var poly = [[-10,6], [-30, 50], [40, 30],[50, -10] ];

var enemies = new Array();
var enemiesAway = new Array();
var enemiesProjectiles = new Array();
var enemiesLines = new Array();
var projectiles = new Array();
var linesShoot = new Array();

var enemiesWaves = new Array();

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

var waves = new Array();

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