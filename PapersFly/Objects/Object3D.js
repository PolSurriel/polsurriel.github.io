class Object3D{


    model;
    texture;
    size = 1;

    constructor(model, texure){
        this.model = model;
        this.texture = texure;
    }

    applyTexture(){
        texture(this.texture);
    }

    draw(){
        //var size = UMI.px(this.size)
        //Brush.scale(size,size,size);
        model(this.model);
    }


}