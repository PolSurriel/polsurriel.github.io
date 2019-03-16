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

    static top = {
        code:87,
        secondaryCode:38,
        pressed:false,

    };

    static bottom = {
        code:83,
        secondaryCode:40,
        pressed:false,

    };

    static jump = {
        code:32,
        secondaryCode:9999999,
        pressed:false,

    }

}

class TouchPad {

}



if(!isMobileDevice()){

    window.onmousedown = function (e) {
        Mouse.left.clicked = true;
    }

    window.onmouseup = function (e) {
        Mouse.left.clicked = false;
    }

    window.onkeydown = function (e){

        switch(e.keyCode) {
            case Keyboard.left.code:
            case Keyboard.left.secondaryCode:
                Keyboard.left.pressed = true;
                break;

            case Keyboard.top.code:
            case Keyboard.top.secondaryCode:
                Keyboard.top.pressed = true;
                
                break;
            case Keyboard.right.code:
            case Keyboard.right.secondaryCode:
                Keyboard.right.pressed = true;
            
                break;
            case Keyboard.bottom.code:
            case Keyboard.bottom.secondaryCode:
                Keyboard.bottom.pressed = true;
                break;
            case Keyboard.jump.code:
                Keyboard.jump.pressed = true;
                break;
        }


    }

    window.onkeyup = function (e){

        switch(e.keyCode) {
            case Keyboard.left.code:
            case Keyboard.left.secondaryCode:
                Keyboard.left.pressed = false;
                break;

            case Keyboard.top.code:
            case Keyboard.top.secondaryCode:
                Keyboard.top.pressed = false;
                
                break;
            case Keyboard.right.code:
            case Keyboard.right.secondaryCode:
                Keyboard.right.pressed = false;
            
                break;
            case Keyboard.bottom.code:
            case Keyboard.bottom.secondaryCode:
                Keyboard.bottom.pressed = false;
            
                break;
            case Keyboard.jump.code:
                pj.can_splash = true; //esto tiene sus razones
                Keyboard.jump.pressed = false;
                break;

        }
        


    }




}else {

    function onJump (e){

    }

    function touchPadEvent (e){
        console.log(e.type);
    }




}