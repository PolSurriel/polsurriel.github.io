class Particle extends RealObject {

    z;

    size = 2;
    opacity = 200;

    reference_x = 0;
    reference_y = 0;

    sizeSpeed;
    opSpeed;

    orientation;

    draw_mode;

    setSpeed(){
        this.sizeSpeed = UMI.getSpeed(1.5);
        this.opSpeed = UMI.getSpeed(250);
    
    }

    constructor(x, y, z, orientation, draw_mode, color_mode) {
        super(x, y);
        this.z = z;
        this.draw_mode = draw_mode;
        this.color_mode = color_mode;

        this.orientation = orientation;

        this.setSpeed();

       
    }


    update(){
        this.size -= this.sizeSpeed;
        this.opacity -= this.opSpeed;

        if (this.opacity <= 0) this.destroy();


    }

    draw(){

        var x = this.reference_x+this.x;
        var y = this.reference_y+this.y;

        var RP = new Vector2D(x-this.reference_x, y-this.reference_y); //direccion referencia to point a ampliar con z
        
        var m = RP.getMagnitude(); 

        RP.convertToUnitary();
        
        RP.x *= this.z+m;
        RP.y *= this.z+m; 

        this.z /=4;

        var x_on_draw = UMI.toPixel(Camera.translationX(RP.x+this.reference_x));
        var y_on_draw = UMI.toPixel(Camera.translationY(RP.y+this.reference_y));

        var size_on_draw = UMI.toPixel(this.size);

        var points = [ 
            [x_on_draw-size_on_draw-this.z, y_on_draw-size_on_draw-this.z],
            [x_on_draw+size_on_draw+this.z, y_on_draw-size_on_draw-this.z],
            [x_on_draw+size_on_draw+this.z, y_on_draw+size_on_draw+this.z],
            [x_on_draw-size_on_draw-this.z, y_on_draw+size_on_draw+this.z]
        ];


        
        points.forEach(point => {
            
            var x = (point[0] - x_on_draw);
            var y = (point[1] - y_on_draw);
            
            var cos = Math.cos(this.orientation);
            var sin =  Math.sin(this.orientation);

            point[0] = x_on_draw + cos * x - sin * y;
            point[1] = y_on_draw + sin * x + cos * y;    
            

        });
        
        drawingContext.shadowOffsetX = 0;
        drawingContext.shadowOffsetY = 0;
        drawingContext.shadowBlur = 10;

        if(this.draw_mode == 1) drawingContext.shadowColor = "blue";
        else if (this.draw_mode == 2) drawingContext.shadowColor = "orange";

        if(this.color_mode != 1 && this.draw_mode == 2) fill (230);
        else if (this.color_mode == 1) fill(155,0,0,this.opacity);
        else fill(20,205,105,this.opacity);

        stroke(100,0,0,this.opacity);
    
        beginShape();
        vertex(points[0][0], points[0][1]);
        vertex(points[1][0], points[1][1]);
        vertex(points[2][0], points[2][1]);
        vertex(points[3][0], points[3][1]);
        vertex(points[0][0], points[0][1]);
        endShape();


        fill(255);
        stroke(255);

        drawingContext.shadowBlur = 0;

    }





}