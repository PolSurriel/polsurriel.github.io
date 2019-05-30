class Spring {

    anchor_point;
    initial_pos;
    position;
    velocity;

    spring_distance;

    friction;
    spring_constant;
    max_deformation;
    mass;

    move;

    constructor(anchor_point, initial_pos, spring_constant, friction, max_deformation, mass){
        this.anchor_point = anchor_point;
        this.initial_pos = initial_pos;
        this.position = new SuperVector(initial_pos.x, initial_pos.y, initial_pos.z);

        this.spring_distance = new SuperVector(initial_pos.x-anchor_point.x, initial_pos.y-anchor_point.y, initial_pos.z-anchor_point.z);

        this.spring_constant = spring_constant;
        this.friction = friction;
        this.max_deformation = max_deformation;
        this.mass = mass;

        this.velocity = new SuperVector(0,0,0);
        this.move = false;
    }

    moveAnchorPoint(x,y,z) {
        this.anchor_point.x += x;
        this.anchor_point.y += y;
        this.anchor_point.z += z;
    }
    
    setPosition(x,y,z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }
    
    setAnchorPoint(x,y,z) {
        this.anchor_point.x = x;
        this.anchor_point.y = y;
        this.anchor_point.z = z;
    }

    update() {
        // this.moveAnchorPoint(0,1.3,0);

        // this.initial_pos.x = this.anchor_point.x + this.spring_distance.x;
        // this.initial_pos.y = this.anchor_point.y + this.spring_distance.y;

        var deformation = new SuperVector(this.initial_pos.x - this.position.x, this.initial_pos.y - this.position.y, this.initial_pos.z - this.position.z);
        var mouse_distance = new Vector2D(this.initial_pos.x - mouseX + windowWidth/2, this.initial_pos.y - mouseY + windowHeight/2).getMagnitude();

        if (this.initial_pos.x == 26) {
            this.initial_pos.x = this.anchor_point.x + this.spring_distance.x;
            this.initial_pos.y = this.anchor_point.y + this.spring_distance.y;    
        }

        if (!Mouse.left.clicked || this.move) {
            
            if (deformation.getMagnitude() > 0.1) {

                var force_x = this.spring_constant * deformation.x;
                var force_y = this.spring_constant * deformation.y;
                var force_z = this.spring_constant * deformation.z;
                
                var a_x = force_x / this.mass;
                var a_y = force_y / this.mass;
                var a_z = force_z / this.mass;

                this.velocity.x = this.friction * (this.velocity.x + a_x);
                this.velocity.y = this.friction * (this.velocity.y + a_y);
                this.velocity.z = this.friction * (this.velocity.z + a_z);
                
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
                this.position.z += this.velocity.z;

            }
            if (mouse_distance < this.max_deformation){
                this.move = false;
            }          
            
        } else if (mouse_distance < this.max_deformation){
            

            this.position.x = mouseX - windowWidth/2;
            this.position.y = mouseY - windowHeight/2;
            
            // this.initial_pos.x = this.anchor_point.x + this.spring_distance.x;
            // this.initial_pos.y = this.anchor_point.y + this.spring_distance.y;

            // this.position.x = this.initial_pos.x + (mouseX - this.position.x - windowWidth/2)/(windowWidth/2) * this.max_deformation*10;
            // this.position.y = this.initial_pos.y + (mouseY - this.position.y - windowHeight/2)/(windowHeight/2) * this.max_deformation*10;
        } else {
            this.move = true;
        }

    }

    draw(){
        // ellipse(this.anchor_point.x, this.anchor_point.y, 10,10);
        // stroke(255, 0, 0);
        // line(this.anchor_point.x, this.anchor_point.y, this.position.x, this.position.y);
        stroke(255);
        ellipse(this.position.x, this.position.y, 10,10);

        // ellipse(this.initial_pos.x, this.initial_pos.y, 5,5);

    }


}
