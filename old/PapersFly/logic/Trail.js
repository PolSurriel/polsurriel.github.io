class Trail {


    lines = new Array();

    constructor(){

    }

    addLine(line){
        this.lines.push(line);
    }

    getPoint(iPlusU){   
        iPlusU = iPlusU% (this.lines.length);     
        var index = Math.floor(iPlusU);
        var line = this.lines[index];
        var u = iPlusU - index;

        return new SuperVector(line.Px(u),line.Py(u),line.Pz(u));
        
    }

    Px(i,u){
        return this.lines[i].Px(u);
    }

    Py(i,u){
        return this.lines[i].Py(u);
    }

    Pz(i,u){
        return this.lines[i].Pz(u);
    }

    draw(){
        
        for (let i = 0; i < this.lines.length; i++) {
            for (let u = 0; u < 1; u+= 1/20) {
                let p = this.getPoint(u+i);
                push();
                Brush.translate(p.x,p.y,p.z);
                fill(0);
                sphere(3,3)
                pop();                
            }
            
        }
    }
    

    
    


}