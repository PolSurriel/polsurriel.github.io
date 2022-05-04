class AirPlane {

    position;
    velocity = new SuperVector(1,0,0);
    mass = 0.2;
    friction = 0.01;
    wiggle;

    MAX_VELOCITY = 10;

    obj;
    circleColliderRadio = 10;

    following = {update:function(){}}

    shadowPoint;
    shadowPlane;
    sPoints = new Array();

    constructor (x, y, z){
        this.position = new SuperVector(x,y,z);
        this.obj = new Object3D(Global.airplane_model, Global.airplane_texture);

        this.wiggle = new Wiggle1D(0.5, 0.2);
    }

    addForce(x,y,z){
        this.velocity.x += x;
        this.velocity.y += y;
        this.velocity.z += z;
    }



    update (){

        if( this.velocity.getMagnitude() > this.MAX_VELOCITY){
            this.velocity.toUnitary();
            this.velocity.x *= this.MAX_VELOCITY;
            this.velocity.y *= this.MAX_VELOCITY;
            this.velocity.z *= this.MAX_VELOCITY;
        }

        this.wiggle.update();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;

        
        //this.position.y = 0;
        // this.position.z += this.velocity.z;

        this.velocity.y += Global.gravity*this.mass;
        
        if(Keyboard.up.pressed){
            var zVel = new Vector2D(this.velocity.x, this.velocity.y);
            zVel.rotate(0.1);

            this.velocity.x = zVel.x;
            this.velocity.y = zVel.y;

        } else if(Keyboard.down.pressed){
            var zVel = new Vector2D(this.velocity.x, this.velocity.y);
            zVel.rotate(-0.1);

            this.velocity.x = zVel.x;
            this.velocity.y = zVel.y;
            
        }

        var inv_vel =  new Vector2D(-this.velocity.x, -this.velocity.y);
        inv_vel.convertToUnitary();

        this.velocity.x += inv_vel.x*this.friction;
        this.velocity.y += inv_vel.y*this.friction;

    }

    evalShadow(plane) {
        this.shadowPlane = plane;
        var collisionWithPlane = Collider.getCollisionRectToPlane(plane.position, plane.normal, Global.light.position, this.position);

        if (SuperVector.distance(this.position, collisionWithPlane) < SuperVector.distance(Global.light.position, collisionWithPlane)) {
            this.shadowPoint = collisionWithPlane;
        }
    }

    rotateToDraw() {
        var aux = (this.velocity.getMagnitude()/4);
        if (aux < 0.5) aux = 0.5;

        Brush.rotateZ(1+PI);
        Brush.rotateX(-0.7);
        Brush.rotateY(0.8+(this.wiggle.value/aux));
        Brush.rotateZ(new Vector2D(this.velocity.x, this.velocity.y).getAngle());
    }
    
    draw () {

        var puntoMedio = new SuperVector(0,0,0);

        // push()        
        
        // stroke(200);

        // Brush.translate(this.shadowPoint.x, this.shadowPoint.y, this.shadowPoint.z);
        // //sphere(10)
        // for (let i = 0; i < this.obj.model.vertices.length; i++) {
        //     var p = Collider.getCollisionRectToPlane(this.shadowPlane.position, this.shadowPlane.normal, Global.light.position, this.obj.model.vertices[i]);
        //     this.sPoints.push(p);
        //     puntoMedio.x += p.x;
        //     puntoMedio.y += p.y;
        //     puntoMedio.z += p.z;
        // }

        // puntoMedio.x /= this.sPoints.length;
        // puntoMedio.y /= this.sPoints.length;
        // puntoMedio.z /= this.sPoints.length;

        // Brush.translate(-puntoMedio.x, -puntoMedio.y, -puntoMedio.z);

        // for (let i = 1; i < this.sPoints.length; i++) {
        //     line(this.sPoints[i].x,this.sPoints[i].y,this.sPoints[i].z,
        //         this.sPoints[i-1].x,this.sPoints[i-1].y,this.sPoints[i-1].z);
        // }

        // pop()

        push()
        //Brush.translate(UMI.px(this.position.x), UMI.px(this.position.y), UMI.px(this.position.z));
        Brush.translate(this.position.x, this.position.y, this.position.z);
        //sphere(10)

        this.rotateToDraw();
        

        stroke(220,220,220)
        this.obj.applyTexture();
        this.obj.draw();


        this.sPoints = new Array()
               

        pop()
        
        if (this.shadowPoint != undefined) {
            this.drawShadow();
        }

    }

    drawShadow() {
        

        var lightVector = new SuperVector(Global.light.position.x-this.shadowPoint.x, Global.light.position.y-this.shadowPoint.y, Global.light.position.z-this.shadowPoint.z);
        var lightToPlaneVector = new SuperVector(Global.light.position.x-this.position.x, Global.light.position.y-this.position.y, Global.light.position.z-this.position.z);
        
        // Si la distancia entre el objeto de luz y el objeto proyectado es = 1, la distancia al plano = 1/dist;
        var scalar = lightVector.getMagnitude() / lightToPlaneVector.getMagnitude();
        
        
        Brush.translate(this.shadowPoint.x, this.shadowPoint.y, this.shadowPoint.z);
        Brush.scale(scalar,scalar,0);

        var magnitude =  lightToPlaneVector.getMagnitude();
        
        // SON ANGULOS DIRECCIONALES
        var angleX = Math.acos(lightToPlaneVector.x/magnitude);
        var angleY = Math.acos(lightToPlaneVector.y/magnitude);
        //var angleZ = Math.acos(lightToPlaneVector.z/magnitude);
        
        
        Brush.shearX(angleX);
        Brush.shearY(angleY);
        //Brush.shearZ(angleZ) --> No hay z porque hemos escalazo a 0, las somras son planas. La tierra, no.
        
        
        this.rotateToDraw();
        
        noStroke();
        fill(0,0,0,200-lightToPlaneVector.getMagnitude()/scalar);
        this.obj.draw();

        blendMode(BLEND);
    }

}