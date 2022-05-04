class Fractal {

    angleIN;
    angleOUT;

    drawingContext;
    mask;

    angle;

    constructor(position, width, height, angleIN, angleOUT){
        this.position = position;
        this.drawingContext = createGraphics(width, height);
        this.angleIN = angleIN;
        this.angleOUT = angleOUT;

        this.angle = Math.abs(angleIN- angleOUT);

        this.drawingContext.translate(this.drawingContext.width/2, this.drawingContext.height/2);


        this.update = function(){}    
    }

    


    draw(){

        push();
        
        Brush.translate(this.position.x,this.position.y,this.position.z);
        Brush.rotateZ(this.angleIN);
        noStroke();
        for (let a = 0; a < TWO_PI; a+= this.angle) {
            Brush.rotateZ(this.angle);
            texture(this.drawingContext);
            plane(this.drawingContext.width,this.drawingContext.height);
        }
        pop();

    }




}