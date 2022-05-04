class Interpolation {

    interpolation = [[ 1.0,  0.0, 0.0, 0.0  ], 
                     [-5.5,  9.0, -4.5, 1.0 ], 
                     [ 9.0, -22.5, 18, -4.5 ],
                     [ -4.5, 13.5,-13.5, 4.5]];


    p1;
    p2;
    p3;
    p4;

    Cx;
    Cy;
    Cz;

    constructor (p1,p2,p3,p4) {

        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;

        this.Cx = Matrix.mult(this.interpolation, [p1.x,p2.x,p3.x,p4.x]);
        this.Cy = Matrix.mult(this.interpolation, [p1.y,p2.y,p3.y,p4.y]);
        this.Cz = Matrix.mult(this.interpolation, [p1.z,p2.z,p3.z,p4.z]);

    }


    setCoefficient(){
        this.Cx = Matrix.mult(this.interpolation, [this.p1.x,this.p2.x,this.p3.x,this.p4.x]);
        this.Cy = Matrix.mult(this.interpolation, [this.p1.y,this.p2.y,this.p3.y,this.p4.y]);
        this.Cz = Matrix.mult(this.interpolation, [this.p1.z,this.p2.z,this.p3.z,this.p4.z]);

    }

    Px(u){
        return this.Cx[0] + (this.Cx[1] * u) + (this.Cx[2] *(u*u)) + (this.Cx[3] *(u*u*u));
    }

    Py(u){
        return this.Cy[0] + (this.Cy[1] * u) + (this.Cy[2] *(u*u)) + (this.Cy[3] *(u*u*u));
        
    }

    Pz(u){
        return this.Cz[0] + (this.Cz[1] * u) + (this.Cz[2] *(u*u)) + (this.Cz[3] *(u*u*u));
        
    }


}