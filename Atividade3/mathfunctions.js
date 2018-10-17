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

Vec3.prototype.render = function(ctx) {
  var self = this;

  ctx.save();

  ctx.fillStyle = '#0084b4';

  ctx.beginPath();
  ctx.arc(self.x, self.y,self.z, 6, 0, 2.0*Math.PI);
  ctx.fill();

  ctx.restore();
}


/**
 * Hermite
 */

function hermiteMatrix(){
  return [
      [2, -2, 1, 1],
      [-3, 3, -2, -1],
      [0, 0, 1, 0],
      [1,0, 0, 0]
  ]; //retorna matriz hermite 4x4
}
function bezierMatrix(){
  return (1/2)[
      [-1, 3, -3, 1],
      [3, -6, 3, 0],
      [-3, 3, 1, 0],
      [1,0, 0, 0]
  ]; //retorna matriz hermite 4x4
}
function hermite(p1,p2,t1,t2,u){
  //u = [Math.pow(u, 3), Math.pow(u, 2), Math.pow(u, 3), 1];
   b = [p1,p2,t1,t2]
   b1 = b[0].map((col, i) => b.map(row => row[i])); //q
  // m = [
  //     [2, -2, 1, 1],
  //     [-3, 3, -2, -1],
  //     [0, 0, 1, 0],
  //     [1,0, 0, 0]
  // ];
  //  resul = multVec(m,u);
  // ponto = multMatrix(b1,([[resul.x], [resul.y], [resul.z], [1]]));
  m = [
      [(2*Math.pow(u,3))-(3*Math.pow(u,2))+1],
      [((-2)*Math.pow(u,3))+(3*Math.pow(u,2))],
      [Math.pow(u,3)-(2*Math.pow(u,2))+u],
      [Math.pow(u,3)-Math.pow(u,2)]
      ];
  m1 = m[0].map((col, i) => m.map(row => row[i]));
  ponto = multMatrix(b1,([[m[0]], [m[1]], [m[2]], m[3]]))
  return ponto;
}

// Bezier

function bezier(p1,p2,t1,t2,u){
  //u = [Math.pow(u, 3), Math.pow(u, 2), Math.pow(u, 3), 1];
  b = [p1,p2,t1,t2]
  b1 = b[0].map((col, i) => b.map(row => row[i]));
  // m = [
  //     [-1, 3, -3, 1],
  //     [3, -6, 3, 0],
  //     [-3, 3, 1, 0],
  //     [1,0, 0, 0]
  // ];
  m = [
      [(-Math.pow(u,3)+(3*Math.pow(u,2))-(3*u)+1)],
      [(3*Math.pow(u,3))-(6*Math.pow(u,2))+(3*u)],
      [((-3)*Math.pow(u,3))+(3*Math.pow(u,2))],
      [Math.pow(u,3)]
  ]
  m1 = m[0].map((col, i) => m.map(row => row[i]));
  ponto = multMatrix(b1,([[m[0]], [m[1]], [m[2]], m[3]]))
  return ponto;
}


function identity() { // identidade
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]; //retorna matriz 4x4
}
//Matriz de escala(sx,sy,sz) com retorno: 4x4
function scaleMatrix(sx,sy,sz) { // identidade
    return [
        [sx, 0, 0, 0],
        [0, sy, 0, 0],
        [0, 0, sz, 0],
        [0, 0, 0, 1]
    ]; //retorna matriz 4x4
}
function scaleMatrixI(sx,sy,sz) { // identidade
       return [
           [1/sx, 0, 0, 0],
           [0, 1/sy, 0, 0],
           [0, 0, 1/sz, 0],
           [0, 0, 0, 1]
       ]; //retorna matriz 4x4
}

function transpose1(T){
  return [
      [T[0][0]],
      [T[0][1]],
      [T[0][2]],
      [T[0][3]]
    ];
}
//matriz transposta de uma matriz 4x4
function transpose(T){
    return [
        [T[0][0], T[1][0], T[2][0],T[3][0]],
        [T[0][1], T[1][1], T[2][1],T[3][1]],
        [T[0][2], T[1][2], T[2][2],T[3][2]],
        [T[0][3], T[1][3], T[2][3],T[3][3]]
    ];
}

//TODO: definir matriz de translação (tx,ty,tz) com retorno: 4x4

//TODO: definir matriz de translação (tx,ty,tz) com retorno: 4x4
 function translate(tx,ty,tz){
     return [
         [1, 0, 0,tx],
         [0, 1, 0,ty],
         [0, 0, 1,tz],
         [0, 0, 0,1]
     ];
 }
 function translateI(tx,ty,tz){
     matrix = [
         [1, 0, 0,-tx],
         [0, 1, 0,-ty],
         [0, 0, 1,-tz],
         [0, 0, 0,1]
     ]
     return matrix;
 }

function rotateMatrix(x0,y0,z0){
        return multMatrix(rotateX(x0),multMatrix(rotateY(y0),rotateZ(z0)));
    }
    function rotateMatrixI(x0,y0,z0){
        return multMatrix(transpose(rotateX(x0)),multMatrix(transpose(rotateY(y0)),transpose(rotateZ(z0))));
    }
    //TODO: definir matriz de rotação no eixo x passando um angulo em graus com retorno: 4x4
    function rotateX(x0){
        var theta = (x0*Math.PI)/180;
        return [
            [1, 0, 0,0],
            [0, Math.cos(theta), -Math.sin(theta) ,0],
            [0, 0, 1,0],
            [0, 0, 0,1]
        ];
    }
    function rotateXI(x0){
        var theta = (x0*Math.PI)/180;
        matrix = [
            [1, 0, 0,0],
            [0, Math.cos(theta), -Math.sin(theta) ,0],
            [0, 0, 1,0],
            [0, 0, 0,1]
        ]
        return transpose(matrix)
    }
    //TODO: definir matriz de rotação no eixo y passando um angulo em graus com retorno: 4x4
    function rotateY(y0){
        var theta = (y0*Math.PI)/180;
        return [
            [Math.cos(theta), 0, Math.sin(theta),0],
            [0, 1, 0 ,0],
            [-Math.sin(theta), Math.cos(theta), 1,0],
            [0, 0, 0,1]
        ];
    }
    function rotateYI(y0){
        var theta = (y0*Math.PI)/180;
        matrix = [
            [1, 0, 0,0],
            [0, Math.cos(theta), -Math.sin(theta) ,0],
            [0, 0, 1,0],
            [0, 0, 0,1]
        ]
        return transpose(matrix)
    }
    //TODO: definir matriz de rotação no eixo z passando um angulo em graus com retorno: 4x4
    function rotateZ(z0){
        var theta = (z0*Math.PI)/180;
        return [
            [Math.cos(theta), -Math.sin(theta), 0,0],
            [Math.sin(theta), Math.cos(theta), 0 ,0],
            [0, 0, 1,0],
            [0, 0, 0,1]
        ];
    }
    function rotateZI(z0){
        var theta = (z0*Math.PI)/180;
        matrix = [
            [1, 0, 0,0],
            [0, Math.cos(theta), -Math.sin(theta) ,0],
            [0, 0, 1,0],
            [0, 0, 0,1]
        ]
        return transpose(matrix)
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

function multVec(A, b) { //multiplicação de uma matriz (4x4) e um vetor 4x1
    var C = [0, 0, 0, 1];
    var i;
    for (i = 0; i < 4; i++) {
        C[i] = A[i][0] * b[0] + A[i][1] * b[1] + A[i][2] * b[2] + + A[i][3] * b[3];

    }
    return new Vec3(C[0],C[1],C[2],C[3]); //retorna um vetor 4x1
}
function mult(a, b) {
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
  
function transformCanvas(Width,Height) {
    return [
        [1, 0, 0, Width / 2.],
        [0, -1, 0, Height / 2.],
        [0, 0, 1,0],
        [0, 0, 0,1]
    ];
}
function transformWorld(Width,Height) {
        return [
            [1, 0, 0, -(Width / 2)],
            [0, -1, 0, (Height / 2)],
            [0, 0, 1,0],
            [0, 0, 0,1]
        ];
}
