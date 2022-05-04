var TRIANGULAR = true;

class PolygonalObject {

    poly;
    maya;
    triangles = [];

    constructor(poly, triangular){
        
        this.poly = poly;

        poly.push(poly[0])
        if(triangular === undefined || triangular == false){
            this.poly = poly;
            
        }else {

            var mayaDePuntos;
            var times = 0;

            do {
                times ++;
                mayaDePuntos = [];

                var maxY = 0;
                var maxX = 0;
                var maxZ = 0;
                var minX = Number.MAX_SAFE_INTEGER;
                var minY = Number.MAX_SAFE_INTEGER;
                var minZ = Number.MAX_SAFE_INTEGER;
                for (let i = 0; i < poly.length; i++) {

                    if(poly[i].x < minX){
                        minX = poly[i].x; 

                    }else if (poly[i].x > maxX){
                        maxX = poly[i].x;
                    }

                    if(poly[i].y < minY){
                        minY = poly[i].y;  
                    }else if (poly[i].y > maxY){
                        maxY = poly[i].y;
                    }

                    if(poly[i].z < minZ){
                        min = poly[i].z;  
                    }else if (poly[i].z > maxZ){
                        maxZ = poly[i].z;
                    }

                }

                

                var inc = 40;
                for (let x = minX; x < maxX; x+= inc) {
                    for (let y = minY; y < maxY; y+= inc) {
                        if(Collider.detector.pointInsidepPolyVector({x:x,y:y}, poly) && !Collider.detector.circleToPolygonSuperVector(x, y, 10, poly)){
                            mayaDePuntos.push({x:x,y:y});
                        }
                    }
                }


                for (let i = 0; i < mayaDePuntos.length; i++) {
                    mayaDePuntos[i].connected = 0;
                }


                if ( mayaDePuntos.length > 1){
                for (let i = 0; i < poly.length-1; i+=2) {
                    var minDistance = Number.MAX_SAFE_INTEGER;
                    var minDistanceIndex = 0;
                    for (let j = 0; j < mayaDePuntos.length; j++) {
                        var distance = new Vector2D(mayaDePuntos[j].x - poly[i].x, mayaDePuntos[j].y - poly[i].y).getMagnitude();
                        if(mayaDePuntos[j].connected < 2 && distance < minDistance){
                            minDistanceIndex = j;
                            minDistance = distance;

                        }   
                    }
                    
                    mayaDePuntos[minDistanceIndex].connected+=2;
                    poly[i].connected = mayaDePuntos[minDistanceIndex];
                    poly[i+1].connected = mayaDePuntos[minDistanceIndex];
                    
                }

                for (let i = 1; i < poly.length-1; i+=2) {
                    poly[i].connected2 = poly[i+1].connected;
                }


                for (let i = 0; i < poly.length-1; i+=2) {
                    this.triangles.push( [
                        poly[i],
                        poly[i+1],
                        poly[i].connected
                    ]);

                    if(poly[i+1].connected2)
                    this.triangles.push( [
                        poly[i+1],
                        poly[i+1].connected2,
                        poly[i+2]
                    ]);


                    if(poly[i+1].connected2)
                    this.triangles.push( [
                        poly[i].connected,
                        poly[i+1],
                        poly[i+1].connected2
                    ]);
                    


                }

                if(mayaDePuntos.length > 1 && poly.length > 3){
                    var newPoly = new Array();



    
                    for (let i = 0; i < poly.length-1; i+=2) {
                        
                        if(times%2==1){
                            if(!newPoly.includes(poly[i].connected)) newPoly.push(poly[i].connected);
                            if(!newPoly.includes(poly[i+1])) newPoly.push(poly[i+1]);
                            if(poly[i+1].connected2)if(!newPoly.includes(poly[i+1].connected2)) newPoly.push(poly[i+1].connected2);

                        }else {
                            if(!newPoly.includes(poly[i+1].connected)) newPoly.push(poly[i+1].connected);
                            if(poly[i+1].connected2) if(!newPoly.includes(poly[i+1].connected2)) newPoly.push(poly[i+1].connected2);
                            


                        }
    
                    }

                    newPoly.push(newPoly[0]);
                    poly = newPoly;
                    
                    
                    this.poly = poly;

                }
            }

            }while(mayaDePuntos.length > 1 && poly.length > 3);

            this.maya = mayaDePuntos;

        }
        

        console.log(this.poly.length)


    }

    draw(){

        /*
        fill(255,0,0);
        beginShape();
        for (let i = 0; i < this.poly.length; i++) {
            vertex(this.poly[i].x,this.poly[i].y,this.poly[i].z);
        }
        endShape();

        fill(255)
        for (let i = 0; i < this.poly.length; i++) {
            ellipse(this.poly[i].x,this.poly[i].y, 15,15);
        }*/
        
   
    }

    debugDraw(){

        fill(0,100,50,100);
        stroke(0,255,0);
        for (let i = 0; i < this.triangles.length; i++) {
            if(this.triangles[i].length == 3)
            triangle(this.triangles[i][0].x,this.triangles[i][0].y,this.triangles[i][1].x,this.triangles[i][1].y,this.triangles[i][2].x,this.triangles[i][2].y);
            
        }

        noStroke();
        fill(0,0,255);
        for (let i = 0; i < this.maya.length; i++) {
            ellipse(this.maya[i].x,this.maya[i].y,5,5);            
        }


    }




}


function trianglesHas(point, triangles){
    
    for (let i = 0; i < triangles.length; i++) {
        if (point == triangles[i][0] ||point == triangles[i][1] ||point == triangles[i][2]){
            return true;
        }
        
    }

    return false;

}