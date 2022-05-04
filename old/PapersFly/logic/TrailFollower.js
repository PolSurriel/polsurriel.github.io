class TrailFollower {

    reference;
    trail;
    position;

    currentU = 0;

    speed = 1;

    URotArray = [{u:-1,rot:new SuperVector(0,0,0)},
                 {u:8,rot:new SuperVector(0,0,0)}, 
                 {u:11,rot:new SuperVector(0.42148106336944446,-0.9000000000000005,0)},
                 {u:15,rot:new SuperVector(0.700347199237071,-1.132356826099605,0)},
                 {u:17,rot:new SuperVector(0.700347199237071,-1.132356826099605,0)},
                 {u:20,rot:new SuperVector(-0.9145197120974492,1.2097708293775211,0)},
                 {u:22,rot:new SuperVector(0.8143668282957461,2.1840428055093777,-0.7000000000000001)},


                 {u:23,rot:new SuperVector(0.8143668282957461,2.1840428055093777,-0.7000000000000001)},
                 {u:24,rot:new SuperVector(0.8143668282957461,2.1840428055093777,-0.7000000000000001)},
                 {u:25,rot:new SuperVector(0.8143668282957461,2.1840428055093777,-0.7000000000000001)},
                 {u:26,rot:new SuperVector(0.8143668282957461,2.1840428055093777,-0.7000000000000001)},

                 
                ]

                


    constructor (reference, trail) {
        this.reference = reference;
        this.trail = trail;

        this.position = this.trail.getPoint(0);
    }

    update(){


        var currentIndex = 0;

        for (let i = 0; i < this.URotArray.length-1; i++) {
            if(this.URotArray[i].u > this.currentU){
                currentIndex = i-1;
                break;
            }
            
        }


        debug_rotation = new SuperVector(
            map(this.currentU, this.URotArray[currentIndex].u,this.URotArray[currentIndex+1].u,this.URotArray[currentIndex].rot.x,this.URotArray[currentIndex+1].rot.x,true ),
            map(this.currentU, this.URotArray[currentIndex].u,this.URotArray[currentIndex+1].u,this.URotArray[currentIndex].rot.y,this.URotArray[currentIndex+1].rot.y,true ),
            map(this.currentU, this.URotArray[currentIndex].u,this.URotArray[currentIndex+1].u,this.URotArray[currentIndex].rot.z,this.URotArray[currentIndex+1].rot.z,true ),
          );


        var onSet  = this.currentU;
        if (onSet < 0) onSet = 0;

        var minDist = 99999;
        var minDistU = onSet;

        for (let u = 0; u < 1.5; u+=1/100) {
            var dist = this.trail.getPoint(onSet+u).distance(this.reference.position);
            if(dist < minDist){
                minDist = dist;
                minDistU = u;
            }
        }


        if(onSet+minDistU > this.currentU){
            this.currentU += UMI.speed(this.speed);
        }

        this.position = this.trail.getPoint(this.currentU+0.5)
    
        //this.position = this.trail.getPoint(onSet+minDistU);
        //this.currentU = onSet+minDistU;

        
    }


    draw(){

        push();
        noStroke()
        fill(255,0,0)
        Brush.translate(this.position.x,this.position.y,this.position.z);
        sphere(10,10)
        pop();
    }


}