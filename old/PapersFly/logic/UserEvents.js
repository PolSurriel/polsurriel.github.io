/*
Dado que todavía no estamos formados, no sabíamos cómo implementar una gestión
de eventos de teclado cómoda en una marabunta de código como la que hemos acabado
creando. Basándonos en cómo Unity te permite acceder al estado del teclado,
hemos creado eventos y clases apartes que encapsulan esta información.

Hemos tenido que violar el acceso de algún atributo porque, por alguna
razón que no logramos comprender, al hacer un if con el estado de la tecla
nunca entraba.


En la clase Player comprobábamos si la tecla había sido soltada.
if(antes_pulsada == true && !KeyBoard.jump.pressed) pj.can_splash = true;


Siguiente lectura recomendada: Collider2D.js

*/


class Mouse {
    static left = {
        clicked:false
    };

    static right = {
        clicked:false
    };
}


class Keyboard {

    static left = {
        code:65,
        secondaryCode:37,
        pressed:false,

    };

    static right = {
        code:68,
        secondaryCode:39,
        pressed:false,

    };

    static up = {
        code:87,
        secondaryCode:38,
        pressed:false,

    };

    static down = {
        code:83,
        secondaryCode:40,
        pressed:false,

    };

    static jump = {
        code:32,
        secondaryCode:9999999,
        pressed:false,

    };

    static Z = {
        code:90,
        secondaryCode:9999999,
        pressed:false,

    }

    static R = {
        code:82,
        secondaryCode:9999999,
        pressed:false,

    }

}

class TouchPad {

}



if(!isMobileDevice()){

    online_playing_onmousedown = function (e) {
        var tengoQEnviar;
        if((e.button == 0)){
             tengoQEnviar = !Mouse.left.clicked;
             Mouse.left.clicked = true;
        }else{
            tengoQEnviar = !Mouse.right.clicked;
            Mouse.right.clicked = true;

        } 
        if(tengoQEnviar){
            shareAction({
                type:(e.button == 0) ? 'mouseLeftClick': 'mouseRightClick',
                code:e.keyCode,
                down:true
            });
        }

        call_on_user_interaction();

    }

    online_playing_onmouseup = function (e) {
        var tengoQEnviar;
        if((e.button == 0)){
             tengoQEnviar = Mouse.left.clicked;
             Mouse.left.clicked = false;
        }else{
            tengoQEnviar = Mouse.right.clicked;
            Mouse.right.clicked = false;

        } 
        if(tengoQEnviar){
            shareAction({
                type:(e.button == 0) ? 'mouseLeftClick': 'mouseRightClick',
                code:e.keyCode,
                down:false
            });
        }

        call_on_user_interaction();
    }

    online_playing_onkeydown = function (e){

        var tengoQEnviar = false;

        switch(e.keyCode) {
            case Keyboard.left.code:
            case Keyboard.left.secondaryCode:
                tengoQEnviar = !Keyboard.left.pressed;
                Keyboard.left.pressed = true;
                break;

            case Keyboard.up.code:
            case Keyboard.up.secondaryCode:
                tengoQEnviar = !Keyboard.up.pressed;
                Keyboard.up.pressed = true;
                
                break;
            case Keyboard.right.code:
            case Keyboard.right.secondaryCode:
                tengoQEnviar = !Keyboard.right.pressed;
                Keyboard.right.pressed = true;
            
                break;
            case Keyboard.down.code:
            case Keyboard.down.secondaryCode:
                tengoQEnviar = !Keyboard.down.pressed;
                Keyboard.down.pressed = true;
                break;
            case Keyboard.jump.code:
                tengoQEnviar = !Keyboard.jump.pressed;
                Keyboard.jump.pressed = true;
                break;
            case Keyboard.Z.code:
                Keyboard.Z.pressed = true;
            case Keyboard.R.code:
                Keyboard.R.pressed = true;

            case 84:
                chatActive = true;
                window.onkeydown = chat_onkeydown;
                window.onkeyup = null;
                window.onmousemove = null;
                window.onmouseup = null;
                window.onmousedown = null;
                break;
        }

        if(tengoQEnviar){
            shareAction({
                type:'key',
                code:e.keyCode,
                down:true
            });
        }

        
        call_on_user_interaction();



    }

    
    chat_onkeydown = function (e) {
                
        if(e.keyCode == 27){
            chatActive = false;
            window.onkeydown = online_playing_onkeydown;
            window.onkeyup = online_playing_onkeyup;
            window.onmousemove = online_playing_onmousemove;
            window.onmouseup = online_playing_onmouseup;
            window.onmousedown = online_playing_onmousedown;

        }else if(e.keyCode == INTRO_KEY){

            sendMessage(mensaje_escribiendo);
            mensaje_escribiendo = '';

        } else if(e.keyCode == DEL_KEY){
            
            mensaje_escribiendo = mensaje_escribiendo.substring(0, mensaje_escribiendo.length - 1);

        }else {
            
            if(isASCII(e.key) && mensaje_escribiendo.length < MAX_TEXT_LEN)
            mensaje_escribiendo += e.key;

        }

    }

    online_playing_onkeyup = function (e){

        var tengoQEnviar = false;

        switch(e.keyCode) {
            case Keyboard.left.code:
            case Keyboard.left.secondaryCode:
                tengoQEnviar = Keyboard.left.pressed;
                Keyboard.left.pressed = false;
                break;

            case Keyboard.up.code:
            case Keyboard.up.secondaryCode:
                tengoQEnviar = Keyboard.up.pressed;
                Keyboard.up.pressed = false;
                
                break;
            case Keyboard.right.code:
            case Keyboard.right.secondaryCode:
                tengoQEnviar = Keyboard.right.pressed;
                Keyboard.right.pressed = false;
            
                break;
            case Keyboard.down.code:
            case Keyboard.down.secondaryCode:
                tengoQEnviar = Keyboard.down.pressed;
                Keyboard.down.pressed = false;
            
                break;
            case Keyboard.jump.code:
                tengoQEnviar = Keyboard.jump.pressed;
                Keyboard.jump.pressed = false;
                break;

        }
        if(tengoQEnviar){
            shareAction({
                type:'key',
                code:e.keyCode,
                down:false
            });
        }

        call_on_user_interaction();


    }

    online_playing_onmousemove = function(){
        
        shareAction({
            type:'mouseMov',
            vector:pj.mouse_vector
        });

        call_on_user_interaction();
    }


    playing_onmousedown = function (e) {

        if (e.button == 0)
            Mouse.left.clicked = true;
        else if (e.button == 2)
            Mouse.right.clicked = true;
            call_on_user_interaction();
    }

    playing_onmouseup = function (e) {
        if (e.button == 0)
            Mouse.left.clicked = false;
        else if (e.button == 2)
            Mouse.right.clicked = false;

            call_on_user_interaction();

    }

    playing_onkeydown = function (e){

        switch(e.keyCode) {
            case Keyboard.left.code:
            case Keyboard.left.secondaryCode:
                Keyboard.left.pressed = true;
                break;

            case Keyboard.up.code:
            case Keyboard.up.secondaryCode:
                Keyboard.up.pressed = true;
                
                break;
            case Keyboard.right.code:
            case Keyboard.right.secondaryCode:
                Keyboard.right.pressed = true;
            
                break;
            case Keyboard.down.code:
            case Keyboard.down.secondaryCode:
                Keyboard.down.pressed = true;
                break;
            case Keyboard.jump.code:
                Keyboard.jump.pressed = true;
                break;
            case Keyboard.Z.code:
                Keyboard.Z.pressed = true;
                break;
            case Keyboard.R.code:
                Keyboard.R.pressed = true;

        }


        if (testModeActive) {
            switch(e.keyCode) {
                case 80:
                    pause = !pause;
                    break;
                case 97:
                case 49:
                    console.log("Current FPS: "+10+" fps");
                    UMI.setFrameRate(10);
                    break;
                case 98:
                case 50:
                    console.log("Current FPS: "+20+" fps");
                    UMI.setFrameRate(20);
                    break;
                case 99:
                case 51:
                    console.log("Current FPS: "+30+" fps");
                    UMI.setFrameRate(30);
                    break;
                case 102:
                case 54:
                    console.log("Current FPS: "+60+" fps");
                    UMI.setFrameRate(60);
                    break;
            }
        }

        call_on_user_interaction();
    }

    playing_onkeyup = function (e){


        switch(e.keyCode) {
            case Keyboard.left.code:
            case Keyboard.left.secondaryCode:
                Keyboard.left.pressed = false;
                break;

            case Keyboard.up.code:
            case Keyboard.up.secondaryCode:
                Keyboard.up.pressed = false;
                
                break;
            case Keyboard.right.code:
            case Keyboard.right.secondaryCode:
                Keyboard.right.pressed = false;
            
                break;
            case Keyboard.down.code:
            case Keyboard.down.secondaryCode:
                Keyboard.down.pressed = false;
            
                break;
            case Keyboard.jump.code:
                Keyboard.jump.pressed = false;
                break;
            case Keyboard.Z.code:
                Keyboard.Z.pressed = false;
                break;
            case Keyboard.R.code:
                Keyboard.R.pressed = false;


        }

        call_on_user_interaction();
        

    }

    playing_onmousemove = function(){
        call_on_user_interaction();
    }




}

function call_on_user_interaction(){
    /*
    for (let i = 0; i < uplayOnUserInteraction.length; i++) {
        uplayOnUserInteraction[i].play();

    }



    uplayOnUserInteraction = new Array(0);

    */
}