class Wind {

    force;
    point1;
    point2;

    forceMagnitude;

    wind_particles;

    margin = 70;
    perpendicular;
    length;

    time = 0;

    constructor(force, point1, point2){
        
        this.point1 = point1;
        this.point2 = point2;

        this.forceMagnitude = force;

        this.length = new Vector2D(point1.x-point2.x, point1.y-point2.y).getMagnitude();

        this.force = new Vector2D(point2.x-point1.x, point2.y-point1.y).getUnitaryVector();
        


        this.perpendicular = new Vector2D(this.force.y, -this.force.x).getUnitaryVector();

        this.wind_particles = new Array(100);
        this.wind_particles.setAllNull();


        

    }

    update (){

        this.time += UMI.speed(100);

        this.wind_particles.update(); 
        
        for (let i = 0; i < this.wind_particles.length; i++) 
            if(this.wind_particles[i] != null && this.wind_particles[i].size.x <= 6)
                this.wind_particles.destroy(i);
                        
                
        if(this.time > 3 && this.wind_particles.added < 100){

            this.time = 0;
            var sentido = Math.floor(Math.random() * (2));
            if (sentido == 0) sentido = -1;
            var distToCenter = Math.random() * (this.margin);
            

            this.wind_particles.addObj(new WindParticle(this.perpendicular.x*distToCenter*sentido,this.perpendicular.y*distToCenter*sentido,Math.random() * (this.margin)*sentido,this.force, Math.floor(Math.random() * (2)), this.length, this.forceMagnitude));
        }

    }


    draw () {
        //Brush.translate(UMI.px(this.point1.x), UMI.px(this.point1.y), 0);
        Brush.translate(this.point1.x, this.point1.y, 0);
        this.wind_particles.draw();
    }

    collisionReact(player){
        if(Collider.objectDetector.playerToWind(player, this)){
            player.addForce(this.force.x*this.forceMagnitude, this.force.y*this.forceMagnitude, 0);
          }
    }

}


