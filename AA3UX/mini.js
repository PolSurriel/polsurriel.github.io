var n = (`
Ex48*Ex48*Ex22 7x5 Ex21
*Ex20 7x1 8x7 Ex20
*Ex19 8x11 7x1 Ex17
*Ex17 7x1 8x13 7x1 Ex16
*Ex17 8x4 6x3 8x8 Ex16
*Ex16 8x2 6x6 8x2 6x5 8x2 Ex15
*Ex16 8x2 6x6 8x1 6x7 8x1 Ex15
*Ex15 7x1 8x8 6x9 Ex15
*Ex15 8x9 6x9 Ex15
*Ex15 8x1 6x2 8x1 7x8 6x6 Ex15
*Ex15 8x1 6x1 7x12 8x1 6x3 Ex15
*Ex15 8x2 7x14 6x3 Ex14
*Ex15 8x2 7x14 6x3 Ex14
*Ex15 8x2 7x15 6x2 Ex14
*Ex15 8x2 7x2 8x3 7x3 8x3 7x1 8x1 7x2 6x1 7x1 Ex14
*Ex16 8x1 7x2 8x3 7x2 8x6 7x3 Ex15
*Ex16 7x9 8x1 7x3 8x1 7x3 Ex15
*Ex16 7x16 Ex16 
*Ex17 7x15 Ex16
*Ex17 7x15 Ex16
*Ex17 7x8 8x2 7x5 Ex16
*Ex17 7x4 8x2 7x1 8x2 6x2 7x3 Ex17
*Ex18 7x2 8x6 6x2 8x1 7x2 Ex17
*Ex18 7x1 8x7 6x3 8x1 7x1 Ex17
*Ex18 8x4 7x1 8x3 6x4 Ex18
*Ex17 6x4 8x5 6x4 7x1 Ex17
*Ex16 0x2 6x4 8x3 0x3 6x1 7x1 8x1 Ex17
*Ex15 0x3 Fx1 6x4 8x1 6x1 0x2 6x1 7x2 Fx1 6x1 Ex16
*Ex14 0x4 7x2 8x4 6x2 7x3 Fx2 6x1 8x2 Ex14
*Ex13 0x5 7x3 8x3 7x5 Fx2 6x1 8x3 Ex13
*Ex10 8x1 6x1 0x7 7x2 Fx1 8x2 7x4 Fx3 6x2 8x3 6x1 7x1 Ex10
*Ex8 0x12 7x1 Fx3 7x3 Fx3 6x3 8x2 6x5 Ex8
*Ex5 0x10 7x2 0x3 7x1 Fx3 7x3 Fx3 6x12 8x1 7x1 Ex4
*Ex2 8x1 0x11 7x3 0x4 Fx3 7x3 Fx3 6x15  Ex3
*Ex2 0x12 8x2 7x1 0x4 Fx3 7x3 0x1 Fx2 6x15 Ex3
*Ex2 0x11 7x1 8x2 7x1 0x4 6x1 Fx2 8x2 7x1 Fx3 6x15 7x1 Ex2
*Ex1 7x1 0x10 7 x5 0x4 Fx3 8x1 6x1 7x1 Fx2 6x16 8x1 Ex2
*Ex1 0x11 7x5 Fx7 0x3 Fx2 6x16 8x1 Ex2
*Ex1 0x10 7x8 Fx4 6x2 0x3 Fx1 6x16 8x1 Ex2
*Ex1 0x10 7x10 Fx1 6x3 0x4 6x16 8x2 Ex1
*Ex1 0x9 8x1 7x10 0x2 6x2 0x4 6x16 8x2 Ex1
*Ex1 0x9 7x10 0x4 6x1 7x1 0x2 6x17 8x2 Ex1`).split('*');

var r=[];
for(let i=0;i<n.length;i++){
    var f=n[i].split(' ');
    r.push([]);
    for(let j= 0;j<f.length;j++){
        var a=fila[j].split('x');
        for(let t=0;t<a[1];t++)
            r[i].push(a[0]);
    }
}