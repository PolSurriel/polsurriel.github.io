/*

No quisimos que la cámara siguiera al personaje porque entonces este se hubiera
visto todo el rato en el centro. Este efecto no nos gusta mucho para el tipo de 
gameplay que hemos implementado.

Se nos ocurrión que podíamos hacer un objeto que siguiera a otro objeto y este
tuviera un movimiento fluido con una velocidad. Para ello hicimos esta clase,
imaginándonos diferentes márgenes donde la velocidad de aproximación cambia.

De esta manera, cuanto más lejos se encuentra el jugador de este objeto,
más rápido se acerca a él. Simplemente usando una instancia de este objeto
como referencia para la cámara obtuvimos una camara que nos satisfajo al fin.

Sin embargo, tuvimos la idea de hacer zooms aleatorios. Por lo que añadimos un
método que aleatoriamente se llamaría desde el gameloop.

Siguiente lectura recomendada: UserEvents.js


*/


class FollowerReference {
    
    position;
    following;
    margin = 70;
    speed = 4;

    constructor(obj){
        this.position = obj.position;
        this.following = obj;

    }

    
    update(){        

        //Acercarse hacia el personaje con una magnitud relativa 
        //a la distancia del personaje con el centro de la referencia
        
        var vectorToPlayer = [this.following.position.x-this.position.x,this.following.position.y-this.position.y];
        

        var magnitude = Math.sqrt(vectorToPlayer[0]*vectorToPlayer[0]+vectorToPlayer[1]*vectorToPlayer[1]);
        
        if(magnitude > this.margin){
            var unitaryVectorToPlayer = [vectorToPlayer[0]/magnitude, vectorToPlayer[1]/magnitude];

            this.position.x += this.speed*UMI.speed(unitaryVectorToPlayer[0]*(magnitude/2));
            this.position.y += this.speed*UMI.speed(unitaryVectorToPlayer[1]*(magnitude/2));
        
        } else if (magnitude > 0){
            var unitaryVectorToPlayer = [vectorToPlayer[0]/magnitude, vectorToPlayer[1]/magnitude];

            this.position.x += this.speed*UMI.speed(unitaryVectorToPlayer[0]*(magnitude/3));
            this.position.y += this.speed*UMI.speed(unitaryVectorToPlayer[1]*(magnitude/3));
        
        }

        if(!( this.position.x < Number.MAX_VALUE )) this.position.x = 0;
        if(!( this.position.y < Number.MAX_VALUE )) this.position.y = 0;
        if(this.position.x == Infinity ||this.position.x == -Infinity) this.position.x = 0;
        if(this.position.y == Infinity ||this.position.y == -Infinity) this.position.y = 0;

        
    }

    draw(){
        this.following.draw()
        cameraTrail.draw()
    }

}