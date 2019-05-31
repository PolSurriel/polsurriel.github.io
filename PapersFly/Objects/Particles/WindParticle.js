const WIND_PATRICLE_TYPES={
    WHITE:0,
    GRAY:1,
    DARK:2
}

class WindParticle {
    
    type;

    position;
    angle;
    size;
    opacity = 0;
    maxOpacity;
    direction;
    
    movementSpeed;
    reducingSpeed;

    constantMovSpeed = 600;

    time = 0;

    texture;

    
    constructor(x, y, z, force, type, distance, forceMagnitude){

        this.position = new SuperVector(x,y,z);
        this.angle = force.getAngle();
        this.direction = force.getUnitaryVector();

        this.constantMovSpeed*= (forceMagnitude*2);
        

        if(type === undefined || type == WIND_PATRICLE_TYPES.WHITE){
            this.type = WIND_PATRICLE_TYPES.WHITE;
            this.size = {
                x:200,
                y:30
            };
            this.movementSpeed = new Increment(this.constantMovSpeed, 0.5, 1);

            this.maxOpacity = 70;
        }else {

            this.type = WIND_PATRICLE_TYPES.GRAY;
            this.size = {
                x:400,
                y:30
            };
            this.movementSpeed = new Increment(this.constantMovSpeed, 0.5, 1);
            this.maxOpacity = 70;
            
        }


        var totalTime = distance / this.constantMovSpeed;

        
        this.reducingSpeed = new Increment(this.size.x, 0,0.5,totalTime-1,totalTime+Math.random()-0.5);
        this.size.x = 0;


    }

    update(){
        this.position.x += this.direction.x*this.movementSpeed.umiInc();
        this.position.y += this.direction.y*this.movementSpeed.umi();

        this.size.x = this.reducingSpeed.valueInc();

    }    

    draw(){


        push();
        noStroke();
        translate(this.position.x,this.position.y, this.position.z)
        
        Brush.rotateZ(this.angle);
        Brush.rotateX(debug_rotation.y)
        
        if(this.type == WIND_PATRICLE_TYPES.WHITE)
        texture(Global.default_windParticle_src);
        else 
        texture(Global.gray_windParticle_src);
        
        plane(this.size.x,this.size.y);
        

        pop();

    }


}