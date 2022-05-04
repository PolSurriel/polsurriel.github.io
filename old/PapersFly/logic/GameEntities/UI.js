class UI {

    context;

    static drawSettings(){
        UI.context.clear();

    }

    static draw(){
        imageMode(CENTER)
        Brush.translate(-10,-10,0);
        
        image(UI.context, 10, 10);
    }
}