function Vec3(){
    this.x = 0;
    this.y = 0;
    this.z = 0;
}

function Vec3(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}

Vec3.prototype.set = function (v) {
    this.x = v;
    this.y = v;
    this.z = v;
}

Vec3.prototype.set = function (x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

Vec3.prototype.sum = function (p1,p2) {
    p = new Vec3();
    p.x = p1.x+p2.x;
    p.y = p1.y+p2.y;
    p.z = p1.z+p2.z;
    return p;
}

function translateMatrix(tx,ty){
    return [
        [1, 0, tx],
        [0, 1, ty],
        [0, 0, 1]
    ]; //retorna matriz 4x4
}

function scaleMatrix(sx,sy,sz) { // identidade 
    return [
        [sx, 0, 0],
        [0, sy, 0],
        [0, 0, 1],
    ]; //retorna matriz 4x4
}

function rotate(theta) { // rotaciona theta em graus
    theta = Math.PI * theta / 180.; //transforma theta em ratianos
    return [
        [Math.cos(theta), -Math.sin(theta), 0],
        [Math.sin(theta), Math.cos(theta), 0],
        [0, 0, 1]
    ]; //retorna matriz 3x3
}
function rotateMatrixX(theta){
    var theta = (theta*Math.PI)/180.;
    return [
        [1,               0,                0, 0],
        [0, Math.cos(theta), -Math.sin(theta), 0],
        [0, Math.sin(theta),  Math.cos(theta), 0],
        [0,               0,                0, 1]
    ]; //retorna matriz 4x4
}

function rotateMatrixY(theta){
    var theta = (theta*Math.PI)/180.;
    return [
        [ Math.cos(theta), 0, Math.sin(theta), 0],
        [               0, 1,               0, 0],
        [-Math.sin(theta), 0, Math.cos(theta), 0],
        [0,                0,               0, 1]
    ]; //retorna matriz 4x4
}
function rotateMatrixZ(theta){
    var theta = (theta*Math.PI)/180.;
    return [
        [Math.cos(theta),-Math.sin(theta), 0, 0],
        [Math.sin(theta), Math.cos(theta), 0, 0],
        [              0,               0, 1, 0],
        [              0,               0, 0, 1]
    ]; //retorna matriz 4x4
}


function transformCanvas(Width,Height) {
    return [
        [1, 0, Width / 2.],
        [0, -1,Height / 2.],
        [0, 0, 1]
    ];
}

function mult(A, B) { //multiplicação de duas matrizes 4x4
    var C = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
    var i;
    var j;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            C[i][j] = A[i][0] * B[0][j] + A[i][1] * B[1][j] + A[i][2] * B[2][j] + A[i][3] * B[3][j];
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
    return new Vec3(C[0],C[1],C[2]); //retorna um vetor
}
function multMatrix(a, b) {
    var aNumRows = a.length, aNumCols = a[0].length,
        bNumRows = b.length, bNumCols = b[0].length,
        m = new Array(aNumRows);  // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
      m[r] = new Array(bNumCols); // initialize the current row
      for (var c = 0; c < bNumCols; ++c) {
        m[r][c] = 0;             // initialize the current cell
        for (var i = 0; i < aNumCols; ++i) {
          m[r][c] += a[r][i] * b[i][c];
        }
      }
    }
    return m;
  }
function module(a, b) { //calcula modulo do vetor (a,b)
    return Math.sqrt(a * a + b * b);
}
  function multVec2(A, b) { //multiplicação de uma matriz (4x4) e um vetor 4x1
    var C = [0, 0, 0, 1];
    var i;
    for (i = 0; i < 4; i++) {
        C[i] = A[i][0] * b[0] + A[i][1] * b[1] + A[i][2] * b[2] + + A[i][3] * b[3];
    }
    return new Vec3(C[0],C[1],C[2],C[3]); //retorna um vetor 4x1
}