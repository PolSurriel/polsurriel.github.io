function draw(){ 

    //GAMELOOP 
    push();
      Brush.rotateX(debug_rotation.x)
      Brush.rotateY(debug_rotation.y)
      Brush.rotateZ(debug_rotation.z)
      Camera.reference.update();
      if (Camera.reference.following) Camera.reference.following.update();
      gameloop.update();
      push();
      gameloop.draw();
      pop();

      
      pop();
      
    
    UI.draw();



    if(debug_mode){
      push();
      Brush.rotateY(debug_rotation.y)
      Brush.rotateX(debug_rotation.x)
      Brush.rotateZ(debug_rotation.z)
      debugUpdate();
      pop();

      if(camMode){
        line(0,0, 10, 0);
        line(0,0, -10,0);
        line(0,0, 0,  10);
        line(0,0, 0,  -10);
      }

      if(!airplaneGrabbed)
        Cursor.draw();

        var scale = 20;
        var onDrawIndicator = {
          x:innerWidth/2-50,
          y:-height/2+50,
          z:10
        }

        noFill(255);
        strokeWeight(1)
        stroke(255, 100)


        strokeWeight(3)
        stroke(0,0,255);
        line(onDrawIndicator.x,onDrawIndicator.y,onDrawIndicator.z, Camera.base.vx.x*scale + onDrawIndicator.x, Camera.base.vx.y*scale + onDrawIndicator.y,Camera.base.vx.z*scale + onDrawIndicator.z);
        stroke(255,0,0);
        line(onDrawIndicator.x,onDrawIndicator.y,onDrawIndicator.z, Camera.base.vy.x*scale + onDrawIndicator.x, Camera.base.vy.y*scale + onDrawIndicator.y,Camera.base.vy.z*scale + onDrawIndicator.z);
        stroke(0,255,0); 
        line(onDrawIndicator.x,onDrawIndicator.y,onDrawIndicator.z, Camera.base.vz.x*scale + onDrawIndicator.x, Camera.base.vz.y*scale + onDrawIndicator.y,Camera.base.vz.z*scale + onDrawIndicator.z);
        strokeWeight(1)
        stroke(0)
      
    }
    
    FPS_COUNT ++;
    Global.rotation_debug -= 0.001;
    
  }
  