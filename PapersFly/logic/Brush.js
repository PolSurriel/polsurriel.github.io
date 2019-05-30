class Brush {

    /*
    
            Brush.applyMatrix(0.0,0.0, 0.0,  0.0,
                    0.0, 0.0, 0.0,  0.0,
                    0.0, 0.0, 0.0,  0.0,
                    0.0, 0.0, 0.0,  1.0);

    
    
    */

    

    static applyMatrix(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p){

        applyMatrix(a, e, i,  m,
                    b, f, j,  n,
                    c, g, k,  o,
                    d, h, l,  p);


    }

    static rotateY(angle){
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);

        Brush.applyMatrix(cos, 0.0, sin,  0.0,
                          0.0, 1.0, 0.0,  0.0,
                          -sin, 0.0, cos,  0.0,
                          0.0, 0.0, 0.0,  1.0);

    }

    static rotateX(angle){
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);

        Brush.applyMatrix(1.0, 0.0,  0.0,  0.0,
                          0.0, cos,  -sin,  0.0,
                          0.0, sin, cos,  0.0,
                          0.0, 0.0,  0.0,  1.0);

    }

    static rotateZ(angle){
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);

        Brush.applyMatrix(cos,-sin, 0.0,  0.0,
                          sin, cos, 0.0,  0.0,
                          0.0, 0.0, 1.0,  0.0,
                          0.0, 0.0, 0.0,  1.0);

    }

    static scale(x,y,z){

        Brush.applyMatrix(x,   0.0, 0.0,  0.0,
                          0.0, y,   0.0,  0.0,
                          0.0, 0.0, z,  0.0,
                          0.0, 0.0, 0.0,    1.0);

    }

    static translate(tx,ty,tz){

        Brush.applyMatrix(1.0, 0.0, 0.0, tx,
                          0.0, 1.0, 0.0, ty,
                          0.0, 0.0, 1.0, tz,
                          0.0, 0.0, 0.0, 1.0);

    }

    static shearX(angle){
        var cotan = 1 / tan(angle);

        Brush.applyMatrix(1.0, cotan, 0.0, 0.0,
                          0.0, 1.0,   0.0, 0.0,
                          0.0, 0.0,   1.0, 0.0,
                          0.0, 0.0,   0.0, 1.0);
                          

    }

    static shearY(angle){
        
        var cotan = 1 / tan(angle);

        Brush.applyMatrix(1.0,   0.0, 0.0, 0.0,  
                          cotan, 1.0, 0.0, 0.0,  
                          0.0,   0.0, 1.0, 0.0,  
                          0.0,   0.0, 0.0, 1.0);

    }

    /*
    https://www.slideshare.net/ManthanKanani1/homogeneous-representation-rotating-shearing
    
    
    */
    static shearZ(angle){
        var cotan = 1 / tan(angle);

        Brush.applyMatrix(1.0, 0.0, 0.0,  0.0,
                          0.0, 1.0, 0.0,  0.0,
                          cotan, cotan, 1.0,  0.0,
                          0.0, 0.0, 0.0,  1.0);
    }

    
}