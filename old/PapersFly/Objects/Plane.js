class Plane {

    position;
    
    normal;
    d;


    texture;

    constructor(position, d, normal){
        this.position = position;
        this.d = d;

        if(normal ===undefined){

        }else {
            this.normal = normal;
        }

    }

    applyTexture(){
        texture(this.texture);

    }

    draw(){

        noStroke();
        Brush.translate(this.position.x,this.position.y,this.position.z);
        plane(1000);


        var scale = -1000;

        stroke(0,255,0)
        line(this.position.x, this.position.y, this.position.z,
            this.d.x*scale+this.position.x, this.d.y*scale+this.position.y, this.d.z*scale+this.position.z,);
            
        scale = -100;
        stroke(255,0,0)
        line(this.position.x, this.position.y, this.position.z,
            this.normal.x*scale+this.position.x, this.normal.y*scale+this.position.y, this.normal.z*scale+this.position.z,);

    }

    distance (point){
        
        return SuperVector.dotProduct(this.normal, new SuperVector(point.x-this.position.x, point.y-this.position.y, point.z-this.position.z));
        
 
     }

    distanceABS (point){
       
        return Math.abs(this.distance(point));
    }

}