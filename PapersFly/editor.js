function loadTrail(){
  curvasCreadas = cameraTrail.lines;
}

var velExtra = 0;
var onFixPlayer = null

function exportAsInterpolation(){


    var r = 'trail = new Trail();\n';
   
    for (let i = 0; i < curvasCreadas.length; i++) {
      
      r += `\ntrail.addLine(new Interpolation({x:`+curvasCreadas[i].Px(0)+`, y:`+curvasCreadas[i].Py(0)+`, z:`+curvasCreadas[i].Pz(0)+`,},{x:`+curvasCreadas[i].Px(1/3)+`, y:`+curvasCreadas[i].Py(1/3)+`, z:`+curvasCreadas[i].Pz(1/3)+`,},{x:`+curvasCreadas[i].Px(2/3)+`, y:`+curvasCreadas[i].Py(2/3)+`, z:`+curvasCreadas[i].Pz(2/3)+`,},{x:`+curvasCreadas[i].Px(1)+`, y:`+curvasCreadas[i].Py(1)+`, z:`+curvasCreadas[i].Pz(1)+`,}));`
    }
   
    console.log(r);
   
   }
  
   
   function exportAsBezier(){

    var r = 'trail = new Trail();\n';
   
    for (let i = 0; i < curvasCreadas.length; i++) {
      r += `\ntrail.addLine(new Bezier({x:`+curvasCreadas[i].p1.x+`, y:`+curvasCreadas[i].p1.y+`, z:`+curvasCreadas[i].p1.z+`,},{x:`+curvasCreadas[i].p2.x+`, y:`+curvasCreadas[i].p2.y+`, z:`+curvasCreadas[i].p2.z+`,},{x:`+curvasCreadas[i].p3.x+`, y:`+curvasCreadas[i].p3.y+`, z:`+curvasCreadas[i].p3.z+`,},{x:`+curvasCreadas[i].Px(1)+`, y:`+curvasCreadas[i].Py(1)+`, z:`+curvasCreadas[i].Pz(1)+`,}));`
    }
   
    console.log(r);
   
   }

   var creatingCurves = false;
   var creatingWinds = false;
   var camMode = false;

function setCreatingStateFalse(){
  creatingCurves = false;
  creatingWinds = false;
}

function createCurve(){
  setCreatingStateFalse();
  creatingCurves = true;
}

function createWind(){
  setCreatingStateFalse();
  creatingWinds = true;

}

function exportWinds(){
  var r = '';

  for (let i = 0; i < windsCreated.length; i++) {
    r += 'winds.push(new Wind('+windsCreated[i].forceMagnitude+',{x:'+windsCreated[i].point1.x+',y:'+windsCreated[i].point1.y+'},{x:'+windsCreated[i].point2.x+',y:'+windsCreated[i].point2.y+'}));\n';
  }

  console.log(r);

  
}



function setDebugMode(){
     //Camera.reference = player;
     //Camera.reference = Global.debug_cam;
   }
   var pointsOnCreateCurve = [];
   var curvasCreadas = [];
   var creando = false;

   var airplaneGrabbed = false;
   var listen = true;

   function debugUpdate() {

    var newBase = {
      vx:CANONIC_BASE.vx.copy(),
      vy:CANONIC_BASE.vy.copy(),
      vz:CANONIC_BASE.vz.copy()

    }


    newBase.vx.rotateX(debug_rotation.x); 
    newBase.vx.rotateY(debug_rotation.y);
    newBase.vx.rotateZ(debug_rotation.z);

    newBase.vy.rotateX(debug_rotation.x);
    newBase.vy.rotateY(debug_rotation.y);
    newBase.vy.rotateZ(debug_rotation.z);
    
    newBase.vz.rotateX(debug_rotation.x);
    newBase.vz.rotateY(debug_rotation.y);
    newBase.vz.rotateZ(debug_rotation.z);




    Camera.base = {
      vx:newBase.vx,
      vy:newBase.vy,
      vz:newBase.vz

    }




    if(Mouse.left.clicked){
      var mousePos = {x:UMI.umi(mouseX-width/2)+UMI.umi(Global.debug_cam.position.x), y:UMI.umi(mouseY-height/2)+UMI.umi(Global.debug_cam.position.y),z:Global.debug_cam.z};

      if(Collider.detector.pointToCircle(mousePos.x, mousePos.y,player.position.x,player.position.y,50)){
        airplaneGrabbed = true;
      }

    }else {
      airplaneGrabbed = false;
    }

    if(airplaneGrabbed){
      
      var logicMousePos = {x:UMI.px(mouseX-width/2)+Global.debug_cam.position.x, y:UMI.px(mouseY-height/2)+Global.debug_cam.position.y,z:0};
      onFixPlayer = {}
      onFixPlayer.x = logicMousePos.x;
      onFixPlayer.y = logicMousePos.y;
      onFixPlayer.z = 0;
    }

    if(onFixPlayer != null) {
      player.position = new SuperVector(onFixPlayer.x, onFixPlayer.y, onFixPlayer.z);
      
    }

    if(!camMode){
      Global.debug_cam.position.x = Camera.reference.position.x;
      Global.debug_cam.position.y = Camera.reference.position.y;
      Global.debug_cam.position.z = Camera.reference.position.z;
    }

   
    Global.rotation_debug += 0.01;

    if(Keyboard.jump.pressed){
      if(listen){

        if(!camMode){
          
          Camera.zoom = UMI.umi(1);
          Camera.reference = Global.debug_cam;
          onFixPlayer = player.position;
          camMode = true;

        }else {
          setCreatingStateFalse();
          Camera.zoom = 1;
          Camera.reference = new FollowerReference( new TrailFollower( player, cameraTrail ) );
          
          minDist = Number.MAX_SAFE_INTEGER;
          minDistU = 0;
          for (let u = 0; u < Camera.reference.following.trail.lines.length; u+=1/10) {
            var dist =  Camera.reference.following.trail.getPoint(u).distance( Camera.reference.following.reference.position);
            if(dist < minDist){
                minDist = dist;
                minDistU = u;
            }
        }
          
          Camera.reference.following.currentU = minDistU;

          Camera.reference.following.trail.getPoint(minDistU)
 
          Camera.reference.position = Camera.reference.following.trail.getPoint(minDistU); 
          onFixPlayer = null;
          camMode = false; 

        }

        listen = false;
        setTimeout(() => {
          listen = true;
        }, 500);
      }
       
    }



     var incMov = 4+velExtra;
     var velExtraInc = 0.05;
     var maxVelExtra = 7.5;
     var resetVelExtra = true;


     if(Keyboard.R.pressed){

      var speed = 0.05;


      if(Keyboard.Z.pressed){

        if(Keyboard.right.pressed){
          debug_rotation.z += Math.abs(Camera.base.vz.y*speed);
          debug_rotation.z += Math.abs(Camera.base.vz.x*speed);
          debug_rotation.z += Math.abs(Camera.base.vz.z*speed);
        }
      
        if(Keyboard.left.pressed){
          debug_rotation.z -= Math.abs(Camera.base.vz.y*speed);
          debug_rotation.z -= Math.abs(Camera.base.vz.x*speed);
          debug_rotation.z -= Math.abs(Camera.base.vz.z*speed);
          
        }
      }else {

      

      if(Keyboard.left.pressed){


        debug_rotation.y += Math.abs(Camera.base.vy.y*speed);
        debug_rotation.y += Math.abs(Camera.base.vy.x*speed);
        debug_rotation.y += Math.abs(Camera.base.vy.z*speed);

      }

      if(Keyboard.right.pressed){

        debug_rotation.y -= Math.abs(Camera.base.vy.y*speed);
        debug_rotation.y -= Math.abs(Camera.base.vy.x*speed);
        debug_rotation.y -= Math.abs(Camera.base.vy.z*speed);


      }
    
      if(Keyboard.down.pressed){
        //+
        debug_rotation.x += Math.abs(Camera.base.vx.y*speed);
        debug_rotation.x += Math.abs(Camera.base.vx.x*speed);
        debug_rotation.x += Math.abs(Camera.base.vx.z*speed);


      }
    
      if(Keyboard.up.pressed){
        //-        
        debug_rotation.x -= Math.abs(Camera.base.vx.y*speed);
        debug_rotation.x -= Math.abs(Camera.base.vx.x*speed);
        debug_rotation.x -= Math.abs(Camera.base.vx.z*speed);




      }
    }
    
      

     }else if(Keyboard.Z.pressed){

      if(Keyboard.down.pressed){
        if(velExtra < maxVelExtra)velExtra += velExtraInc;
        Global.debug_cam.position.x+= Camera.base.vz.x*incMov;
        Global.debug_cam.position.y+= Camera.base.vz.y*incMov;
        Global.debug_cam.position.z+= Camera.base.vz.z*incMov;
        resetVelExtra = false;
      }
    
      if(Keyboard.up.pressed){
        if(velExtra < maxVelExtra)velExtra += velExtraInc;
        Global.debug_cam.position.x-= Camera.base.vz.x*incMov;
        Global.debug_cam.position.y-= Camera.base.vz.y*incMov;
        Global.debug_cam.position.z-= Camera.base.vz.z*incMov;
        resetVelExtra = false;
      }

     }else {

      if(Keyboard.left.pressed){
        if(velExtra < maxVelExtra)velExtra += velExtraInc;
        Global.debug_cam.position.x-= Camera.base.vx.x*incMov;
        Global.debug_cam.position.y-= Camera.base.vx.y*incMov;
        Global.debug_cam.position.z-= Camera.base.vx.z*incMov;
        resetVelExtra = false;
      }
    
      if(Keyboard.down.pressed){
        if(velExtra < maxVelExtra)velExtra += velExtraInc;
        Global.debug_cam.position.x+= Camera.base.vy.x*incMov;
        Global.debug_cam.position.y+= Camera.base.vy.y*incMov;
        Global.debug_cam.position.z+= Camera.base.vy.z*incMov;
        resetVelExtra = false;
      }
    
      if(Keyboard.up.pressed){
        if(velExtra < maxVelExtra)velExtra += velExtraInc;
        Global.debug_cam.position.x-= Camera.base.vy.x*incMov;
        Global.debug_cam.position.y-= Camera.base.vy.y*incMov;
        Global.debug_cam.position.z-= Camera.base.vy.z*incMov;
        resetVelExtra = false;
      }
    
      if(Keyboard.right.pressed){
        if(velExtra < maxVelExtra)velExtra += velExtraInc;
        Global.debug_cam.position.x+= Camera.base.vx.x*incMov;
        Global.debug_cam.position.y+= Camera.base.vx.y*incMov;
        Global.debug_cam.position.z+= Camera.base.vx.z*incMov;
        
        resetVelExtra = false;
      }
    }

    if(resetVelExtra){
      velExtra = 0;
    }
    
   
     if(creatingCurves){
      creatingCurvesUpdate();
     }else if (creatingWinds){
      creatingWindUpdate();
     }


   }

   var pointsOnCreateWind = [];
   var windsCreated = [];
   var creator_windForce = 1;
   
   function creatingWindUpdate(){
     
    if(Mouse.left.clicked && !creando){
      creando = true;
      var mousePos = {x:UMI.umi(mouseX-width/2)+Global.debug_cam.position.x, y:UMI.umi(mouseY-height/2)+Global.debug_cam.position.y,z:0};
      pointsOnCreateWind.push(mousePos);

    }else if (!Mouse.left.clicked && creando){
      creando = false;      

    }


    if(pointsOnCreateWind.length == 2){
      winds.push(new Wind(creator_windForce, pointsOnCreateWind[0],pointsOnCreateWind[1]));
      windsCreated.push(new Wind(creator_windForce, pointsOnCreateWind[0],pointsOnCreateWind[1]));
      pointsOnCreateWind = [];

    }


    fill(255)
    for (let i = 0; i < pointsOnCreateWind.length; i++) {      
      ellipse(UMI.px(pointsOnCreateWind[i].x-Global.debug_cam.position.x),UMI.px(pointsOnCreateWind[i].y-Global.debug_cam.position.y), 10,10);
    }


   }

   creator_objectPrecision = 5;

   function exportAsObject(){

    var trail = new Trail();
   
    for (let i = 0; i < curvasCreadas.length; i++) 
      trail.addLine(new Bezier({
                                  x:curvasCreadas[i].p1.x, 
                                  y:curvasCreadas[i].p1.y, 
                                  z:curvasCreadas[i].p1.z
                                },
                                
                                {
                                  x:curvasCreadas[i].p2.x, 
                                  y:curvasCreadas[i].p2.y, 
                                  z:curvasCreadas[i].p2.z,
                                },
                                {
                                  x:curvasCreadas[i].p3.x, 
                                  y:curvasCreadas[i].p3.y, 
                                  z:curvasCreadas[i].p3.z,
                                },
                                {
                                  x:curvasCreadas[i].p4.x, 
                                  y:curvasCreadas[i].p4.y, 
                                  z:curvasCreadas[i].p4.z,
                                }));
    
                                  
    var r = 'obj = new PolygonalObject ([';
    var poly = [];
    
    for (let i = 0; i < trail.lines.length; i++) {
      for (let u = 0; u < 1; u+= 1/creator_objectPrecision) {
        var point = trail.getPoint(u+i);        
        r += '{x:'+point.x+', y:'+point.y+', z:'+point.z+'},';
        poly.push(point);
      }
    }
    r += '], TRIANGULAR);';  

    objs.push(new PolygonalObject(poly,TRIANGULAR));

    console.log(r);

   }

   function creatingCurvesUpdate(){
     
    if(Mouse.left.clicked && !creando){
      creando = true;
      
      //var mousePos = {x:UMI.umi(mouseX-width/2)+Global.debug_cam.position.x, y:UMI.umi(mouseY-height/2)+Global.debug_cam.position.y,z:0};
      var mousePos = {x:UMI.umi(mouseX-width/2)+Global.debug_cam.position.x, y:UMI.umi(mouseY-height/2)+Global.debug_cam.position.y,z:Global.debug_cam.z};
      for (let i = 0; i < curvasCreadas.length; i++) {
  
        
        if(Collider.detector.pointToCircle(mousePos.x, mousePos.y,curvasCreadas[i].p1.x,curvasCreadas[i].p1.y,20)){
          if(i == 0)
          window.onmousemove = function (){
            eval(`
            
              curvasCreadas[`+i+`].p1 = {x:UMI.umi(mouseX-width/2)+Global.debug_cam.position.x, y:UMI.umi(mouseY-height/2)+Global.debug_cam.position.y,z:Global.debug_cam.z};
              curvasCreadas[`+i+`].setCoefficient();
              pointsOnCreateCurve = [];
  
            `);
          }
          else
          window.onmousemove = function (){
            eval(`
            
            curvasCreadas[`+i+`].p1 = {x:UMI.umi(mouseX-width/2)+Global.debug_cam.position.x, y:UMI.umi(mouseY-height/2)+Global.debug_cam.position.y,z:Global.debug_cam.z};
            curvasCreadas[`+i+`].setCoefficient();
            curvasCreadas[`+(i-1)+`].p4 = {x:UMI.umi(mouseX-width/2)+Global.debug_cam.position.x, y:UMI.umi(mouseY-height/2)+Global.debug_cam.position.y,z:Global.debug_cam.z};
            curvasCreadas[`+(i-1)+`].setCoefficient();
              pointsOnCreateCurve = [];
  
            `);
          }
        }
  
        else if(Collider.detector.circleToCircle(mousePos.x, mousePos.y,curvasCreadas[i].p2.x,curvasCreadas[i].p2.y, 10,10)){
          window.onmousemove = function (){
            eval(`
            
              curvasCreadas[`+i+`].p2 = {x:UMI.umi(mouseX-width/2)+Global.debug_cam.position.x, y:UMI.umi(mouseY-height/2)+Global.debug_cam.position.y,z:Global.debug_cam.z};
              curvasCreadas[`+i+`].setCoefficient();
              pointsOnCreateCurve = [];
  
            `);
          }
        }
  
        else if(Collider.detector.circleToCircle(mousePos.x, mousePos.y,curvasCreadas[i].p3.x,curvasCreadas[i].p3.y, 10,10)){
          window.onmousemove = function (){
            eval(`
            
              
              curvasCreadas[`+i+`].p3 = {x:UMI.umi(mouseX-width/2)+Global.debug_cam.position.x, y:UMI.umi(mouseY-height/2)+Global.debug_cam.position.y,z:Global.debug_cam.z};
              curvasCreadas[`+i+`].setCoefficient();
              pointsOnCreateCurve = [];
  
            `);
          }
        }
  
        else if(Collider.detector.circleToCircle(mousePos.x, mousePos.y,curvasCreadas[i].p4.x,curvasCreadas[i].p4.y, 10,10)){
          
            window.onmousemove = function (){
              eval(`
              curvasCreadas[`+i+`].p4 = {x:UMI.umi(mouseX-width/2)+Global.debug_cam.position.x, y:UMI.umi(mouseY-height/2)+Global.debug_cam.position.y,z:Global.debug_cam.z};
              curvasCreadas[`+i+`].setCoefficient();
                pointsOnCreateCurve = [];
              `);
            }
  
  
        }
        
      }
      
      //var mousePos = {x:UMI.umi(mouseX-width/2)+UMI.umi(Global.debug_cam.position.x), y:UMI.umi(mouseY-height/2)+UMI.umi(Global.debug_cam.position.y),z:0};


      pointsOnCreateCurve.push({x:mousePos.x, y:mousePos.y, z:Global.debug_cam.position.z});

      if(pointsOnCreateCurve.length == 4){

        curvasCreadas.push(new Bezier (pointsOnCreateCurve[0],pointsOnCreateCurve[1],pointsOnCreateCurve[2],pointsOnCreateCurve[3]));
        pointsOnCreateCurve = [pointsOnCreateCurve[3]];
      }
  
      
  
    }
    
    if (!Mouse.left.clicked && creando){
      creando = false;
      window.onmousemove = function (){}
      if(curvasCreadas.length >= 1)
        pointsOnCreateCurve[0] = curvasCreadas[curvasCreadas.length-1].p4;
    }
  
    for (let i = 0; i < curvasCreadas.length; i++) {
      fill(255)

      ellipse(UMI.px(curvasCreadas[i].p1.x-Global.debug_cam.position.x),UMI.px(curvasCreadas[i].p1.y-Global.debug_cam.position.y), 10,10);
      ellipse(UMI.px(curvasCreadas[i].p4.x-Global.debug_cam.position.x),UMI.px(curvasCreadas[i].p4.y-Global.debug_cam.position.y), 10,10);
      
      fill(255,0,0);
      ellipse(UMI.px(curvasCreadas[i].p3.x-Global.debug_cam.position.x),UMI.px(curvasCreadas[i].p3.y-Global.debug_cam.position.y), 10,10);
      ellipse(UMI.px(curvasCreadas[i].p2.x-Global.debug_cam.position.x),UMI.px(curvasCreadas[i].p2.y-Global.debug_cam.position.y), 10,10);
  
      
      for (let u = 0; u < 1; u+= 1/20) {

        ellipse(UMI.px(curvasCreadas[i].Px(u)-Global.debug_cam.position.x), UMI.px(curvasCreadas[i].Py(u)-Global.debug_cam.position.y),5,5);
        push();
        //Brush.translate(curvasCreadas[i].Px(u)-Global.debug_cam.position.x, curvasCreadas[i].Py(u)-Global.debug_cam.position.y, curvasCreadas[i].Pz(u)-Global.debug_cam.position.z);
        //sphere(5,5);
        pop();
      }
      
    }
  
    fill(255)
    for (let i = 0; i < pointsOnCreateCurve.length; i++) {
      ellipse(UMI.px(pointsOnCreateCurve[i].x-Global.debug_cam.position.x),UMI.px(pointsOnCreateCurve[i].y-Global.debug_cam.position.y), 10,10);
      
      //ellipse(UMI.px(pointsOnCreateCurve[i].x),UMI.px(pointsOnCreateCurve[i].y), 10,10)
    }
  

   }


  function exportCameraRotation(){
    console.log('new SuperVector('+debug_rotation.x+','+debug_rotation.y+','+debug_rotation.z+')');

    
  }

  function exportCameraPosition(){
    console.log('new SuperVector('+Global.debug_cam.position.x+','+Global.debug_cam.position.y+','+Global.debug_cam.position.z+')');
     
  }


