
//All global variables are declared in variables_globales.js file

//SETUP
function setup(){

  //Crear ventana:
  createCanvas(windowWidth, windowHeight);
  UMI.setup();
  noCursor(); 

  room_setup();

  hexagon_reference = generate_hexagon_reference(-66.25, -18.8, 22, 6);

  hexagon_lado = Math.abs(hexagon_reference[5][0]-hexagon_reference[4][0]);
  hexagon_height = Math.abs(hexagon_reference[2][1]-hexagon_reference[4][1]);
  hexagon_width = Math.abs(hexagon_reference[0][0]-hexagon_reference[3][0]);

  console.log('VERSION ESTABLE 1.0');
    
}



  //gameloop  
function draw(){ 
  
  if (on_world) world_gameloop();
  else room_gameloop();


}

  










