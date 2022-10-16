var x1 = 0;
var x2 = 100;
var x3 = 200;

var y1 = 0;
var y2 = -100;
var y3 = 0;

var L1 = (x) =>{
    return ((x-x2)*(x-x3)) / ((x1-x2)*(x1-x3));
}

var L2 = (x) =>{
    return ((x-x1)*(x-x3)) / ((x2-x1)*(x2-x3));
}

var L3 = (x) =>{
    return ((x-x2)*(x-x1)) / ((x3-x2)*(x3-x1));
}

y = L1(x)*y1 + L2(x)*y2 + L3(y3)*y3;
