function room_setup(){
    cameraReference = new FollowerReference({x:0,y:0});
    Camera.setObjectReference(cameraReference);

    if(music.playing()) music.stop();

    room_music.loop();

    pj.x = 52;
    pj.y = -180;

    pj.z = 0;

    window.ball = new Ball(-90,0,30);

    if(game_over){
        game_over_speed = UMI.getSpeed(30);
        game_over_status = 0;
    }

    hay_portal = false;

}


//gamelop
function room_gameloop(){

    if(game_over){
        
        drawingContext.shadowBlur = 0;
        room_draw();
        background(0,0,0,255-game_over_status);
        textAlign(CENTER,CENTER);
        textSize(UMI.toPixel(50));
        if(game_over_status < 150) fill(255,255,255,game_over_status);
        else fill(255,255,255,150-(game_over_status*1.2-140));
        translate(-window.innerWidth/2,-window.innerHeight/2);
        text('Haha! Helheim is no place for mercy.', UMI.toPixel(window.innerWidth/2.5), UMI.toPixel(window.innerHeight/2));
        textSize(UMI.toPixel(200));
        text('<3', UMI.toPixel(window.innerWidth/2.5), UMI.toPixel(window.innerHeight/3));

        game_over_status+= game_over_speed;
        if(game_over_status >= 255){
            game_over = false;
        }

    }else{
        room_update();
        room_draw();
    }
    
}

function room_update(){


    UMI.LogicObjects.forEach(obj => {
        obj.update();
    });

    pj.update();

    
    //Ball Collision
    ball_update();
    


    //throne colision
    if( Collider2D.detector.circleToRect(pj.x,pj.y,pj.radio,145,-105,30,40) ){
        
        on_world = true;
        pj.x = 0;
        pj.y = 0;
        ball.destroy();
        world_setup();
    }


    if( Collider2D.detector.circleToRect(pj.x,pj.y,pj.radio,10,-230,70,30)){
        var newPos = Collider2D.reaction.circleToRect(pj.x,pj.y,pj.radio,pj.last_x,pj.last_y,10,-230,100,30);

        if(!isNaN(newPos.x)){
            pj.x = newPos.x;
            pj.y = newPos.y;
        
        }else{
            pj.x = pj.last_x;
            pj.y = pj.last_y;
        }
    }

    if(!pj.jumping && Collider2D.detector.circleToRect(pj.x,pj.y,pj.radio,10,-230,30,80)){
        var newPos = Collider2D.reaction.circleToRect(pj.x,pj.y,pj.radio,pj.last_x,pj.last_y,10,-230,30,80);

        if(!isNaN(newPos.x)){
            pj.x = newPos.x;
            pj.y = newPos.y;
        
        }else{
            pj.x = pj.last_x;
            pj.y = pj.last_y;
        }
    }

    if(!pj.jumping && Collider2D.detector.circleToRect(pj.x,pj.y,pj.radio,60,-230,20,80)){
        var newPos = Collider2D.reaction.circleToRect(pj.x,pj.y,pj.radio,pj.last_x,pj.last_y,60,-230,20,80);
        if(newPos){

            if(!isNaN(newPos.x)){
                pj.x = newPos.x;
                pj.y = newPos.y;
            
            }else{
                pj.x = pj.last_x;
                pj.y = pj.last_y;
            }
        }
    }

    if( Collider2D.detector.circleToRect(pj.x,pj.y,pj.radio,15,-230,60,80)){
        pj.z = 5;
    }else{
        if(!pj.jumping) pj.z = 0;
    }


    //Colision margen de ventana
    if(UMI.toPixel(pj.x) <= -window.innerWidth/2+UMI.toPixel(pj.radio*2) ){
        pj.x += pj.speed*3;
    }else if(UMI.toPixel(pj.x) >= window.innerWidth/2-UMI.toPixel(pj.radio*2)){
        pj.x -= pj.speed*3;
    }

    if(UMI.toPixel(pj.y) <= -window.innerHeight/2+UMI.toPixel(pj.radio*2) ){
        pj.y += pj.speed*3;
    }else if(UMI.toPixel(pj.y) >= window.innerHeight/2-UMI.toPixel(pj.radio*2)){
        pj.y -= pj.speed*3;
    }

    //Power ups colision
    if(!pj.pu_speed_caught && score >= 1000){
        if( Collider2D.detector.circleToCircle(pj.x,pj.y,-190, 100, pj.radio,30) ){
            pj.pu_speed_caught = true;
            score -= 1000;

            pj.speed *= 1.5;
            pu_count++;
            power_up_sound.play();
        }
    }

    
    if(!pj.pu_doubleproj_caught && score >= 5000){
        if(Collider2D.detector.circleToCircle(pj.x,pj.y,5, 100, pj.radio,30)){
            pj.pu_doubleproj_caught = true;
            score -= 5000;

            pu_count++;
            power_up_sound.play();
        }
    }

    
    if(!pj.pu_health_caught && score >= 10000){
        if(Collider2D.detector.circleToCircle(pj.x,pj.y,190, 100, pj.radio,30)){
            pj.pu_health_caught = true;
            score -= 10000;
            pj.health = 2;
            pu_count++;
            power_up_sound.play();
            
        }
    }


    if(!pj.pu_shield_caught && score >= 700){
        if(Collider2D.detector.circleToCircle(pj.x,pj.y,-105, 200, pj.radio,30)){
            pj.pu_shield_caught = true;
            score -= 700;
            pj.health = 2;
            pu_count++;
            power_up_sound.play();
            
            
        }
    }

    if(!(pj.pu_health_caught && pj.pu_doubleproj_caught && pj.pu_speed_caught && pj.pu_shield_caught) && !pj.pu_random_caught && score >= 500){
        if(Collider2D.detector.circleToCircle(pj.x,pj.y,65, 200, pj.radio,30)){
            pj.pu_random_caught = true;
            score -= 700;
            pj.health = 2;
            pu_count++;
            power_up_sound.play();

            var assigned = false;

            do{

                
                var val = Math.floor(Math.random() * (6));

                if(val == 1 && !pj.pu_doubleproj_caught){
                    pj.pu_doubleproj_caught = true;
                    assigned=true;
                    
                }else if (val == 2 && !pj.pu_health_caught){
                    pj.pu_health_caught = true;
                    pj.health = 2;
                    assigned=true;
                    
                }else if (val == 3 && !pj.pu_speed_caught){
                    pj.pu_speed_caught = true;
                    pj.speed *= 1.5;
                    assigned=true;
                    
                }else if(!pj.pu_shield_caught){
                    pj.pu_shield_caught = true;
                    assigned=true;
                }
                
            }while(!assigned);

            
        }
    }


  

    //Mode buttons
    if(!pj.jumping){
        if(Collider2D.detector.circleToRect(pj.x,pj.y,pj.radio,-300,-140,20,20)){
            dificultad = 1;
        }

        if(Collider2D.detector.circleToRect(pj.x,pj.y,pj.radio,-300,-70,20,20)){
            dificultad = 2;
        }

        if(Collider2D.detector.circleToRect(pj.x,pj.y,pj.radio,-300,-0,20,20)){
            dificultad = 3;
        }


    }



}

function room_draw(){
    translate(width/2,height/2);
    scale(Camera.zoom);
    background(0);

    image(bg_row, UMI.toPixel(-1200), UMI.toPixel(-1000), UMI.toPixel(2490), UMI.toPixel(1600));
    
    //
    image(stairs,UMI.toPixel(140),UMI.toPixel(-100), UMI.toPixel(40),UMI.toPixel(40));
    fill(255);
    noStroke();
    textSize(UMI.toPixel(12));
    textAlign(CENTER, CENTER);  
    text('Go to Helheim', UMI.toPixel(160), UMI.toPixel(-50));

    //Ball
    ball.draw();
    
    //Mode menu

    stroke('gray');
    (dificultad == 1) ? fill(0,255,0, 100):fill(255,0,0, 100);
    rect(UMI.toPixel(-300), UMI.toPixel(-140), UMI.toPixel(20), UMI.toPixel(20));
    (dificultad == 2) ? fill(0,255,0, 100):fill(255,0,0, 100);
    rect(UMI.toPixel(-300), UMI.toPixel(-70), UMI.toPixel(20), UMI.toPixel(20));
    (dificultad == 3) ? fill(0,255,0, 100):fill(255,0,0, 100);
    rect(UMI.toPixel(-300), UMI.toPixel(0), UMI.toPixel(20), UMI.toPixel(20));

    
    textSize(UMI.toPixel(12));

    (dificultad == 1) ? fill(0,255,0, 100):fill(255,0,0, 100);
    text('    Noob', UMI.toPixel(-350), UMI.toPixel(-130));
    (dificultad == 2) ? fill(0,255,0, 100):fill(255,0,0, 100);
    text('    Human', UMI.toPixel(-350), UMI.toPixel(-60));
    (dificultad == 3) ? fill(0,255,0, 100):fill(255,0,0, 100);
    text('    Demon', UMI.toPixel(-350), UMI.toPixel(10));


   

    image(throne_img,UMI.toPixel(0),UMI.toPixel(-240), UMI.toPixel(100),UMI.toPixel(100));
    

    UMI.realObjects.forEach(obj => {
        obj.draw();
    });


     // DRAW POWER UPS
     fill('white');
     if(!pj.pu_speed_caught){
         image(power_up_speed_img, UMI.toPixel(-210),UMI.toPixel(80), UMI.toPixel(40),UMI.toPixel(40));
         textSize(UMI.toPixel(12));
         text('Speed x1.5', UMI.toPixel(-190), UMI.toPixel(125));
         textSize(UMI.toPixel(9));
         text('Price: 1.000', UMI.toPixel(-190), UMI.toPixel(138));
     }
 
     
     if(!pj.pu_doubleproj_caught){
         image(power_up_duplicate_img, UMI.toPixel(-18),UMI.toPixel(80), UMI.toPixel(40),UMI.toPixel(40));
         textSize(UMI.toPixel(12));
         text('Duplicate projectiles', UMI.toPixel(0), UMI.toPixel(125));
         textSize(UMI.toPixel(9));
         text('Price: 5.000', UMI.toPixel(0), UMI.toPixel(138));
     }
 
     
     if(!pj.pu_health_caught){
         image(power_up_health_img, UMI.toPixel(172),UMI.toPixel(80), UMI.toPixel(40),UMI.toPixel(40));
         textSize(UMI.toPixel(12));
         text('Health x2', UMI.toPixel(190), UMI.toPixel(125));
         textSize(UMI.toPixel(9));
         text('Price: 10.000', UMI.toPixel(190), UMI.toPixel(138));
     }
 
     if(pj.pu_health_caught && pj.pu_doubleproj_caught && pj.pu_speed_caught && pj.pu_shield_caught){
        textSize(UMI.toPixel(40));
        fill(255,255,255,100);
        text('Oh, did they ever stand a chance?', UMI.toPixel(130), UMI.toPixel(138));
    }


    if(!pj.pu_shield_caught){
        image(power_up_shield_img, UMI.toPixel(-120),UMI.toPixel(180), UMI.toPixel(40),UMI.toPixel(40));
        textSize(UMI.toPixel(12));
        text('Unlimited shield', UMI.toPixel(-100), UMI.toPixel(225));
        textSize(UMI.toPixel(9));
        text('Price: 700', UMI.toPixel(-100), UMI.toPixel(238));
    }

    if(!pj.pu_random_caught && !(pj.pu_health_caught && pj.pu_doubleproj_caught && pj.pu_speed_caught && pj.pu_shield_caught)){
        image(power_up_random_img, UMI.toPixel(80),UMI.toPixel(180), UMI.toPixel(40),UMI.toPixel(40));
        textSize(UMI.toPixel(12));
        text('Random choice', UMI.toPixel(100), UMI.toPixel(225));
        textSize(UMI.toPixel(9));
        text('Price: 500', UMI.toPixel(100), UMI.toPixel(238));
    }
    
    

    
    
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
    text('DigitalHelheim - ENTI-UB AA1 Álgebra 1ro CDI Grupo A (Mañanas) / Alumnos: Pol Surriel y Eric García',window.innerWidth/2.02,-window.innerHeight/2.05);

    textAlign(LEFT);
    text(' PowerUps: '+pu_count+' Hunted: '+hunted,-window.innerWidth/2,-window.innerHeight/2.05);


    



}



function ball_update(){

    if( Collider2D.detector.circleToCircle(ball.x,ball.y,pj.x,pj.y,ball.radio,pj.radio) ){
        var newPos = Collider2D.reaction.circleToCircle(ball.x,ball.y,pj.x,pj.y,ball.radio,pj.radio);

        ball.x = newPos.x;
        ball.y = newPos.y;

        ball.setForce( new Vector2D( ball.x-pj.x , ball.y-pj.y ) );

    }


    //throne colision
    if( Collider2D.detector.circleToRect(ball.x,ball.y,ball.radio,10,-230,70,30)){
        
        ball.setForce(new Vector2D ( ball.last_x-ball.x , ball.last_y-ball.y ));
        ball.x = ball.last_x;
        ball.y = ball.last_y;
    }

    if(Collider2D.detector.circleToRect(ball.x,ball.y,ball.radio,10,-230,30,80)){
        
        ball.setForce(new Vector2D ( ball.last_x-ball.x , ball.last_y-ball.y ));
        ball.x = ball.last_x;
        ball.y = ball.last_y;
    }

    if(Collider2D.detector.circleToRect(ball.x,ball.y,ball.radio,60,-230,20,80)){
        
        ball.setForce(new Vector2D ( ball.last_x-ball.x , ball.last_y-ball.y ));
        ball.x = ball.last_x;
        ball.y = ball.last_y;
    }


    if(UMI.toPixel(ball.x) <= -window.innerWidth/2+UMI.toPixel(ball.radio) ){
        ball.setForce(new Vector2D ( ball.last_x-ball.x , ball.last_y-ball.y ));
        ball.x = ball.last_x;
        ball.y = ball.last_y;

    }else if(UMI.toPixel(ball.x) >= window.innerWidth/2-UMI.toPixel(ball.radio)){
        ball.setForce(new Vector2D ( ball.last_x-ball.x , ball.last_y-ball.y ));
        ball.x = ball.last_x;
        ball.y = ball.last_y;
    }

    if(UMI.toPixel(ball.y) <= -window.innerHeight/2+UMI.toPixel(ball.radio) ){
        ball.setForce(new Vector2D ( ball.last_x-ball.x , ball.last_y-ball.y ));
        ball.x = ball.last_x;
        ball.y = ball.last_y;

    }else if(UMI.toPixel(ball.y) >= window.innerHeight/2-UMI.toPixel(ball.radio)){
        ball.setForce(new Vector2D ( ball.last_x-ball.x , ball.last_y-ball.y ));
        ball.x = ball.last_x;
        ball.y = ball.last_y;
    }


    
    if( Collider2D.detector.circleToCircle(ball.x,ball.y,pj.x,pj.y,ball.radio,pj.radio) ){

        var newPos = Collider2D.reaction.circleToCircle(pj.x,pj.y,ball.x,ball.y,pj.radio, ball.radio,);

        pj.x = newPos.x;
        
        pj.y = newPos.y;
        
    }

}


