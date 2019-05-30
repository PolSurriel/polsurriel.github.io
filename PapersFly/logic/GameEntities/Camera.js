/*

Limitarnos a los bordes de la ventana era una idea que no nos llamaba la atención.
Camera es una clase estática que traduce la información en función de una referencia.
Básicamente desplaza en los dos ejes la posición obtenida en el mismo eje la 
posición de la refencia invertida. (pos - ref_pos)

Como cambiar el atributo de equivalencia de UMI era algo un poco extraño y el 
concepto de hacer zoom le pega más a esta clase, lo hemos implementado aquí.

Siguiente para leer: FollowerReference.js

*/

class Camera {

    static base = {
        vx : new SuperVector(1,0,0),
        vy : new SuperVector(0,1,0),
        vz : new SuperVector(0,0,1)
    };

    static reference; 
    static zoom = 1;

    static setObjectReference(obj){
        this.reference = obj;
    }
 
    static translationX(x){
        return x-this.reference.x;
    }

    static translationY(y){
        return y-this.reference.y;
    }

    static translation(vector){
        v.x = Camera.translationX(v.x);
        v.y = Camera.translationX(v.y);

        return vector;
    }



    static drawSettings(){
        var vecToPlayer = SuperVector.direction(Camera.reference.position, player.position)

        var mag = vecToPlayer.getMagnitude();
        vecToPlayer.scalar(0.4);

        var screenScale = UMI.px(Camera.zoom);
        Brush.scale(screenScale, screenScale, screenScale);
        Brush.translate(-(Camera.reference.position.x+vecToPlayer.x),
                        -(Camera.reference.position.y+vecToPlayer.y),
                        -(Camera.reference.position.z+vecToPlayer.z));
    }

}

var cameraTrail = new Trail();

cameraTrail.addLine(new Bezier({x:-58.683926645091695, y:-358.5760517799353, z:0,}, {x:-99.24487594390507, y:-225.67421790722761, z:0,},{x:-101.83387270765913, y:154.04530744336572, z:0,},{x:138.9428263214671,  y:223.94822006472486, z:0,}));
cameraTrail.addLine(new Bezier({x:138.9428263214671,   y:223.94822006472492, z:0,}, {x:427.6270010672358,  y:280.46958377801496,  z:0,},{x:696.5704375667021,   y:20.917822838847385, z:0,},{x:859.6440768409819,  y:225.82710779082186, z:0,}));
cameraTrail.addLine(new Bezier({x:859.6440768409818,   y:225.8271077908218,  z:0,}, {x:1087.8594983991457, y:405.2375667022408,   z:0,},{x:1367.0483991462108,  y:312.17459978655245, z:0,},{x:1597.5713447171822, y:404.3837780149409,  z:0,}));
cameraTrail.addLine(new Bezier({x:1597.571344717182,   y:404.3837780149409,  z:0,}, {x:1964.232977588042,  y:524.4277481323364,   z:0,},{x:2342.4613660618948,  y:310.1267876200632,  z:0,},{x:2527.733511205972,  y:477.46937033084237, z:0,}));
cameraTrail.addLine(new Bezier({x:2527.733511205972,   y:477.4693703308423,  z:0,}, {x:2705.798879402343,  y:555.5517609391666,   z:0,},{x:2687.869316969045,   y:894.5058697972242,  z:0,},{x:2957.6665421558114, y:804.8580576307354,  z:0,}));
cameraTrail.addLine(new Bezier({x:2957.6665421558114,  y:804.8580576307354,  z:0,}, {x:3155.9236926360677, y:678.7555496264663,   z:0,},{x:3756.1371398078927,  y:903.3019743863383,  z:0,},{x:3662.2203842049043, y:560.932710779081,   z:0,}));
cameraTrail.addLine(new Bezier({x:3662.2203842049043,  y:560.932710779081,   z:0,}, {x:3413.7496264674446, y:399.5550160085371,   z:0,},{x:3445.3398078975406,  y:268.9253468516534,  z:0,},{x:3720.2597652081067, y:61.4546958377793,   z:0,}));
cameraTrail.addLine(new Bezier({x:3720.2597652081063,  y:61.4546958377793,   z:0,}, {x:3933.244183564563,  y:-75.8074706510146,   z:0,},{x:4232.924012806826,   y:-52.75517609391753, z:0,},{x:4343.062753468512,  y:28.35474919957241,  z:0,}));
cameraTrail.addLine(new Bezier({x:4343.062753468512,   y:28.35474919957238,  z:0,}, {x:4509.396531483454,  y:62.50629669156811,   z:0,},{x:4599.044343649943,   y:410.8520811099246,  z:0,},{x:4870.549146211309,  y:316.93532550693635, z:0,}));
cameraTrail.addLine(new Bezier({x:4870.549146211309,   y:316.93532550693635, z:0,}, {x:5125.145731056559,  y:192.8046958377792,   z:0,},{x:5432.509658484521,   y:156.0917822838838,  z:0,},{x:5725.359178228384,  y:385.76093916755514, z:0,}));
cameraTrail.addLine(new Bezier({x:5725.359178228385,   y:385.76093916755514, z:0,}, {x:5933.238900747062,  y:645.048239060832,    z:0,},{x:6250.848292422622,   y:609.1891141942364,  z:0,},{x:6338.6463180362825, y:746.921398078975,   z:0,}));
cameraTrail.addLine(new Bezier({x:6338.646318036282,   y:746.9213980789748,  z:0,}, {x:6490.620704375663,  y:871.5745464247592,   z:0,},{x:6677.433137673422,   y:878.4382604055489,  z:0,},{x:6808.916595517606,  y:1045.780843116328,  z:0,}));
cameraTrail.addLine(new Bezier({x:6808.916595517605,   y:1045.780843116328,  z:0,}, {x:6942.953308431159,  y:1172.160138740661,   z:0,},{x:7152.131536819633,   y:1259.2465848452503, z:0,},{x:7219.580843116324,  y:1406.098239060832,  z:0,}));
cameraTrail.addLine(new Bezier({x:7219.580843116324,   y:1406.098239060832,  z:0,}, {x:7342.30640341515,   y:1572.0768943436499,  z:0,},{x:7517.333084311628,   y:1431.2017609391673, z:0,},{x:7581.36723585912,   y:1631.8421024546424, z:0,}));
cameraTrail.addLine(new Bezier({x:7581.36723585912,    y:1631.8421024546424, z:0,}, {x:7678.003415154745,  y:1874.577854855923,   z:0,},{x:7990.490074706506,   y:1779.807310565635,  z:0,},{x:8085.260618996794,  y:1650.031430096051,  z:0,}));
cameraTrail.addLine(new Bezier({x:8085.260618996794,   y:1650.031430096051,  z:0,}, {x:8183.210992529344,  y:1523.2071504802561,  z:0,},{x:8397.511953041618,   y:1402.8229455709711, z:0,},{x:8523.0188900747,    y:1418.1911419423693, z:0,}));
cameraTrail.addLine(new Bezier({x:8523.018890074702,   y:1418.191141942369,  z:0,}, {x:8714.563874066163,  y:1447.0874066168624,  z:0,},{x:8924.595891141938,   y:1520.5132337246532, z:0,},{x:8926.303468516538,  y:1708.3467449306297, z:0,}));
cameraTrail.addLine(new Bezier({x:8926.303468516538,   y:1708.3467449306297, z:0,}, {x:8933.397278548553,  y:1852.6577908217714,  z:0,},{x:8944.496531483452,   y:2037.0761472785482, z:0,},{x:9104.15501600853,   y:2177.9512806830307, z:0,}));
cameraTrail.addLine(new Bezier({x:9104.155016008532,   y:2177.9512806830307, z:0,}, {x:9226.248239060826,  y:2386.0458377801497,  z:0,},{x:9148.553468516537,   y:2633.6445570971186, z:0,},{x:9030.730629669151,  y:2665.234738527215,  z:0,}));
cameraTrail.addLine(new Bezier({x:9030.730629669151,   y:2665.234738527215,  z:0,}, {x:8726.781856990388,  y:2847.7631803628606,  z:0,},{x:9221.979295624327,   y:3111.5838847385276, z:0,},{x:9271.499039487719,  y:3171.34909284952,   z:0,}));
cameraTrail.addLine(new Bezier({x:9271.49903948772,    y:3171.34909284952,   z:0,}, {x:9449.314994663815,  y:3306.517929562434,   z:0,},{x:9391.257363927421,   y:3418.36424759872,   z:0,},{x:9733.626627534679,  y:3381.651334044825,  z:0,}));
cameraTrail.addLine(new Bezier({x:9733.626627534679,   y:3381.6513340448246, z:0,}, {x:9990.174546424756,  y:3388.8297758804706,  z:0,},{x:10224.484258271072,  y:3564.1883137673435, z:0,},{x:10257.351280683026, y:3683.932177161154,  z:0,}));
cameraTrail.addLine(new Bezier({x:10257.351280683026,  y:3683.932177161154,  z:0,}, {x:10379.443062966911, y:3882.864941302029,   z:0,},{x:10516.049252934894,  y:3990.4423159018156, z:0,},{x:10722.666115261469, y:4022.8862860192116, z:0,}));

cameraTrail.addLine(new Bezier({x:10722.666115261469, y:4022.8862860192116, z:0,},{x:11131.107640984486, y:4257.3625831399795, z:0,},{x:11376.998782926856, y:4200.158741090887, z:0,},{x:11445.301877910848, y:4131.855646106895, z:0,}));