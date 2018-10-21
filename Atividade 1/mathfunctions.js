function Vec2(){
    this.x = 0;
    this.y = 0;
}

Vec2.prototype.set = function(x,y) {
    this.x = x;
    this.y = y;
};

function Polygon() {
    this.points = []
}

Polygon.prototype.add = function(vec) {
    this.points.push(vec);
};


function Line() {
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
}

Line.prototype.set = function(x1,y1,x2,y2) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
};

function Clipping(){
    this.ymin = 0;
    this.xmin = 0;
    this.ymax = 0;
    this.xmax = 0;
}

Clipping.prototype.show = function() {
    alert("("+this.xmin+" , "+this.ymin+"),("+this.xmax+" , "+this.ymax+")");
};

Clipping.prototype.width = function() {
    return (this.xmax-this.xmin);
};

Clipping.prototype.height = function() {
    return (this.ymax-this.ymin);
};

Clipping.prototype.center = function() {
    return [(this.xmax+this.xmin)/2.,(this.ymax+this.ymin)/2.];
};

function translate(x, y) { // dado dois pontos, x e y constroi a matriz homogenea de translação
    return [
        [1, 0, x],
        [0, 1, y],
        [0, 0, 1]
    ]; //retorna matriz 3x3
}

function scale(x, y) { // dado dois pontos, x e y constroi a matriz homogenea de translação
    return [
        [x, 0, 0],
        [0, y, 0],
        [0, 0, 1]
    ]; //retorna matriz 3x3
}

function rotate(theta) { // rotaciona theta em graus
    theta = Math.PI * theta / 180.; //transforma theta em ratianos
    return [
        [Math.cos(theta), -Math.sin(theta), 0],
        [Math.sin(theta), Math.cos(theta), 0],
        [0, 0, 1]
    ]; //retorna matriz 3x3
}

function transformCanvas(Width,Height) {
    return [
        [1, 0, Width / 2],
        [0, -1, Height / 2],
        [0, 0, 1]
    ];
}

function mult(A, B) { //multiplicação de duas matrizes 3x3
    var C = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    var i;
    var j;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            C[i][j] = A[i][0] * B[0][j] + A[i][1] * B[1][j] + A[i][2] * B[2][j];
        }
    }
    return C; //retorna uma matriz 3x3
}

function multVec(A, b) { //multiplicação de uma matriz (3x3) e um vetor
    var C = [0, 0, 0];
    var i;
    var j;
    for (i = 0; i < 3; i++) {
        C[i] = A[i][0] * b[0] + A[i][1] * b[1] + A[i][2] * b[2];
    }
    return C; //retorna um vetor
}

function module(a, b) { //calcula modulo do vetor (a,b)
    return Math.sqrt(a * a + b * b);
}
