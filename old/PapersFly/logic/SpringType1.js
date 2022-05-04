class SpringType1 {

    origin_pos;
    position;
    velocity = {x:0,y:0, z:0};
    returnForce;

    friction;

    constructor(origin_pos, returnForce, friction){
        this.origin_pos = origin_pos;
        this.returnForce = returnForce;
        this.position = new SuperVector(origin_pos.x,origin_pos.y,origin_pos.z);

        this.friction = friction;
    }

    addForce(x, y, z){
        this.velocity.x += x;
        this.velocity.y += y;
        this.velocity.z += z;

    }

    update(){
        var invel = new SuperVector( -this.velocity.x, -this.velocity.y, -this.velocity.z );
        invel.toUnitary();

        var opovel = new SuperVector(this.origin_pos.x-this.position.x,this.origin_pos.y-this.position.y, this.origin_pos.z-this.position.z);
        
        var mag = opovel.getMagnitude();
        opovel.toUnitary();
      
        
        this.velocity.x += opovel.x*(mag/this.returnForce) + invel.x*this.friction;
        this.velocity.y += opovel.y*(mag/this.returnForce) + invel.y*this.friction;
        this.velocity.z += opovel.z*(mag/this.returnForce) + invel.z*this.friction;

        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;
        
        
    }


}

/*

var d = new Dock(new SuperVector(0,0,0), 10, 0.2);
var d2 = new Dock(new SuperVector(-100,-100,0), 10, 0.2);
d.addForce(30,20,0);
d2.addForce(30/2,20/2,0);
d.position.x=100 // para efectos circulares

function draw(){ 

  d.update();
  d2.update();


  ellipse(d.position.x, d.position.y, 10,10);
  ellipse(d2.position.x, d2.position.y, 10,10);


*/





