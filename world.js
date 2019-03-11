
function world_setup(){
    if(room_music.playing()) room_music.stop();

    music.loop();
    cameraReference = new FollowerReference(pj);
    Camera.setObjectReference(cameraReference);
    

    pj.portal_opened = true;
    pj.portal_x = -60;
    pj.portal_y = 0;

    pj.z = 0;

}

//gameloop
function world_gameloop(){
    
    world_update();
    world_draw();
  
}

//UPDATE
function world_update(){

    for (let i = 0; i < UMI.realObjects.length; i++) {
        if(UMI.realObjects[i].destroying){
            UMI.realObjects[i].destroy();
            i--;
        }
        
    }

    
    //hexagons collisions
    hexagon_collisions();

    var tries = 0;
    while(hexagons.length < 15 && tries < 10){
        var x_on_create = Math.random() * ((pj.x+500) - (pj.x-500)) + (pj.x-500);
        var y_on_create = Math.random() * ((pj.y+500) - (pj.y-500)) + (pj.y-500);


        var positionValid = true;
        for (let i = 0; i < hexagons.length && positionValid; i++) {
            positionValid = ( Math.abs(hexagons[i].x - x_on_create) > 100 && Math.abs(hexagons[i].y - y_on_create) > 100 )
            
        }
        if(positionValid &&  Math.abs(pj.x - x_on_create) > 100 && Math.abs(pj.y - y_on_create) > 100) {
            new Hexagon(x_on_create,y_on_create, create_hexagon(x_on_create,y_on_create) );

        }

        tries ++;
        
    }

    



    UMI.LogicObjects.forEach(obj => {
        if(!obj.destroying) obj.update();
    });

    //PJ COLISIONS
    if(!pj.jumping){


        //ENEMIES
        for (let i = 0; i < enemies.length; i++) {
            
            if( !pj.jumping && !enemies[i].destroying && Collider2D.detector.circleToCircle(pj.x,pj.y,enemies[i].x,enemies[i].y,pj.radio,enemies[i].radio) ){
                check_game_over();
                enemies[i].destroying = true;
            }
        }

      }


      //PROJECTILES COLISION

      projectiles.forEach(projectile => {

        if(!pj.jumping && Collider2D.detector.circleToCircle( pj.x, pj.y,projectile.x, projectile.y, pj.radio,projectile.radio ) ){
            check_game_over();
            
            projectile.destroying = true;
        }

        enemies.forEach(enemy => {
            if(Collider2D.detector.circleToCircle(projectile.x,projectile.y,enemy.x,enemy.y,projectile.radio,enemy.radio) ){
              enemy.destroying = true;
              projectile.destroying = true;

              score += 100;

            }
        });

        enemiesLines.forEach(enemy => {
            if( Collider2D.detector.circleToCircle(projectile.x,projectile.y,enemy.x,enemy.y,projectile.radio*2.3,enemy.radio) ){
              enemy.destroying = true;
              projectile.destroying = true;

              score += 150;

            }
        });

        enemiesProjectiles.forEach(enemy => {
            if( projectile.destroyEnemy && Collider2D.detector.circleToCircle(projectile.x,projectile.y,enemy.x,enemy.y,projectile.radio*2,enemy.radio) ){
              enemy.destroying = true;
              projectile.destroying = true;

              score += 120;

            }
        });

        enemiesWaves.forEach(enemy => {
            if( Collider2D.detector.circleToCircle(projectile.x,projectile.y,enemy.x,enemy.y,projectile.radio,enemy.radio) ){
              enemy.destroying = true;
              projectile.destroying = true;

              score += 120;

            }
        });
        
        hexagons.forEach(hexagon => {
            if( Collider2D.detector.circleToPolygon( projectile.x, projectile.y, projectile.radio,hexagon.poly ) ){
                projectile.direction.x = -projectile.direction.x; 
                projectile.direction.y = -projectile.direction.y; 
                projectile.rebounds++;
            }


        });

          
          
      });

      linesShoot.forEach(shoot => {
        if(!pj.jumping && Collider2D.detector.circleToPoint( pj.x, pj.y, pj.radio, shoot.x, shoot.y ) ){
            check_game_over();
        }


        hexagons.forEach(hexagon => {
            if( Collider2D.detector.circleToPolygon( shoot.x, shoot.y, 3,hexagon.poly ) ){
                shoot.destroying = true;
            }

        });

          
      });

      
      waves.forEach(wave => {
        if(!pj.jumping && Collider2D.detector.circleToLine( pj.x, pj.y, pj.radio*2, wave.x1, wave.y1,wave.x2, wave.y2 ) ){
            check_game_over();
        }

      });
  
  
  

        
      if(pj.portal_opened && Collider2D.detector.circleToRect(pj.x,pj.y,pj.radio,pj.portal_x,pj.portal_y,30,40) ){
        
        goToRoom();
    }

    if(pj.portal_opened && Math.abs(pj.x - pj.portal_x) > 1500 ||  Math.abs(pj.y - pj.portal_y) > 1500 ){
        pj.portal_opened = false;
        
        
    }


    if(!pj.portal_opened){
        
            pj.portal_opened = true;
            
            var positionValid = false;
            while(!positionValid){
                
                var x_on_create = Math.random() * ((500) - (400)) + (400);
                var y_on_create = Math.random() * ((500) - (400)) + (400);

                x_on_create *= (Math.floor(Math.random() * (100)) % 2 == 1 ) ? 1: -1;
                y_on_create *= (Math.floor(Math.random() * (100)) % 2 == 1 ) ? 1: -1;
                    x_on_create += pj.x;
                    y_on_create += pj.y;    
                
                positionValid = true;
                
                for (let i = 0; i < hexagons.length && positionValid; i++) {
                    positionValid = ( Math.abs(hexagons[i].x - x_on_create) > 300 || Math.abs(hexagons[i].y - y_on_create) > 300 );
                
                }

                    
                
            }
            
            pj.portal_x = x_on_create;
            pj.portal_y = y_on_create;


            console.log(pj.x, x_on_create);
            console.log(pj.y, y_on_create);

    
        
    }

        


      //SHIELD CAPTION
      if (pj.shield_active){
        for (let i = 0; i < enemiesAway.length; i++) {
         
            if(!enemiesAway[i].destroying && Collider2D.detector.circleToPolygon( enemiesAway[i].x, enemiesAway[i].y, enemiesAway[i].radio, pj.shield_on_draw )){
              
              pj.holding.push({
                x: Math.random()* (55 - 27) + 27,
                y: Math.random()* (30 - 10) + 10
              });
              
              if(pj.pu_doubleproj_caught){
                  pj.holding.push({
                    x: Math.random()* (55 - 27) + 27,
                    y: Math.random()* (30 - 10) + 10
                  });
              }
              hunted++;
              score += 20;
              enemiesAway[i].destroying = true;
      
    
            }
          }

          for (let i = 0; i < projectiles.length; i++) {
         
            if(!projectiles[i].destroying && Collider2D.detector.circleToPolygon( projectiles[i].x, projectiles[i].y, projectiles[i].radio*2, pj.shield_on_draw )){
              
              pj.holding.push({
                x: Math.random()* (55 - 17) + 17,
                y: Math.random()* (20 - 10) + 10
              });
              
              if(pj.pu_doubleproj_caught){
                  pj.holding.push({
                      x: Math.random()* (55 - 17) + 17,
                      y: Math.random()* (20 - 10) + 10
                  });
              }
  
              score += 100;
              projectiles[i].destroying = true;
      
    
            }
          }
        
      }
  
      
    if(dificultad == 1){
        generar_enemigos(5,65,1,1,1);

    }else if(dificultad == 2){
        generar_enemigos(10,65,2,1,2);

    }else if(dificultad == 3){ 
        generar_enemigos(15,65,3,2,2);

    }

    if(Math.floor((Math.random() * 450) + 1) == 1){
        cameraReference.random_zoom_transition();
        
    }

}

//DRAW
function world_draw(){




    translate(width/2,height/2);
    scale(Camera.zoom);

    background(0);


    var w = 405/1.2;
    var h = 327/1.2;

    relative_regulation_x = cameraReference.x-(cameraReference.x % w);
    relative_regulation_y = cameraReference.y-(cameraReference.y % h);;

    var x = -w/2;
    var y = -h/2;

    drawingContext.shadowBlur = 0;
    var currentY = y;
    var multiplerY = 0;
    for (let j = 0; j < (window.innerWidth/UMI.toPixel(h))/2+1; j++) {
        var multipler = 0;
        for (let i = 0; i < (window.innerWidth/UMI.toPixel(w))/2+2; i++) {    
        
            image(bg_texture, UMI.toPixel(Camera.translationX(-x-x*multipler+relative_regulation_x)), UMI.toPixel(Camera.translationY(currentY+relative_regulation_y)), UMI.toPixel(w), UMI.toPixel(h));
            image(bg_texture, UMI.toPixel(Camera.translationX(x+x*multipler+relative_regulation_x)), UMI.toPixel(Camera.translationY(currentY+relative_regulation_y)), UMI.toPixel(w), UMI.toPixel(h));
            image(bg_texture, UMI.toPixel(Camera.translationX(-x-x*multipler+relative_regulation_x)), UMI.toPixel(Camera.translationY(-currentY+relative_regulation_y)), UMI.toPixel(w), UMI.toPixel(h));
            image(bg_texture, UMI.toPixel(Camera.translationX(x+x*multipler+relative_regulation_x)), UMI.toPixel(Camera.translationY(-currentY+relative_regulation_y)), UMI.toPixel(w), UMI.toPixel(h));
                
            multipler+=2;
        }
        multiplerY+=2;
        currentY = y+y*multiplerY;
    }


    
    if(pj.portal_opened){
        image(stairs_2,UMI.toPixel( Camera.translationX(pj.portal_x) ),UMI.toPixel( Camera.translationY(pj.portal_y)), UMI.toPixel(40),UMI.toPixel(40));
        fill(255);
        noStroke();
        textSize(UMI.toPixel(12));
        textAlign(CENTER, CENTER);  
        text('Go home', UMI.toPixel(Camera.translationX(portal_X)), UMI.toPixel(Camera.translationY(portal_y)));
    
    }

    UMI.realObjects.forEach(obj => {
      if(!obj.destroying) obj.draw();
    });

  

    

    
    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = "orange";
    
    fill('red');
    textAlign(RIGHT);
    noStroke();
    textSize(UMI.toPixel(40));
    text('x'+score+'    ',window.innerWidth/2,-window.innerHeight/2.2);


    drawingContext.shadowBlur = 0;

    Cursor.draw();


    fill(255,255,255,100);
    textAlign(RIGHT);
    noStroke();
    textSize(UMI.toPixel(10));
    text('DigitalHelheim - ENTI-UB AA1 Álgebra 1ro CDI Grupo A (Mañanas) / Alumnos: Pol Surriel y Eric Garcia',window.innerWidth/2.02,-window.innerHeight/2.05);




}


function create_hexagon(x, y){
        
    var i = Math.floor( (y/(hexagon_height)));
    var j = Math.floor( (x/(hexagon_width+hexagon_lado))); 

    var r = new Array();

    hexagon_reference.forEach(point => {
        r.push([
            point[0]+(hex_reg_x*j+(hexagon_width+hexagon_lado)*j),
            point[1]+(hex_reg_y*i+hexagon_height*i)
        ]);
    });


    return r;

}


function generar_enemigos(n,na,np,nl, nw){
    
    if(enemies.length < n){

        if(Math.floor((Math.random() * 100) + 1) == 1){

            var x_on_create = Math.random() * ((pj.x+500) - (pj.x-500)) + (pj.x-500);
            var y_on_create = Math.random() * ((pj.y+500) - (pj.y-500)) + (pj.y-500);

            var distX = Math.abs(x_on_create-pj.x);
            var distY = Math.abs(y_on_create-pj.y);

            if(distX > 200 && distY > 200){
                enemies.push(new Enemy(x_on_create, y_on_create));
            } 
        }
    }

    if(enemiesAway.length < na){

        if(Math.floor((Math.random() * 10) + 1) == 1){

            var x_on_create = Math.random() * ((pj.x+500) - (pj.x-500)) + (pj.x-500);
            var y_on_create = Math.random() * ((pj.y+500) - (pj.y-500)) + (pj.y-500);
            
        
            var distX = Math.abs(x_on_create-pj.x);
            var distY = Math.abs(y_on_create-pj.y);

            if(distX > 200 && distY > 200){
                enemiesAway.push(new EnemyAway(x_on_create, y_on_create));
            } 
        }
    }

    if(enemiesProjectiles.length < np){

        if(Math.floor((Math.random() * 50) + 1) == 1){

            var x_on_create = Math.random() * ((pj.x+500) - (pj.x-500)) + (pj.x-500);
            var y_on_create = Math.random() * ((pj.y+500) - (pj.y-500)) + (pj.y-500);
            
           var distX = Math.abs(x_on_create-pj.x);
            var distY = Math.abs(y_on_create-pj.y);
            
            if(distX > 200 && distY > 200){
                enemiesProjectiles.push(new EnemyProjectile(x_on_create, y_on_create));
            } 
        }
    }

    if(enemiesLines.length < nl){

        if(Math.floor((Math.random() * 50) + 1) == 1){

            var x_on_create = Math.random() * ((pj.x+500) - (pj.x-500)) + (pj.x-500);
            var y_on_create = Math.random() * ((pj.y+500) - (pj.y-500)) + (pj.y-500);
            
            var distX = Math.abs(x_on_create-pj.x);
            var distY = Math.abs(y_on_create-pj.y);
            
            if(distX > 200 && distY > 200){
                enemiesLines.push(new EnemyLine(x_on_create, y_on_create));
            } 
        }
    }

    if(enemiesWaves.length < nw){

        if(Math.floor((Math.random() * 50) + 1) == 1){

            var x_on_create = Math.random() * ((pj.x+500) - (pj.x-500)) + (pj.x-500);
            var y_on_create = Math.random() * ((pj.y+500) - (pj.y-500)) + (pj.y-500);
            
           var distX = Math.abs(x_on_create-pj.x);
            var distY = Math.abs(y_on_create-pj.y);
            
            if(distX > 200 && distY > 200){
                enemiesWaves.push(new EnemyWave(x_on_create, y_on_create));
            } 
        }
    }


}

function hexagon_collisions(){
    for (let i = 0; i < hexagons.length; i++) {

        var dist = new Vector2D(pj.x-hexagons[i].x,pj.y-hexagons[i].y).getMagnitude();
        if(dist < 170 && Collider2D.detector.circleToPolygon(pj.x,pj.y,pj.radio*2,hexagons[i].poly) ){
            var newPos = Collider2D.reaction.circleToPolygon(pj.last_x,pj.last_y,  pj.x,pj.y,pj.radio*2,hexagons[i].poly);

            if(!isNaN(newPos.x)){
                pj.x = newPos.x;
                pj.y = newPos.y;
            
            }else{
                pj.x = pj.last_x;
                pj.y = pj.last_y;
            }
            
        }


        for (let j = 0; j < enemies.length; j++) {
            
            dist = new Vector2D(enemies[j].x-hexagons[i].x,enemies[j].y-hexagons[i].y).getMagnitude();
            if(dist < 130 && Collider2D.detector.circleToPolygon(enemies[j].x,enemies[j].y,enemies[j].radio,hexagons[i].poly) ){
                var newPos = Collider2D.reaction.circleToPolygon(enemies[j].last_x,enemies[j].last_y,  enemies[j].x,enemies[j].y,enemies[j].radio,hexagons[i].poly);
    
                if(!isNaN(newPos.x)){
                    enemies[j].x = newPos.x;
                    enemies[j].y = newPos.y;
                
                }else{
                    enemies[j].x = enemies[j].last_x;
                    enemies[j].y = enemies[j].last_y;
                }
                
            }
            
        }

        for (let j = 0; j < enemiesLines.length; j++) {
            
            dist = new Vector2D(enemiesLines[j].x-hexagons[i].x,enemiesLines[j].y-hexagons[i].y).getMagnitude();
            if(dist < 130 && Collider2D.detector.circleToPolygon(enemiesLines[j].x,enemiesLines[j].y,enemiesLines[j].radio,hexagons[i].poly) ){
                var newPos = Collider2D.reaction.circleToPolygon(enemiesLines[j].last_x,enemiesLines[j].last_y,  enemiesLines[j].x,enemiesLines[j].y,enemiesLines[j].radio,hexagons[i].poly);
    
                if(!isNaN(newPos.x)){
                    enemiesLines[j].x = newPos.x;
                    enemiesLines[j].y = newPos.y;
                
                }else{
                    enemiesLines[j].x = enemiesLines[j].last_x;
                    enemiesLines[j].y = enemiesLines[j].last_y;
                }
                
            }
            
        }

        for (let j = 0; j < enemiesAway.length; j++) {
            
            dist = new Vector2D(enemiesAway[j].x-hexagons[i].x,enemiesAway[j].y-hexagons[i].y).getMagnitude();
            if(dist < 130 && Collider2D.detector.circleToPolygon(enemiesAway[j].x,enemiesAway[j].y,enemiesAway[j].radio,hexagons[i].poly) ){
                var newPos = Collider2D.reaction.circleToPolygon(enemiesAway[j].last_x,enemiesAway[j].last_y,  enemiesAway[j].x,enemiesAway[j].y,enemiesAway[j].radio,hexagons[i].poly);
    
                if(!isNaN(newPos.x)){
                    enemiesAway[j].x = newPos.x;
                    enemiesAway[j].y = newPos.y;
                
                }else{
                    enemiesAway[j].x = enemiesAway[j].last_x;
                    enemiesAway[j].y = enemiesAway[j].last_y;
                }
                
            }
            
        }

        for (let j = 0; j < enemiesProjectiles.length; j++) {
            
            dist = new Vector2D(enemiesProjectiles[j].x-hexagons[i].x,enemiesProjectiles[j].y-hexagons[i].y).getMagnitude();
            if(dist < 130 && Collider2D.detector.circleToPolygon(enemiesProjectiles[j].x,enemiesProjectiles[j].y,enemiesProjectiles[j].radio,hexagons[i].poly) ){
                var newPos = Collider2D.reaction.circleToPolygon(enemiesProjectiles[j].last_x,enemiesProjectiles[j].last_y,  enemiesProjectiles[j].x,enemiesProjectiles[j].y,enemiesProjectiles[j].radio,hexagons[i].poly);
    
                if(!isNaN(newPos.x)){
                    enemiesProjectiles[j].x = newPos.x;
                    enemiesProjectiles[j].y = newPos.y;
                
                }else{
                    enemiesProjectiles[j].x = enemiesProjectiles[j].last_x;
                    enemiesProjectiles[j].y = enemiesProjectiles[j].last_y;
                }
                
            }
            
        }

    }
}

function check_game_over(){
    if(pj.health == 1){
        
        game_over = true;
        goToRoom();
        score = 0;

    }else{
        pj.health--;
    }
}

function goToRoom(){

    on_world = false;
        

    for (let i = 0; i < UMI.realObjects.length; i++ ) {
        if(UMI.realObjects[i] != pj){
            UMI.realObjects[i].destroy();
            i--;
        } 
    };

    room_setup();
    

}