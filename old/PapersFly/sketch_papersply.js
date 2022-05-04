//All global variables are declared in variables_globales.js file
objectsToDraw =()=> {return [

  player, objs, cloths, Camera.reference, fractals, stickers, Global.light, winds

]};

gameloop.update = function(){
  
  //UPDATE
  cloths.update();
  player.update();
  winds.update();
  fractals.update();
  stickers.update();

  player.evalShadow(bgPlane);

  if(player.position.x > 2400){
    cloths = [];
  }

  // Global.light.position.x = Camera.reference.following.position.x;
  // Global.light.position.y = Camera.reference.following.position.y;
  // Global.light.position.z = Camera.reference.following.position.z+500;

  //COLLISION
  cloths.collisionReact(player);
  winds.collisionReact(player);



  //STATE
  if(!debug_mode && ( Camera.reference.following.currentU > Camera.reference.following.trail.lines.length-1 || SuperVector.direction(Camera.reference.following.position, player.position).getMagnitude() >1000)){
    if(!gameover) location.reload();
    gameover = true;
  }


}

gameloop.draw = function(){

  background(Global.BG.R,Global.BG.G,Global.BG.B);
  

  //UI DRAWING HERE - !!! USE UMI.px !!!
  UI.drawSettings();
  UI.context.stroke(0)
  UI.context.textSize(UMI.px(15))
  UI.context.text('ENTI-UB, AA3. Álgebra lineal y geometría - Pol Surriel y Eric Garcia',UMI.px(5),UMI.px(20))
  
  



  // PRE-OBJECTS DRAWING HERE:  
  Camera.drawSettings();



  push();
  texture(Global.papel2);
  translate(bgPlane.position.x,bgPlane.position.y,bgPlane.position.z-50);
  Brush.rotateZ(Global.rotation_debug);
  noStroke();
  plane(1200)
  pop();

  drawObjects(); 
  //POST-OBJECTS DRAWING HERE:

  
  //UI.context.strokeWeight(5)
  //UI.context.stroke(0,0,255);
  //UI.context.line(0,0,0, Camera.base.vx.x*scale, Camera.base.vx.y*scale,Camera.base.vx.z*scale);
  //UI.context.stroke(255,0,0);
  //UI.context.line(0,0,0, Camera.base.vy.x*scale, Camera.base.vy.y*scale,Camera.base.vy.z*scale);
  //UI.context.stroke(0,255,0);
  //UI.context.line(0,0,0, Camera.base.vz.x*scale, Camera.base.vz.y*scale,Camera.base.vz.z*scale);
  //UI.context.strokeWeight(1)


}
