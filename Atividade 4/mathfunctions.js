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
        [1, 0, Width / 2.],
        [0, -1, Height / 2.],
        [0, 0, 1]
    ];
}

// function mult(A, B) { //multiplicação de duas matrizes 3x3
//     var C = [
//         [1, 0, 0],
//         [0, 1, 0],
//         [0, 0, 1]
//     ];
//     var C = [];
//     for(var i=0; i<A.length; i++) {
//         C[i] = new Array(B[0].length);
//     }
//     var i;
//     var j;
//     for (i = 0; i < C.length; i++) {
//         for (j = 0; j < C[0].length; j++) {
//             C[i][j] = A[i][i] * B[0][j] + A[i][1] * B[1][j] + A[i][2] * B[2][j];
//         }
//     }
//     return C; //retorna uma matriz 3x3
// }

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

function multVec(A, b) { //multiplicação de uma matriz (3x3) e um vetor
    var C = [0, 0, 0];
    var i;
    var j;
    for (i = 0; i < 3; i++) {
        C[i] = A[i][0] * b[0] + A[i][1] * b[1] + A[i][2] * b[2];
    }
    return C; //retorna um vetor
}

function versor(v){
    var m = module(v[0],v[1]);
    return [v[0]/m,v[1]/m];
}

function ease(t,k1,k2){
    var f,s;
    f = ((k1*2)/Math.PI) + k2 - k1 + (((1 - k2)*2)/Math.PI);
    if(t < k1){
        s = ((k1*(2/Math.PI))*(Math.sin(((t/k1)*(Math.PI/2))-(Math.PI/2))+1));
    }else if(t < k2){
        s = ((2*k1)/Math.PI) + t - k1;
    }else{
        s = ((2*k1)/Math.PI) + k2 - k1 + (((1-k2)*(2/Math.PI)) * Math.sin(((t - k2)/(1 - k2))*(Math.PI/2)));
    }
    return s/f;
}

function module(a, b) { //calcula modulo do vetor (a,b)
    return Math.sqrt(a * a + b * b);
}
