class Enemy extends RealObject {

    forceVector;
    directionVector;

    radio = 7;

    last_x;
    last_y;



    constructor(x, y) {
        super(x, y);
        this.setSpeed();

       
        
        this.forceVector = new Vector2D(x-pj.x, y-pj.y).getUnitaryVector();
        this.directionVector = new Vector2D(x-pj.x, y-pj.y);
    }

    setSpeed(){
        this.speed = UMI.getSpeed(Math.random() * (100 - 80) + 80);
        this.rotationDelay = UMI.getDelay(0.05);


    }

    moveFront(){
        this.x += this.directionVector.x*this.speed;
        this.y += this.directionVector.y*this.speed;
    }

    move() {
        var x = this.x+windowWidth/2;
        var y = this.y+windowHeight/2;

        var playerX = pj.x+windowWidth/2;
        var playerY = pj.y+windowHeight/2;

        this.forceVector = new Vector2D(playerX-x,playerY-y).getUnitaryVector();

        this.directionVector.x += this.forceVector.x/this.rotationDelay;
        this.directionVector.y += this.forceVector.y/this.rotationDelay;

        this.directionVector.convertToUnitary();

        this.moveFront();
    }

    update() {
        this.last_x = this.x;
        this.last_y = this.y;

        if( new Vector2D(pj.x-this.x,pj.y-this.y).getMagnitude() > distance_to_destroy ){
            this.destroy();
        }
        this.move();
    }

    draw() {
        //this.drawVectors();
        drawingContext.shadowOffsetX = 0;
        drawingContext.shadowOffsetY = 0;
        drawingContext.shadowBlur = 20;
        drawingContext.shadowColor = "red";
        fill(255,30,30,155);
        stroke('red');
        ellipse(UMI.toPixel(Camera.translationX(this.x)) , UMI.toPixel(Camera.translationY(this.y)) ,UMI.toPixel(this.radio*2), UMI.toPixel(this.radio*2));
        

    }

    drawVectors(){
        this.drawForce();
        this.drawDirection();
    }

    drawForce(){
        stroke('red');
        line(UMI.toPixel(Camera.translationX(this.x)),UMI.toPixel(Camera.translationY(this.y)),
                        UMI.toPixel(Camera.translationX(this.x+this.forceVector.x*100)),UMI.toPixel(Camera.translationY(this.y+this.forceVector.y*100)));
        stroke('white');
    }
    
    drawDirection(){
        stroke('green');
        line(UMI.toPixel(Camera.translationX(this.x)),UMI.toPixel(Camera.translationY(this.y)),
                        UMI.toPixel(Camera.translationX(this.x+this.directionVector.x*100)),UMI.toPixel(Camera.translationY(this.y+this.directionVector.y*100)));
        stroke('white');
    }
}
