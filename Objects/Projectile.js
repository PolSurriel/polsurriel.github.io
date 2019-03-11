class Projectile extends RealObject {

    direction;

    rebounds = 0;

    speed;

    destroyEnemy;

    radio = EnemyAway.radio;

    constructor(x, y,direction, destroyEnemy){
        super(x, y);
        this.direction = direction;

        this.destroyEnemy = destroyEnemy;

        if(destroyEnemy == true){
            this.radio *= 4;
        }

        this.speed = UMI.getSpeed(250);
        

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
        
        noStroke();
        fill('orange');
        ellipse(UMI.toPixel(Camera.translationX(this.x)),UMI.toPixel(Camera.translationY(this.y)),this.radio*2,this.radio*2);
    }

    destroy(){
        UMI.realObjects.splice(UMI.realObjects.indexOf(this), 1);
        UMI.LogicObjects.splice(UMI.LogicObjects.indexOf(this), 1);
        projectiles.splice(projectiles.indexOf(this), 1);
        delete this;
    }

}