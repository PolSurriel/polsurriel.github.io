class Cloth {

    points = new Array (0);

    rotationX = 1;
    rotationY = -1;
    rotationZ = 1;
    position;

    planeCollision;

    w;
    h;

    timesCalled = 0;
    constructor (position, pointsNumber, width, height, rotationX, rotationY, rotationZ) {
        
        this.rotationX = rotationX;
        this.rotationY = rotationY;
        this.rotationZ = rotationZ;
        
        this.w = width;
        this.h = height;
        
        this.position = position;

        var incX = width/pointsNumber;
        var incY = height/pointsNumber;

        this.incX=incX;
        this.incY=incY;

        var ic = 0;
        for (let i = 0; i < width; i+= incX) {
            this.points[ic] = new Array();
            for (let j = 0; j < height; j+=incY) {
                var color = Math.floor(Math.random() * (256-150))+150;
                this.points[ic].push({
                    pos:new SpringType1(
                        new SuperVector(
                        i-width/2 + Math.random() * (incX/2 - (-incX/2)) + (-incX/2),
                        j-height/2 + Math.random() * (incY/2 - (-incY/2)) + (-incY/2),
                        Math.random() * (incY/2 - (-incY/2)) + (-incY/2)),
                        3,2),
                    connected: [],
                    color:color
                }) 

                
            }
            ic++;
        }

        for (let i = 0; i < this.points.length; i++) {
            for (let j = 0; j < this.points.length; j++) {
                this.points[i][j].index = {i:i, j:j};
                this.points[i][j].origin_pos = {x:this.points[i][j].pos.position.x, y:this.points[i][j].pos.position.y, z:this.points[i][j].pos.position.z}
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            for (let j = 0; j < this.points.length; j++) {
                if (i-1 >= 0){
                    this.points[i][j].connected.push(this.points[i-1][j]);
                }

                if (j-1 >= 0){
                    this.points[i][j].connected.push(this.points[i][j-1]);
                }

                if (j+1 < pointsNumber-1){
                    this.points[i][j].connected.push(this.points[i][j+1]);
                }

                if (i+1 < pointsNumber-1){
                    this.points[i][j].connected.push(this.points[i+1][j]);
                }

                if (i-1 >= 0 && j-1 >= 0){
                    this.points[i][j].connected.push(this.points[i-1][j-1]);
                }

                if (j+1 < pointsNumber-1 && i+1 < pointsNumber-1){
                    this.points[i][j].connected.push(this.points[i+1][j+1]);
                }

                if (i-1 >= 0 &&j+1 < pointsNumber-1){
                    this.points[i][j].connected.push(this.points[i-1][j+1]);
                }

                if ( j-1 >= 0 && i+1 < pointsNumber-1){
                    this.points[i][j].connected.push(this.points[i+1][j-1]);
                }

            }
        }


        var aux = new Vector2D(0,1);
        aux.rotate(this.rotationY+0.45);
        var d = new SuperVector(aux.x,0,aux.y);

        aux = new Vector2D(1,0);
        aux.rotate(this.rotationY-0.45);
        var n = new SuperVector(-aux.y,0,-aux.x);

        n.rotateX(this.rotationX);

        this.planeCollision = new Plane(this.position,d,n);
    }

    addForce(i, j, x, y, z){
        this.points[i][j].velocity = new SuperVector(x, y, z);
        if(x > 0 || y > 0 || z > 0){
            for (let l = 0; l < this.points[i][j].connected.length; l++) {
                var ni = this.points[i][j].connected[l].index.i;
                var nj = this.points[i][j].connected[l].index.j;

                this.addForceRecursive(ni, nj, x/7, y/7, z/7, 1);
            }
        }
    }

    addForceRecursive(i, j, x, y, z, calls){

        this.timesCalled++;
        if(calls < 5){
            this.points[i][j].pos.position.x += x;
            this.points[i][j].pos.position.y += y;
            this.points[i][j].pos.position.z += z;
    
            if(x > 0 || y > 0 || z > 0){
                for (let l = 0; l < this.points[i][j].connected.length; l++) {
                    var ni = this.points[i][j].connected[l].index.i;
                    var nj = this.points[i][j].connected[l].index.j;
    
                    this.addForceRecursive(ni, nj, x/7,y/7,z/7, calls+1);
                }
            }

        }
    }

    update(){
        for (let i = 0; i < this.points.length; i++) {
            for (let j = 0; j < this.points[i].length; j++) {
                this.points[i][j].pos.update();                
            }
        }
    }

    draw(){

        push();
        Brush.translate(this.position.x,this.position.y,this.position.z);
        Brush.rotateY(this.rotationY);
        Brush.rotateX(this.rotationX);
        Brush.rotateZ(this.rotationZ);
        //Brush.rotateY(0.5)
        stroke(255);
        this.points.forEach(row => {
            noStroke();
            row.forEach(point => {
                fill(point.color,100);
                //ellipse(point.pos.position.x, point.pos.position.y, 5,5);

                if(point.connected.length >= 2){
                    

                    
                    beginShape();
                    vertex(point.pos.position.x, point.pos.position.y, point.pos.position.z);
                    for (let index = 0; index < 2; index++) {
                        vertex(point.connected[index].pos.position.x, point.connected[index].pos.position.y,point.connected[index].pos.position.z);
                    }
                    endShape(CLOSE);
                                    
                }

                if(point.connected.length >= 4){
                    beginShape();
                    vertex(point.pos.position.x, point.pos.position.y, point.pos.position.z);
                    for (let index = 2; index < 4; index++) {
                        vertex(point.connected[index].pos.position.x, point.connected[index].pos.position.y,point.connected[index].pos.position.z);
                    }
                    endShape(CLOSE);
                }
                
            })

            
            for (let i = 0; i < this.points.length-1; i++) {
                var p1 = this.points[this.points.length-1-i][[this.points[0].length-2]];
                var p2 = this.points[this.points.length-2-i][[this.points[0].length-2]];
                var p3 = this.points[this.points.length-2-i][[this.points[0].length-1]];
                
                fill(p1.color,10);
               
                beginShape();
                vertex(p1.pos.position.x, p1.pos.position.y, p1.pos.position.z);
    
                vertex(p2.pos.position.x, p2.pos.position.y, p2.pos.position.z);
                vertex(p3.pos.position.x, p3.pos.position.y, p3.pos.position.z);
                
                endShape(CLOSE); 
                

                
                p1 = this.points[this.points.length-1][[this.points[0].length-2-i]];
                p2 = this.points[this.points.length-2][[this.points[0].length-2-i]];
                p3 = this.points[this.points.length-2][[this.points[0].length-1-i]];
                
                fill(p1.color,10);

                beginShape();
                vertex(p1.pos.position.x, p1.pos.position.y, p1.pos.position.z);
    
                vertex(p2.pos.position.x, p2.pos.position.y, p2.pos.position.z);
                vertex(p3.pos.position.x, p3.pos.position.y, p3.pos.position.z);
                
                endShape(CLOSE); 
                
              
                

                p1 = this.points[1-1][0+i];
                p2 = this.points[1-1][1+i];
                p3 = this.points[2-1][0+i];
                
                fill(p1.color,10);

                beginShape();
                vertex(p1.pos.position.x, p1.pos.position.y, p1.pos.position.z);
    
                vertex(p2.pos.position.x, p2.pos.position.y, p2.pos.position.z);
                vertex(p3.pos.position.x, p3.pos.position.y, p3.pos.position.z);
                endShape(CLOSE); 

                
                
                if(i<this.points.length-3){
                p1 = this.points[1+i][0];
                p2 = this.points[1+i][1];
                p3 = this.points[2+i][0];
                
                fill(p1.color,10);

                
                beginShape();
                vertex(p1.pos.position.x, p1.pos.position.y, p1.pos.position.z);
    
                vertex(p2.pos.position.x, p2.pos.position.y, p2.pos.position.z);
                vertex(p3.pos.position.x, p3.pos.position.y, p3.pos.position.z);
                
                endShape(CLOSE); 
                

                }

            }


        });
        pop();

    }

    debugDraw(){
        this.planeCollision.draw();
    }


    collisionReact(player){
        if(Collider.detector.sphereToPlane(player.position, player.circleColliderRadio, this.planeCollision)){
            var vectToPlayer = SuperVector.direction(this.position, player.position);
        
            var aux = new Vector2D(vectToPlayer.x, vectToPlayer.z);
            aux.rotate(-(this.rotationY+0.45));
            
        
            vectToPlayer.x = aux.x;
            vectToPlayer.z = aux.y;
        
            var colPos = {x:this.w/2+vectToPlayer.x, y:this.h/2+vectToPlayer.y}
        
            var index = {
                      x:Math.floor(colPos.x/this.incX),
                      y:Math.floor(colPos.y/this.incY)
                    };
        
            if(index.x >= 0 && index.y >= 0 && index.x < this.points.length && index.y < this.points[0].length){
              //this.points[index.x][index.y].pos.position = new SuperVector(player.position.x, player.position.y, this.points[index.y][index.x].pos.position.z);
              var scale = 10;
              this.addForce(index.x, index.y, 50+ player.velocity.x*scale/2,player.velocity.y*scale,player.velocity.z*scale);
        
            }
            
          }
    }

}

