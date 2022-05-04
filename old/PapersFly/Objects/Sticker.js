class Sticker {

    getSrc;
    position;
    rotation;
    size;

    constructor(position, rotation, size, getSrc){
        this.getSrc = getSrc;
        this.position = position;
        this.rotation = rotation;
        this.size = size;

    }



    update(){

    }

    draw(){
        noStroke();
        texture(eval(this.getSrc));
        Brush.translate(this.position.x,this.position.y,this.position.z);
        Brush.rotateX(this.rotation.x);
        Brush.rotateY(this.rotation.y);
        Brush.rotateZ(this.rotation.z);
        plane(100*this.size);


    }


}