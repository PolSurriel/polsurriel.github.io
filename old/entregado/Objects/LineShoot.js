class LineShoot extends RealObject {

    direction;

    rebounds = 0;

    speed;

    size = 20;

    constructor(x, y,direction){
        super(x, y);
        this.direction = direction;

        this.speed = UMI.getSpeed(200);
        
        UMI.realObjects.push(this);
        UMI.LogicObjects.push(this);        

    }

    update(){

        this.x += this.direction.x*this.speed;
        this.y += this.direction.y*this.speed;        

        if(this.rebounds > 3){
            this.destroy();
            
        }

    }

    draw(){
        stroke('red');
        line(UMI.toPixel(Camera.translationX(this.x)),UMI.toPixel(Camera.translationY(this.y)),
        UMI.toPixel(Camera.translationX(this.x+this.direction.x*this.size)),UMI.toPixel(Camera.translationY(this.y+this.direction.y*this.size)));
        stroke('white');        
    }

    destroy(){
        UMI.realObjects.splice(UMI.realObjects.indexOf(this), 1);
        UMI.LogicObjects.splice(UMI.LogicObjects.indexOf(this), 1);
        linesShoot.splice(linesShoot.indexOf(this), 1);
        delete this;
    }

}