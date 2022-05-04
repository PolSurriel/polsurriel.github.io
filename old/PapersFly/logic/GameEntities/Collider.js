


/**
 * 
 * Esta clase (después de ser la que más hemos odiado al tratar de crearla), es a 
 * la que más aprecio le tenemos. En parte gracias a nuestra experiencia pasada
 * tratando de programarlas, hemos empeado nuestra propia librería de colisiones 2D.
 * 
 * Empezamos esta clase pensando en cómo hacerla intuitiva. Tras haberla creado
 * nos dimos cuenta de que lo que estábamos haciendo era muy poco eficiente...
 * 
 * Tener los métodos que detectan las colisiones separados de las reacciones privan
 * a las de reacción de la información calculada para determinar si había colisión.
 * Esta información en ocasiones es útil para ser reutilizada. De esta manera,
 * los métodos de reacción podrían hacer menos cálculos. Por ejemplo, con las
 * colisiones de polígonos podríamos no recalcular qué linea intersecta/el ortogonal
 * está cerca. No hemos podido implementarlom pero tenemos la solución.
 * 
 * Planeamos crear una clase llamada ColliderResponse, que tendrá datos de la
 * respectiva detección de la colisión y entonces crearemos los override de
 * los métodos de reacción para poder utilizar estos datos.
 * 
 * Completar esta librería es ahora uno de nuestros objetivos en tiempo libre :)
 * 
 * Una vez completada, podemos controlar colisiones entre:
 * circle           circle
 * polygon         polygon
 * rect               rect
 * line               line
 * point             point
 * 
 * 
 */

class Collider {

    static getCollisionRectToPlane(planePoint, planeNormal, rectPoint1, rectPoint2){
        var rectVector = new SuperVector(rectPoint2.x-rectPoint1.x, rectPoint2.y-rectPoint1.y, rectPoint2.z-rectPoint1.z);

        var lambda = (-planeNormal.x*rectPoint1.x+planeNormal.x*planePoint.x -planeNormal.y*rectPoint1.y+planeNormal.y*planePoint.y -planeNormal.z*rectPoint1.z+planeNormal.z*planePoint.z) / (planeNormal.x*rectVector.x+planeNormal.y*rectVector.y+planeNormal.z*rectVector.z);

        return new SuperVector(rectPoint1.x + lambda * rectVector.x, rectPoint1.y + lambda * rectVector.y, rectPoint1.z + lambda * rectVector.z);
    }

    static distancePointToRect(x_ln_point1,  y_ln_point1,  x_ln_point2,  y_ln_point2,  x_point,  y_point) {
        var rect_vector = new Vector2D(x_ln_point2 - x_ln_point1, y_ln_point2 - y_ln_point1);
        var rect_point_vector = new Vector2D(x_point - x_ln_point1, y_point - y_ln_point1);
        var area = rect_vector.x * rect_point_vector.y - rect_point_vector.x * rect_vector.y;
        return (area / rect_vector.getMagnitude());

    }

    static canProjectPointOnLine(player, wind) {
        var lam = Collider.getLambdaPointInARect(wind.point1.x, wind.point1.y, wind.point2.x, wind.point2.y, player.position.x, player.position.y);

        return (lam >= 0 && lam <= 1);
    }

    static getLambdaPointInARect(x_ln_point1,  y_ln_point1,  x_ln_point2,  y_ln_point2,  x_point,  y_point) {
        var rect_vector = new Vector2D(x_ln_point2 - x_ln_point1, y_ln_point2 - y_ln_point1);
        var point_rect_distance = this.distancePointToRect(x_ln_point1,  y_ln_point1,  x_ln_point2,  y_ln_point2,  x_point,  y_point);

        var projected_point = new Vector2D(rect_vector.y * point_rect_distance + x_point, rect_vector.x * (-1) * point_rect_distance + y_point);

        return (projected_point.x - x_ln_point1) / (rect_vector.x * rect_vector.getMagnitude());
    }
   

    static objectDetector = {

        playerToWind(player, wind){
            var plane_wind_distance = Collider.distancePointToRect(wind.point1.x, wind.point1.y, wind.point2.x, wind.point2.y, player.position.x, player.position.y);

            var p1ToPl = new Vector2D(player.position.x-wind.point1.x, player.position.y-wind.point1.y);
            var p1Top2 = new Vector2D(wind.point2.x-wind.point1.x, wind.point2.y-wind.point1.y);

            return (plane_wind_distance < wind.margin+player.circleColliderRadio && plane_wind_distance > -wind.margin) && p1ToPl.getMagnitude() < p1Top2.getMagnitude() && (Math.abs(p1ToPl.getAngle()-p1Top2.getAngle()) < HALF_PI);
        }
        
    }

    static detector = {

        pointInsidepPoly(point, poly) {
            var x = point[0], y = point[1];
        
            var inside = false;
            for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
                var xi = poly[i][0], yi = poly[i][1];
                var xj = poly[j][0], yj = poly[j][1];
        
                var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
        
            return inside;
        },

        pointInsidepPolyVector(point, poly) {
            var x = point.x, y = point.y;
        
            var inside = false;
            for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
                var xi = poly[i].x, yi = poly[i].y;
                var xj = poly[j].x, yj = poly[j].y;
        
                var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
        
            return inside;
        },


        sphereToPlane(position, radio, plane){
            return plane.distanceABS(position) <= radio; 
        },

    //POINT

        /*
            Cuando la distancia entre el punto y el centro del círculo es menor o igual a su radio colisionar
        */
        pointToCircle(x_point, y_point, x_circle, y_circle, radio) {

            var distY = Math.abs(y_point - y_circle);
            var distX = Math.abs(x_point - x_circle);



            return Math.sqrt((distY * distY) + (distX * distX)) <= radio;
        
        },


        /*
            Se comprueba si el punto se encuentra dentro del rectángulo en función del rango.
        */
        pointToRect(x_point, y_point, x_rect, y_rect, rect_width, rect_height) {

            return (x_point > x_rect)
                &&
                (x_point < x_rect + rect_width)
                &&
                (y_point > y_rect)
                &&
                (y_point < y_rect + rect_height);

        },

        /*

            Un polígono está formado por aristas, que son líneas.

            Si el punto NO entra en el polígono no habrá intersecciones.
            Si un punto entra en un polígono desde fuera, habra una intesección con una de sus aristas.
            Si el punto entra y sale, habrán dos intersecciones.

            Si el número de intersecciones es par el punto está fuera del polígono.

            El número de intersecciones es impar cuando el punto no está dentro del polígono.
            Se invierte el booleano de respuesta por cada intersección que encuentra.
            
            **Pendiente: Cómo determinamos si ha habido una intersección moviendo una cordenada
            al extremo de la otra.

        */
        pointToPolygon(x_point, y_point, polygon) {
            //TODO
        },


        pointToLine(x_ln_point1,  y_ln_point1,  x_ln_point2,  y_ln_point2,  x_point,  y_point) {
            return this.lineToPoint( x_point,  y_point, x_ln_point1,  y_ln_point1,  x_ln_point2,  y_ln_point2);
        },

        /*
            Sólo colisionan si el punto en el espacio es el mismo.
        */
        pointToPoint(x_point1, y_point1, x_point2, y_point2){
            return x_point1 == x_point2 && y_point1 == y_point2;
        },



        //CIRCLE

        /*
            Cuando la distancia entre el punto y el centro del círculo es menor 
            o igual a su radio colisionará.
        
        */
        circleToPoint(x_circle, y_circle, radio, x_point, y_point) {
            return this.pointToCircle(x_point, y_point, x_circle, y_circle, radio);
        },

        /*
            Cuando la distancia entre el centro de un círculo y el centro del otro círculo 
            es menor o igual a la suma de sus radios colisionarán.
        */
        circleToCircle(x1, y1, x2, y2, radio1, radio2) {

            var disty = Math.abs(y1 - y2);
            var distx = Math.abs(x1 - x2);

            return Math.sqrt((disty * disty) + (distx * distx)) <= radio1 + radio2;
        
        },

        /*
            Comprueba la proximidad de todos los lados según su eje teniendo en cuenta el 
            radio (siempre a favor de la colisión).
        
        */
        circleToRect(x_circle, y_circle, radio, x_rect, y_rect, rect_width, rect_height) {

            return (x_circle + radio > x_rect)
                &&
                (x_circle - radio < x_rect + rect_width)
                &&
                (y_circle + radio > y_rect)
                &&
                (y_circle - radio < y_rect + rect_height);
        },


        /*
            Comprobar si el círclo colisiona con alguna de las líneas del polígono.
        
        */
        circleToPolygon(x_circle, y_circle, radio, polygon){

            for (let i=0, j = polygon.length -1; i < polygon.length; j = i++) {

                if ( this.lineToCircle(polygon[i][0],polygon[i][1], polygon[j][0],polygon[j][1], x_circle,y_circle,radio)) {
                    return true;
                }
            }

            return false;

        },

        circleToPolygonSuperVector(x_circle, y_circle, radio, polygon){

            for (let i=0, j = polygon.length -1; i < polygon.length; j = i++) {

                if ( this.lineToCircle(polygon[i].x,polygon[i].y, polygon[j].x,polygon[j].y, x_circle,y_circle,radio)) {
                    return true;
                }
            }

            return false;

        },

        circleToLine(x_circle, y_circle, radio, x_point1, y_point1, x_point2, y_point2){
            return this.lineToCircle(x_point1, y_point1, x_point2, y_point2, x_circle, y_circle, radio);
        },
        
        

        // RECT

        rectoToCircle(x_rect, y_rect, rect_width, rect_height, x_circle, y_circle, radio) {
            return this.circleToRect(x_circle, y_circle, radio, x_rect, y_rect, rect_width, rect_height);
        },


        rectToPoint(x_rect, y_rect, rect_width, rect_height, x_point, y_point) {
            return this.pointToRect(x_point, y_point, x_rect, y_rect, rect_width, rect_height);
        },



        rectToPolygon(x_rect, y_rect, rect_width, rect_height, polygon) {
            //TODO
        },

        rectToLine(x_rect, y_rect, rect_width, rect_height, x_point1, y_point1, x_point2, y_point2){
            return this.lineToRect(x_point1, y_point1, x_point2, y_point2, x_rect, y_rect, rect_width, rect_height);
        },


        /* 
            Si alguna de las esquinas está dentro de del rectángulo entonces hay colisión.
        */
        rectToRect(x_rect1, y_rect1, rect1_width, rect1_height, x_rect2, y_rect2, rect2_width, rect2_height){
            return this.pointToRect(x_rect1,y_rect1,  x_rect2, y_rect2, rect2_width, rect2_height)
                || this.pointToRect(x_rect1+rect1_width,y_rect1,  x_rect2, y_rect2, rect2_width, rect2_height)
                || this.pointToRect(x_rect1,y_rect1+rect1_height,  x_rect2, y_rect2, rect2_width, rect2_height)
                || this.pointToRect(x_rect1+rect1_width,y_rect1+rect1_height,  x_rect2, y_rect2, rect2_width, rect2_height);
        },




        // POLYGON

        polygonToPoint(polygon, x_point, y_point) {
            return this.pointToPolygon(x_point, y_point, polygon);
        },


        /*
            Si cualquiera de los vértices del polígono colisiona con el polígono,
            hay colisión.

            Esta función NO funciona, porque no hemos hecho todavía "pointToPolygon".

        */
        polygonToPolygon(polygon1, polygon2) {
            
            var colision = false;
            
            for (let i = 0; i < polygon1.length && !colision; i++) {
                colision = this.pointToPolygon(polygon1[0],polygon1[1], polygon2);
            }

            return colision;
        },
        
        polygonToRect(polygon, x_rect, y_rect, rect_width, rect_height){
            return this.rectToPolygon(x_rect, y_rect, rect_width, rect_height, polygon);
        },


        polygonToCircle(polygon, x_circle, y_circle, radio){
            return this.circleToPolygon(x_circle, y_circle, radio, polygon);
        },
        

        
        polygonToLine(polygon, x_ln1,  y_ln1,  x_ln2,  y_ln2) {


            var colisionPoints = new Array();
            var isTrue = false;
            for (let i = 0, j = polygon.length-1; i < polygon.length; j = i++) {
                var test = this.lineToLine( x_ln1,  y_ln1,  x_ln2,  y_ln2, polygon[i][0],polygon[i][1], polygon[j][0], polygon[j][1] );
                if(test.isTrue){
                    isTrue = true;

                    test.info.line = {
                        p1:{
                            x:polygon[i][0],
                            y:polygon[i][1]
                        },
                        p2:{
                            x:polygon[j][0],
                            y:polygon[j][1]
                        }
                    }
                    colisionPoints.push(test.info);

                }
                    
            }

            return new ColliderResponse (isTrue, colisionPoints);

        },



        // LINE

        lineToRect(x_point1, y_point1, x_point2, y_point2, x_rect, y_rect, rect_width, rect_height) {
            // TODO
        },



        /*

            Usaremos el punto como una recta, es decir, un punto en el espacio y un vector.
            Teniendo en cuenta que podemos llegar al punto de colisión calculando un punto en el espacio
            de estas dos rectas, podemos extraer un sistema de ecuaciones lineal:

            Punto de intersección = punto1 + vectorDirector1 * lambda;
            Punto de intersección = punto2 + vectorDirector2 * gamma;

            ****************

            https://stackoverflow.com/questions/13937782/calculating-the-point-of-intersection-of-two-lines

            Página MUY interesante:
            http://paulbourke.net/geometry/pointlineplane/
            

        */
        lineToLine( x_ln1_point1, y_ln1_point1, x_ln1_point2, y_ln1_point2, x_ln2_point1, y_ln2_point1, x_ln2_point2, y_ln2_point2) {
            var det, gamma, lambda;
            
            det = (x_ln1_point2 - x_ln1_point1) * (y_ln2_point2 - y_ln2_point1) - (x_ln2_point2 - x_ln2_point1) * (y_ln1_point2 - y_ln1_point1);

            if (det === 0) { // si son líneas paraleleas/liealmente dependientes -> no encontraremos nunca un único punto de colisión y petara :(
              return new ColliderResponse( false );

            } else {

              lambda = ((y_ln2_point2 - y_ln2_point1) * (x_ln2_point2 - x_ln1_point1) + (x_ln2_point1 - x_ln2_point2) * (y_ln2_point2 - y_ln1_point1)) / det;
              gamma =  ((y_ln1_point1 - y_ln1_point2) * (x_ln2_point2 - x_ln1_point1) + (x_ln1_point2 - x_ln1_point1) * (y_ln2_point2 - y_ln1_point1)) / det;
              
              return new ColliderResponse( 
                  (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1),
                
                  {
                    x: x_ln1_point1 + (x_ln1_point2 - x_ln1_point1) * lambda,
                    y: y_ln1_point1 + (y_ln1_point2 - y_ln1_point1) * lambda
                  } 
                );
            }
            
        },


        
        /*

            Para esta función lo que pensamos en hacer lo siguiente:
            Obtener la proyección ortogonal de puntoA -> centro sobre puntoA ->B

            Entonces si la distancia del puntoA+ortogonal con el centro es emnor que el círculo
            Y la magnitud de puntoA->ortogonal es <= a la magnitud puntoA <= puntoB 

            Esto no nos funcionó y no entendemos muy bien por qué, por esa razón decidimos recurrir a buscar
            una solución y entenderla para aplicarla. Dimos con esta solución:

            Fuente: http://www.jeffreythompson.org/collision-detection/poly-rect.php

            Definimos el vector que va del p1 de la linia al p2
            Definimos el vector que va del p1 de la linia al centro del circulo
            Calculamos el vector ortogonal del vectorToCircle encima del vectorLine
            Encontramos el punto de la linia m�s proximo al centro del circulo
            Hay colision si la distancia entre este punto encontrado y el centro del circulo es igual o menor al radio del circulo
        */

        lineToCircle(x_point1, y_point1, x_point2, y_point2, x_circle, y_circle, radio) {
        /*
           var b = new Vector2D(x_point2-x_point1, y_point2-y_point1);
           var a = new Vector2D(x_circle-x_point1 , y_circle-y_point1 );
           
           var aMod = a.getMagnitude();
           var bMod = b.getMagnitude();
           
           var cosA = (a.x*b.x + a.y*b.y) / (Math.sqrt( a.x*a.x + a.y*a.y ) * Math.sqrt( b.x*b.x + b.y*b.y ));

           var fraccion = (aMod * cosA) / bMod;

           var resultado = new Vector2D(x_point1 + (fraccion)*b.x, y_point1 + (fraccion)*b.y);

           var AB = new Vector2D(x_circle-resultado.x, y_circle-resultado.y).getMagnitude();
           
           var longitud_ortogonal = new Vector2D(resultado.x-x_point1, resultado.y-y_point1).getMagnitude();


           return (AB <= radio) && (longitud_ortogonal <= bMod); 
           */
          
            var vectorLine = new Vector2D(x_point2 - x_point1, y_point2 - y_point1);
            var len = vectorLine.getMagnitude();    
            var vectorToCircle = new Vector2D(x_circle - x_point1, y_circle - y_point1);    
            var scalarDot = ((vectorLine.x*vectorToCircle.x)+(vectorLine.y*vectorToCircle.y))/(len*len);
            var vectorCircleOnLine = new Vector2D(scalarDot*vectorLine.x,scalarDot*vectorLine.y);   
            var ortogonalPoint = [x_point1 + vectorCircleOnLine.x, y_point1 + vectorCircleOnLine.y];
            
            var existsOnLine = this.lineToPoint(x_point1,y_point1,x_point2,y_point2, ortogonalPoint[0],ortogonalPoint[1]);
            
            var ortogonalToCircle = new Vector2D(ortogonalPoint[0] - x_circle,ortogonalPoint[1] - y_circle).getMagnitude();
            
            return ortogonalToCircle <= radio && existsOnLine;
        },
        

        /*
            Esta función calcula la distacia entre el punto A y el punto y el punto B y el punto.
            si la suma de estas distancias es igual a la de puntoA, puntoB con un +- 0.1 de
            imprecisión en la comprobación,entonces ha colisión.
            
            Este algoritmo forma parte de la referencia de la anterior función,
            hemos hecho este método sólo para implementar el anterior.
        */
        lineToPoint( x_ln_point1,  y_ln_point1,  x_ln_point2,  y_ln_point2,  x_point,  y_point) {
            
            var d1 = dist(x_point,y_point, x_ln_point1,y_ln_point1);
            var d2 = dist(x_point,y_point, x_ln_point2,y_ln_point2);

            var lineLen = dist(x_ln_point1,y_ln_point1, x_ln_point2,y_ln_point2);

            var buffer = 0.1;
           
            if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
                return true;
            }

            return false;
        },

        
        lineToPolygon(x_ln1,  y_ln1,  x_ln2,  y_ln2, vertices){
            return this.polygonToLine(vertices,  x_ln1,  y_ln1,  x_ln2,  y_ln2);
        }

    }

    static reaction = {
        //POINT

        /*
            Para obtener el efecto de "resbalado", en vez de mover al jugador
            a su antigua posición creamos un vector hacias su nueva posición
            y lo situamos a una distancia igual al radio.
        
        */
        pointToCircle(x_point, y_point, x_circle, y_circle, radio) {
            
            var AB = new Vector2D (x_point-x_circle, y_point-y_circle).getUnitaryVector();

            AB.x = AB.x * radio +x_circle;
            AB.y = AB.y * radio +y_circle;
            
            return AB;
        },

        /*
            En función del cuadrante exterior del rectángulo en el que esté el punto,
            lo desplazamos hacia el lado en el eje en el que le permitirmos
            deslizarse y hacia la antigua posición en la que no.
        
        */

        pointToRect(x_point, y_point, x_old_point, y_old_point, x_rect, y_rect, rect_width, rect_height) {
            
            var AB;
            var distance;
            
            if (y_old_point <= y_rect) {
                AB = new Vector2D (x_point-x_old_point, y_rect-y_point);
                distance = AB.getMagnitude();
                AB.convertToUnitary();

            }else if (y_old_point >= y_rect+rect_height) {
                AB = new Vector2D (x_point-x_old_point, y_rect+rect_height-y_point);
                distance = AB.getMagnitude();
                AB.convertToUnitary();

            }else if (x_old_point <= x_rect) {
                AB = new Vector2D (x_rect-x_point, y_point-y_old_point);
                distance = AB.getMagnitude();
                AB.convertToUnitary();

            }else if (x_old_point >= x_rect+rect_width) {
                AB = new Vector2D (x_rect+rect_width-x_point, y_point-y_old_point);
                distance = AB.getMagnitude();
                AB.convertToUnitary();

            }

            AB.x = AB.x * distance +x_point;
            AB.y = AB.y * distance +y_point;
            
            return AB;
        },



        pointToPolygon(x_old, y_old, x_point, y_point, polygon) {
            //TODO
        },

        pointToLine(x_ln_point1,  y_ln_point1,  x_ln_point2,  y_ln_point2,  x_point,  y_point) {
            //TODO
        },

        pointToPoint(x_point1, y_point1, x_point2, y_point2){
            //TODO
        },



        //CIRCLE

        circleToPoint(x_circle, y_circle, radio, x_point, y_point) {
            //TODO
        },

        /*
            La nueva posición del círculo es la posición del segundo desplazado a una distancia
            de los dos radios en la dirección que marca el vector unitario de Crículo1Círculo2
        */
        circleToCircle(x_point, y_point, x_circle, y_circle, radio1, radio2) {
            var AB = new Vector2D (x_point-x_circle, y_point-y_circle).getUnitaryVector();

            AB.x = AB.x * (radio1+radio2) +x_circle;
            AB.y = AB.y * (radio1+radio2) +y_circle;
            
            return AB;
        
        },

        /*
            Hacemos lo mismo que con el punto pero desplazando también el radio
        */
        circleToRect(x_point, y_point, radio, x_old_point, y_old_point, x_rect, y_rect, rect_width, rect_height) {
            

            var AB;
            var distance;
            
            if (y_old_point <= y_rect) {
                AB = new Vector2D (x_point-x_old_point, y_rect-radio-y_point);
                distance = AB.getMagnitude();
                AB.convertToUnitary();

            }else if (y_old_point >= y_rect+rect_height) {
                AB = new Vector2D (x_point-x_old_point, y_rect+radio+rect_height-y_point);
                distance = AB.getMagnitude();
                AB.convertToUnitary();

            }else if (x_old_point <= x_rect) {
                AB = new Vector2D (x_rect-radio-x_point, y_point-y_old_point);
                distance = AB.getMagnitude();
                AB.convertToUnitary();

            }else if (x_old_point >= x_rect+rect_width) {
                AB = new Vector2D (x_rect+radio+rect_width-x_point, y_point-y_old_point);
                distance = AB.getMagnitude();
                AB.convertToUnitary();

            }else {
                AB = new Vector2D (x_point-x_old_point, y_point-y_old_point);
                AB.convertToUnitary();
                return new Vector2D(x_point+AB.x*2, y_point+AB.y*2);
            }

            
            AB.x = AB.x * distance +x_point;
            AB.y = AB.y * distance +y_point;
            
            return AB;
        },


        /*
            Buscamos la línea en la que colisiona el círculo. En ese punto calculamos el ortogonal de la recta:
            pontoA - > centroCirculo sobre puntoA -> puntoB.

            Combinamos el puntoA con el ortogonal y ya tenemos la nueva posición. El problema es que cuando nuestro círculo
            se acercaba a los vértices, colisionaba con más de una línea y dependía de cuál comprobaba primero. De manera que
            en algunas esquinas entraba dentro del polígono porque se generaba la reacción desde el lado opuesto del deseado
            en una linea que no era la que correspondía. Para solucionar esto lo que hemos hecho es situar un círculo en cada
            esquina. Y si el círculo colisiona con este, lo seteamos a su antigua posición. Tratamos de implementar una reacción
            basada en el vector entre el punto y el centro del círculo, pero no nos funcionón (está debajo del primer return)

        */

        circleToPolygon(x_old, y_old, x_point, y_point, radio, polygon){


          var edgeCatched = false;
          for (let i = 0; i < poly.length && !edgeCatched; i++) {
           
            if(Collider.detector.circleToCircle(x_point,y_point,poly[i][0],poly[i][1],radio, 10)){

                return new Vector2D( x_old, y_old );
              edgeCatched = true;
              
              var punto_1 = poly[(i>0) ? i-1 : poly.length-1];
              var punto_2 = poly[(i< poly.length-1) ? i+1 : 0];
  
              var AB1 = new Vector2D(punto_1[0]-poly[i][0], punto_1[1]-poly[i][1]);
              var AB2 = new Vector2D(punto_2[0]-poly[i][0], punto_2[1]-poly[i][1]);
  
              var PC = new Vector2D(x_old-poly[i][0], y_old-poly[i][1]);
  
              var a1 = AB1.getAngle()*(180/Math.PI);
              var a2 = AB2.getAngle()*(180/Math.PI);
  
              var apj = PC.getAngle()*(180/Math.PI);
  
  
  
              if ( Math.abs(a1-apj) < Math.abs(a2-apj) ){             
                return Collider.reaction.circleToLine(x_point,y_point,radio,poly[i][0],poly[i][1],punto_1[0],punto_1[1] );
                
              }else {
                return Collider.reaction.circleToLine(x_point,y_point,radio,poly[i][0],poly[i][1],punto_2[0],punto_2[1] );
  
              }
              
            }
          }
  
          if(!edgeCatched){
            for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {

               
                if(Collider.detector.circleToLine(x_point,y_point, radio, polygon[i][0],polygon[i][1],polygon[j][0],polygon[j][1])){
                    
                    var b = new Vector2D(polygon[j][0]-polygon[i][0], polygon[j][1]-polygon[i][1]);
                    var a = new Vector2D(x_point-polygon[i][0] , y_point-polygon[i][1] );
                    
                    var aMod = a.getMagnitude();
                    var bMod = b.getMagnitude();
                    
                    var cosA = (a.x*b.x + a.y*b.y) / (Math.sqrt( a.x*a.x + a.y*a.y ) * Math.sqrt( b.x*b.x + b.y*b.y ));

                    var fraccion = (aMod * cosA) / bMod;

                    //console.log(polygon[j],polygon[i], [x_point, y_point], a, b, aMod, bMod, angle, pEscalar, fraccion, fraccion*b.x, fraccion*b.y);

                    var resultado = new Vector2D(polygon[i][0] + (fraccion)*b.x, polygon[i][1] + (fraccion)*b.y);

                    var AB = new Vector2D(x_point-resultado.x, y_point-resultado.y);
                    
                    AB.convertToUnitary();

                    resultado.x += AB.x*(radio);
                    resultado.y += AB.y*(radio);

                    return resultado;                    

                }
            }

          }
            
            
            return new Vector2D(x_old,y_old);

        },

       
        
        /*
            La nueva posici�n del c�rculo es la posici�n del segundo desplazado a una distancia
            de los dos radios en la direcci�n que marca el vector unitario de Cr�culo1C�rculo2
        */
        circleToLine(x_circle, y_circle, radio, x_point1, y_point1, x_point2, y_point2){
            
            
            var b = new Vector2D(x_point2-x_point1, y_point2-y_point1);
            var a = new Vector2D(x_circle-x_point1 , y_circle-y_point1 );
            
            var aMod = a.getMagnitude();
            var bMod = b.getMagnitude();
            
            var cosA = (a.x*b.x + a.y*b.y) / (Math.sqrt( a.x*a.x + a.y*a.y ) * Math.sqrt( b.x*b.x + b.y*b.y ));

            var fraccion = (aMod * cosA) / bMod;

            var resultado = new Vector2D(x_point1 + (fraccion)*b.x, y_point1 + (fraccion)*b.y);

            var AB = new Vector2D(x_circle-resultado.x, y_circle-resultado.y);
            
            AB.convertToUnitary();

            resultado.x += AB.x*(radio);
            resultado.y += AB.y*(radio);

            return resultado;    
        },
        
        

        // RECT

        rectoToCircle(x_rect, y_rect, rect_width, rect_height, x_circle, y_circle, radio) {
            //TODO
        },


        rectToPoint(x_rect, y_rect, rect_width, rect_height, x_point, y_point) {
            //TODO
        },

        rectToPolygon(x_rect, y_rect, rect_width, rect_height, polygon) {
    
            //TODO
        },

        rectToLine(x_rect, y_rect, rect_width, rect_height, x_point1, y_point1, x_point2, y_point2){
            //TODO
        },


        rectToRect(x_rect1, y_rect1, rect1_width, rect1_height, x_rect2, y_rect2, rect2_width, rect2_height){
            //TODO
        },





        // POLYGON

        polygonToPoint(polygon, x_point, y_point) {
            //TODO
        },

        polygonToPolygon(polygon1, polygon2) {
            //TODO
        },
        
        polygonToRect(polygon, x_rect, y_rect, rect_width, rect_height){
            //TODO
        },


        polygonToCircle(polygon, x_circle, y_circle, radio){
            //TODO
        },
        

        polygonToLine(vertices,  x_ln1,  y_ln1,  x_ln2,  y_ln2) {
            //TODO
        },



        // LINE

        lineToRect(x_point1, y_point1, x_point2, y_point2, x_rect, y_rect, rect_width, rect_height) {
            //TODO
        },



        /*
            Este método no es necesario para nuestro programa, pero teníamos curiosidad y de manera adicional hemos
            decidido explicarlo a través de una referencia.

            http://paulbourke.net/geometry/pointlineplane/

            http://www.jeffreythompson.org/collision-detection/poly-rect.php

            Tenemos las lineas ln1 y ln2, con sus respectivos puntos p1 y p2.
            Formula para encontrar un punto en una linia:
                P = P1 + u(P2 - P1);
                P = Punto a encintrar;
                P1 = Punto inicial de la linia;
                P2 = Punto final de la linia;
                u = escalar que multiplica al vector de la linia (P2 - P1);
            Todos los puntos que existen en la linia recta que va desde P1 a P2 seran en resultado de aplicar la formula mostrada aplicando la u entre 0 y 1:
                formula con u = 0; => P1;
                formula con u = i; => P2;
            Si las dos linias interseccionan, existe un mismo punto (P) en las dos linias:
                P = ln1_P1 + u1(ln1_P2 - ln1_P1);
                P = ln2_P1 + u2(ln2_P2 - ln2_P1);
                0 <= u1 <= 1;
                0 <= u2 <= 1;
            Por tanto, nos queda esta ecuacion:
                ln1_P1 + u1(ln1_P2 - ln1_P1) = ln2_P1 + u2(ln2_P2 - ln2_P1);
            Sacamos las 'x' y las 'y' y resolvemos el sistema de ecuaciones:
                ln1_P1_x + u1(ln1_P2_x - ln1_P1_x) = ln2_P1_x + u2(ln2_P2_x - ln2_P1_x);
                ln1_P1_y + u1(ln1_P2_y - ln1_P1_y) = ln2_P1_y + u2(ln2_P2_y - ln2_P1_y);


        */
        lineToLine( x_ln1_point1, y_ln1_point1, x_ln1_point2, y_ln1_point2, x_ln2_point1, y_ln2_point1, x_ln2_point2, y_ln2_point2) {
            //TODO
        },




        lineToCircle(x_point1, y_point1, x_point2, y_point2, x_circle, y_circle, radio) {
            //TODO
        },
        

        lineToPoint( x_ln_point1,  y_ln_point1,  x_ln_point2,  y_ln_point2,  x_point,  y_point) {
            //TODO
        },

        
        lineToPolygon(x_ln1,  y_ln1,  x_ln2,  y_ln2, vertices){
            //TODO
        }

    }
}

class ColliderResponse {
    info;
    isTrue;

    constructor (isTrue, info){
        this.isTrue = isTrue;
        this.info = info;
    }
}
