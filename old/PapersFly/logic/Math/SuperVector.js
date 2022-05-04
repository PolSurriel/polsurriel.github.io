/*
Historia:

Cuando quisimos hacer la "migración lógica" de vectores a matrices
habían razonamientos que nos causaban disonancia cognitiva. Si
bien era impepinable que el uso de matrices es necesario, no nos
era de agrado cómo esto complicaría el código. Por esa razón nos 
pusimos a pensar y observar.

Concluimos que debíamos proteger al programador de la complejidad.
Es nuestro código el que debe asumir esa implementación. Hicimos
la broma de que necesitábamos a un superhéroe que hiciera los
cálculos con matrices por nosotros y lo enmascarase como un
vector. Y por eso decidimos llamar a esta clase "SuperVector",
porque la creamos pensando en ella como un superhéroe. Un
caballero honorable que esconde su labor y sin que el programador
lo sepa hace los cálculos con matrices y le permite pensar con 
una lógica más intuitiva. Sonriendo en silencio y con complicidad
a cada transformación.

*/

class SuperVector {

    x = 0;
    y = 0;
    z = 0;
    w = 0;

    transform = {
        rotation:{
            x:0,
            y:0,
            z:0
        },
        scale:{
            x:0,
            y:0,
            z:0
        },
        translation:{
            x:0,
            y:0,
            z:0
        }
    }

    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
        // w = 1 porque es un vector 
        this.w = 1;
    }    

    getMagnitude(){
        return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
    }

    getMagnitude2D(){
        return Math.sqrt(this.x*this.x+this.y*this.y);
    }

    toUnitary(){
        var mag = this.getMagnitude();
        this.x = (mag == 0)? 0:this.x/mag;
        this.y = (mag == 0)? 0:this.y/mag;
        this.z = (mag == 0)? 0:this.z/mag;
    }

    toUnitary2D(){
        var mag = this.getMagnitude2D();
        this.x = this.x/mag;
        this.y = this.y/mag;
    }

    assign(matrix){

        this.x = matrix[0];
        this.y = matrix[1];
        this.z = matrix[2];

    }

    translate(tx,ty,tz){
        this.assign(
            Matrix.multipy4x4Vector(
                Matrix.getTranslationMatrix(tx,ty,tz),
                this.x, this.y, this.z, this.w
            )            
        );
    }


    rotateAxisZ(axis, radians){
        this.translate(-axis.x, -axis.y, 0);
        this.rotateZ(radians);
        this.translate(axis.x, axis.y, 0);
    }

    distance(sv){
        return new SuperVector(this.x-sv.x, this.y-sv.y, this.z-sv.z).getMagnitude();
    }

    scale(sx,sy,sz){
        this.assign(
            Matrix.multipy4x4Vector(
                Matrix.getScalingMatrix(sx,sy,sz),
                this.x, this.y, this.z, this.w
            )            
        );
    }

    rotateZ(radians){
        this.assign(
            Matrix.multipy4x4Vector(
                Matrix.getRotationMatrix(Math.cos(radians),Math.sin(radians)),
                this.x, this.y, this.z, this.w
            )            
        );
    }

    rotateX(radians){
        this.assign(
            Matrix.multipy4x4Vector(
                Matrix.getRotationMatrixX(Math.cos(radians),Math.sin(radians)),
                this.x, this.y, this.z, this.w
            )            
        );
    }

    rotateY(radians){
        this.assign(
            Matrix.multipy4x4Vector(
                Matrix.getRotationMatrixY(Math.cos(radians),Math.sin(radians)),
                this.x, this.y, this.z, this.w
            )            
        );
    }


    copy(){
        return new SuperVector(this.x,this.y,this.z);
    }

    scalar(scalar){
        this.x *=scalar;
        this.y *=scalar;
        this.z *=scalar;
    }

    static getAngleBetweenTwoVectors(u,v){
        var magnitudeU = u.getMagnitude();
        var magnitudeV = v.getMagnitude();
        return Math.acos((u.x*v.x+u.y*v.y+u.z*v.z)/(magnitudeU*magnitudeV));
    }

    static direction(p1,p2){
        return new SuperVector(p2.x-p1.x,p2.y-p1.y,p2.z-p1.z );

    }

    static dotProduct(v1, v2){

        return v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;

    }

    static distance(a, b) {
        return new SuperVector(b.x - a.x, b.y - a.y, b.z - a.z).getMagnitude();
    }


    // rotateAxisZ(axis, radians){
    //     var cos = Math.cos(radians);
    //     var sin = Math.sin(radians);

    //     var result = [
    //         this.x*cos-this.y*sin+this.w*(-cos*axis.x+axis.x+sin*axis.y),
    //         this.y*cos+this.x*sin+this.w*(-sin*axis.x-cos*axis.y+axis.y),
    //         this.z
    //     ];

    //     this.assign(result);
    // }

}



