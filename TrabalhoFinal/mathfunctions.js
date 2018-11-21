function Ray(o, d) {
    this.o = o; //origem
    this.d = d; //direção do raio
}

Ray.prototype.show = function () {
    console.log("O" + "(" + this.o.x + "," + this.o.y + "," + this.o.z + "," + this.o.w + ")" + ", d = " + "(" + this.d.x + "," + this.d.y + "," + this.d.z + "," + this.d.w + ")")
}

Ray.prototype.get = function (t) {
    return new Vec3().sum(this.o, this.d.prod(this.d, t));
}

function radToDeg(r) {
  return r * 180 / Math.PI;
  }

function degToRad(d) {
  return d * Math.PI / 180;
}

function Vec3() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 0;
}

function Vec3(x, y, z, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
}

Vec3.prototype.set = function (v) {
    this.x = v;
    this.y = v;
    this.z = v;
}

Vec3.prototype.set = function (x, y, z, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
}
Vec3.prototype.sum = function (p1, p2) {
    return new Vec3(p1.x + p2.x, p1.y + p2.y, p1.z + p2.z);
}
Vec3.prototype.minus = function (p1, p2) {
    return new Vec3(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
}
Vec3.prototype.dot = function (p1, p2) {
    return p1.x * p2.x + p1.y * p2.y + p1.z * p2.z;
}
Vec3.prototype.cross = function (p1, p2) {
    return new Vec3(p1.y * p2.z - p1.z * p2.y, -(p1.x * p2.z - p1.z * p2.x), p1.x * p2.y - p1.y * p2.x);
}
Vec3.prototype.module = function (p) {
    return Math.sqrt(this.dot(p, p));
}
Vec3.prototype.div = function (p, k) {
    return new Vec3(p.x / k, p.y / k, p.z / k);
}
Vec3.prototype.prod = function (p, k) {
    return new Vec3(p.x * k, p.y * k, p.z * k);
}
Vec3.prototype.compond = function (p, p0) {
    return new Vec3(p.x * p0.x, p.y * p0.y, p.z * p0.z);
}
Vec3.prototype.unitary = function (p) {
    var m = this.module(p);
    return new Vec3(p.x / m, p.y / m, p.z / m);
}
Vec3.prototype.reverse = function (p){
    return new Vec3(-p.x, -p.y, -p.z);
}
Vec3.prototype.angleBetweenVectors = function(p1,p2){
   var top = Vec.dot(p1,p2);
   var bottom = (Math.pow((p1.x*p1.x+p1.y*p1.y+p1.z*p1.z),1/2)*Math.pow((p2.x*p2.x+p2.y*p2.y+p2.z*p2.z),1/2));
   var angle = top/bottom;
   return Math.acos(angle);
}

Vec3.prototype.show = function () {
    console.log("x: " + this.x + ", y: " + this.y + ", z: " + this.z);
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
function scaleMatrix(sx, sy, sz) { // identidade
    return [
        [sx, 0, 0, 0],
        [0, sy, 0, 0],
        [0, 0, sz, 0],
        [0, 0, 0, 1]
    ]; //retorna matriz 4x4
}

function scaleMatrixI(sx, sy, sz) { // identidade
    return [
        [1. / sx, 0, 0, 0],
        [0, 1. / sy, 0, 0],
        [0, 0, 1. / sz, 0],
        [0, 0, 0, 1]
    ]; //retorna matriz 4x4
}

//matriz transposta de uma matriz 4x4
function transpose(T) {
    return [
        [T[0][0], T[1][0], T[2][0], T[3][0]],
        [T[0][1], T[1][1], T[2][1], T[3][1]],
        [T[0][2], T[1][2], T[2][2], T[3][2]],
        [T[0][3], T[1][3], T[2][3], T[3][3]]
    ];
}

//TODO: definir matriz de translação (tx,ty,tz) com retorno: 4x4
function translateMatrix(tx, ty, tz) {
    return [
        [1, 0, 0, tx],
        [0, 1, 0, ty],
        [0, 0, 1, tz],
        [0, 0, 0, 1]
    ]; //retorna matriz 4x4
}

function translateMatrixI(tx, ty, tz) {
    return [
        [1, 0, 0, -tx],
        [0, 1, 0, -ty],
        [0, 0, 1, -tz],
        [0, 0, 0, 1]
    ]; //retorna matriz 4x4
}

//TODO: definir matriz de rotação no eixo x passando um angulo em graus com retorno: 4x4
function rotateMatrixX(theta) {
    var theta = (theta * Math.PI) / 180.;
    return [
        [1, 0, 0, 0],
        [0, Math.cos(theta), -Math.sin(theta), 0],
        [0, Math.sin(theta), Math.cos(theta), 0],
        [0, 0, 0, 1]
    ]; //retorna matriz 4x4
}

function rotateMatrixXI(theta) {
    return transpose(rotateMatrixX(theta));
}

function rotateMatrixY(theta) {
    var theta = (theta * Math.PI) / 180.;
    return [
        [Math.cos(theta), 0, Math.sin(theta), 0],
        [0, 1, 0, 0],
        [-Math.sin(theta), 0, Math.cos(theta), 0],
        [0, 0, 0, 1]
    ]; //retorna matriz 4x4
}

function rotateMatrixYI(theta) {
    return transpose(rotateMatrixY(theta));
}

function rotateMatrixZ(theta) {
    var theta = (theta * Math.PI) / 180.;
    return [
        [Math.cos(theta), -Math.sin(theta), 0, 0],
        [Math.sin(theta), Math.cos(theta), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]; //retorna matriz 4x4
}

function rotateMatrixZI(theta) {
    return transpose(rotateMatrixZ(theta));
}
//TODO: definir matriz de rotação no eixo y passando um angulo em graus com retorno: 4x4

//TODO: definir matriz de rotação no eixo z passando um angulo em graus com retorno: 4x4

function multMatrix(a, b) {
    var aNumRows = a.length,
        aNumCols = a[0].length,
        bNumRows = b.length,
        bNumCols = b[0].length,
        m = new Array(aNumRows); // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols); // initialize the current row
        for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0; // initialize the current cell
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
        C[i] = A[i][0] * b[0] + A[i][1] * b[1] + A[i][2] * b[2] + +A[i][3] * b[3];
    }
    return new Vec3(C[0], C[1], C[2], C[3]); //retorna um vetor 4x1
}

function multVec4(A, p) { //multiplicação de uma matriz (4x4) e um vetor 4x1
    var b = [p.x, p.y, p.z, 1];
    var C = [0, 0, 0, 1];
    var i;
    for (i = 0; i < 4; i++) {
        C[i] = A[i][0] * b[0] + A[i][1] * b[1] + A[i][2] * b[2] + +A[i][3] * b[3];
    }
    return new Vec3(C[0], C[1], C[2], C[3]); //retorna um vetor 4x1
}

function transformCanvas(Width, Height) {
    return [
        [1, 0, 0, Width / 2.],
        [0, -1, 0, Height / 2.],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
}

function transformToSystem(Width, Height) {
    return [
        [1, 0, 0, -Width / 2],
        [0, -1, 0, Height / 2],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
}

//definidos
function convertMatrix(M) {
    var b = new glMatrixArrayType(16);
    b[0] = M[0][0];
    b[1] = M[1][0];
    b[2] = M[2][0];
    b[3] = M[3][0];
    b[4] = M[0][1];
    b[5] = M[1][1];
    b[6] = M[2][1];
    b[7] = M[3][1];
    b[8] = M[0][2];
    b[9] = M[1][2];
    b[10] = M[2][2];
    b[11] = M[3][2];
    b[12] = M[0][3];
    b[13] = M[1][3];
    b[14] = M[2][3];
    b[15] = M[3][3];
    return b;
}

function createFromLines(l0, l1, l2, l3) {
    var b = new glMatrixArrayType(16);
    b[0] = l0[0];
    b[1] = l1[0];
    b[2] = l2[0];
    b[3] = l3[0];
    b[4] = l0[1];
    b[5] = l1[1];
    b[6] = l2[1];
    b[7] = l3[1];
    b[8] = l0[2];
    b[9] = l1[2];
    b[10] = l2[2];
    b[11] = l3[2];
    b[12] = l0[3];
    b[13] = l1[3];
    b[14] = l2[3];
    b[15] = l3[3];
    return b;
}
//de câmera para mundo
function lookAtM(eye, at, up) {
    var F = identity();
    Vec = new Vec3();
    zc = Vec.unitary(Vec.minus(eye, at));
    xc = Vec.unitary(Vec.cross(up, zc));
    yc = Vec.unitary(Vec.cross(zc, xc));
    F[0][0] = xc.x;
    F[0][1] = yc.x;
    F[0][2] = zc.x;

    F[1][0] = xc.y;
    F[1][1] = yc.y;
    F[1][2] = zc.y;

    F[2][0] = xc.z;
    F[2][1] = yc.z;
    F[2][2] = zc.z;

    F[0][3] = eye.x;
    F[1][3] = eye.y;
    F[2][3] = eye.z;
    return F;
}

//de mundo para camera
function lookAtInverseM(eye, at, up) {
    var F = identity();
    Vec = new Vec3();
    zc = Vec.unitary(Vec.minus(eye, at));
    xc = Vec.unitary(Vec.cross(up, zc));
    yc = Vec.unitary(Vec.cross(zc, xc));


    F[0][0] = xc.x;
    F[0][1] = xc.y;
    F[0][2] = xc.z;

    F[1][0] = yc.x;
    F[1][1] = yc.y;
    F[1][2] = yc.z;

    F[2][0] = zc.x;
    F[2][1] = zc.y;
    F[2][2] = zc.z;

    F[0][3] = -Vec.dot(eye, xc);
    F[1][3] = -Vec.dot(eye, yc);
    F[2][3] = -Vec.dot(eye, zc);
    return F;
}

//ids shape
var sphere = 1;

function Camera(eye, at, up) {
    this.eye = eye;
    this.at = at;
    this.up = up;
}

Camera.prototype.lookAt = function () {
    return lookAtM(this.eye, this.at, this.up);
}

Camera.prototype.lookAtInverse = function () {
    return lookAtInverseM(this.eye, this.at, this.up);
}

var ambient = 0;
var pontual = 1;
var direction = 2;
var spot = 3;
function Light(type = 0) {
    if (type == ambient) {
        this.type = ambient;
        this.ambient = new Vec3(0, 0, 0);
    } else if (type == pontual) {
        this.type = pontual;
        this.position = new Vec3(0, 0, 0);
        this.ambient = new Vec3(0, 0, 0);
        this.specular = new Vec3(0, 0, 0);
        this.difuse = new Vec3(0, 0, 0);
        this.attenuation = new Vec3(0, 0, 0);
    } else if (type == direction) {
      this.type = direction;
      this.direction = new Vec3(0, 0, 0);
      this.ambient = new Vec3(0, 0, 0);
      this.specular = new Vec3(0, 0, 0);
      this.difuse = new Vec3(0, 0, 0);
      this.attenuation = new Vec3(0, 0, 0);
    } else if (type == spot) {
      this.type = spot;
      this.position = new Vec3(0, 0, 0);
      this.direction = new Vec3(0,0,0);
      this.ambient = new Vec3(0, 0, 0);
      this.specular = new Vec3(0, 0, 0);
      this.difuse = new Vec3(0, 0, 0);
      this.attenuation = new Vec3(0, 0, 0);
      this.coneGap = 0;
    }

}

Light.prototype.setPosition = function (x = 0, y = 0, z = 0) {
    this.position = new Vec3(x, y, z);
}
Light.prototype.setDirection = function (x = 0, y = 0, z = 0) {
    this.direction = new Vec3(x, y, z);
}
Light.prototype.setConeGap = function (value = 0) {
    this.coneGap = value;
}
Light.prototype.setAmbient = function (x = 0, y = 0, z = 0) {
    this.ambient = new Vec3(x, y, z);
}

Light.prototype.setSpecular = function (x = 0, y = 0, z = 0) {
    this.specular = new Vec3(x, y, z);
}

Light.prototype.setDifuse = function (x = 0, y = 0, z = 0) {
    this.difuse = new Vec3(x, y, z);
}

Light.prototype.setAttenuation = function (x = 0, y = 0, z = 0) {
    this.attenuation = new Vec3(x, y, z);
}
time = 0;
Light.prototype.getColor = function (shape, p, n, v) { //p = posição de interseção, n = normal e v=posição do observador
    var Vec = new Vec3();
    if (this.type == ambient) {
        return Vec.compond(shape.ambient, this.ambient);
    } else if (this.type == pontual) {
        var amb = Vec.compond(shape.ambient, this.ambient);

        //vetor indo da posição da interseção para a posição da luz
        var l = Vec.minus(this.position, p);

        //vetor indo da posição da observador para a posição do interseção
        v = Vec.minus(p, v);

        //vetor indo da posição da luz para a posição da interseção
        d = Vec.module(Vec.minus(p, this.position));
        var att = 1. / (this.attenuation.x + this.attenuation.y * d + this.attenuation.z * d * d);
        var factor_diff = 0;
        if (Vec.dot(l, n) > 0) {
            factor_diff = Math.max(Vec.dot(l, n) / (Vec.module(l) * Vec.module(n)), 0);
        }
        //material do objeto com a luz -> cor difusa
        var diff = Vec.compond(shape.difuse, this.difuse);
        //aplicando o fator e a atenuação
        diff = Vec.prod(diff, att * factor_diff);

        //parte especular
        l = Vec.unitary(l);
        var r = Vec.minus(Vec.prod(Vec.prod(n, Vec.dot(l, n)), 2), l);
        //vetor indo da posição da luz para a posição do vetor v
        var h = Vec.minus(v, this.position)
        var h = Vec.unitary(h);
        r = Vec.unitary(Vec.sum(r, h));
        factor_spe = 0;
        if (Vec.dot(r, n) > 0) {
            factor_spe = Math.max(Math.pow(Vec.dot(r, n), shape.shine), 0);
        }
        //material do objeto com a luz -> cor especular
        var spe = Vec.compond(shape.specular, this.specular);
        //aplicando o fator e a atenuação
        spe = Vec.prod(spe, att * factor_spe);
        return Vec.sum(amb, Vec.sum(diff, spe));


    } else if (this.type == direction) {
      var amb = Vec.compond(shape.ambient, this.ambient);

      //vetor indo da posição da interseção para a posição da luz
      var l = this.direction;
      //vetor indo da posição da observador para a posição do interseção
      var v = Vec.minus(p, v);

      //vetor indo da posição da intersecção para a posição da luz
      //d = Vec.module(this.direction);
      d = Vec.module(Vec.reverse(this.direction));
      //atenuação
      var att = 1. / (this.attenuation.x + this.attenuation.y * d + this.attenuation.z * d * d);
      var factor_diff = 0;
      if (Vec.dot(l, n) > 0) {
          factor_diff = Math.max(Vec.dot(l, n) / (Vec.module(l) * Vec.module(n)), 0);
      }
      //material do objeto com a luz -> cor difusa
      var diff = Vec.compond(shape.difuse, this.difuse);
      //aplicando o fator e a atenuação
      diff = Vec.prod(diff, att * factor_diff);

      //parte especular
      l = Vec.unitary(l);
      var r = Vec.minus(Vec.prod(Vec.prod(n, Vec.dot(l, n)), 2), l);
      var h =Vec.minus(v, this.direction);
      var h = Vec.unitary(h);
      r = Vec.unitary(Vec.sum(r, h));
      factor_spe = 0;
      if (Vec.dot(r, n) > 0) {
          factor_spe = Math.max(Math.pow(Vec.dot(r, n), shape.shine), 0);
      }
      //material do objeto com a luz -> cor especular
      var spe = Vec.compond(shape.specular, this.specular);
      //aplicando o fator e a atenuação
      spe = Vec.prod(spe, att * factor_spe);
      return Vec.sum(amb, Vec.sum(diff, spe));
    } else if (this.type == spot) {
        var amb = Vec.compond(shape.ambient, this.ambient);

        //vetor indo da posição da interseção para a posição da luz
        var l = Vec.minus(this.position, p);

        //raio da direção  da luz para o ponto de intersecao
        var d = Vec.minus(p, this.position)

        v = Vec.minus(p, v);

        var coneDirection = Vec.minus(this.direction,this.position);

        //angulo entre vetores em radiano
        var angleVectors = Vec.angleBetweenVectors(d,Vec.reverse(coneDirection));
        angleVectors = radToDeg(angleVectors);

        if(!(angleVectors >= this.coneGap)){
          d = Vec.module(d);

          var att = 1. / (this.attenuation.x + this.attenuation.y * d + this.attenuation.z * d * d);
          var factor_diff = 0;
          if (Vec.dot(l, n) > 0) {
              factor_diff = Math.max(Vec.dot(l, n) / (Vec.module(l) * Vec.module(n)), 0);
          }
          //material do objeto com a luz -> cor difusa
          var diff = Vec.compond(shape.difuse, this.difuse);
          //aplicando o fator e a atenuação
          diff = Vec.prod(diff, att * factor_diff);

          //parte especular
          l = Vec.unitary(l);
          var r = Vec.minus(Vec.prod(Vec.prod(n, Vec.dot(l, n)), 2), l);
          var h = Vec.unitary(Vec.minus(v, this.position));
          r = Vec.unitary(Vec.sum(r, h));
          factor_spe = 0;
          if (Vec.dot(r, n) > 0) {
              factor_spe = Math.max(Math.pow(Vec.dot(r, n), shape.shine), 0);
          }
          //material do objeto com a luz -> cor especular
          var spe = Vec.compond(shape.specular, this.specular);
          //aplicando o fator e a atenuação
          spe = Vec.prod(spe, att * factor_spe);
          return Vec.sum(amb, Vec.sum(diff, spe));
        }
      }


    return new Vec3(0, 0, 0);
}

Light.prototype.getColorWithShadow = function (objects, shape, p, n, v) { //p = posição de interseção, n = normal e v=posição do observador
    var Vec = new Vec3();
    if (this.type == ambient) {
        return Vec.compond(shape.ambient, this.ambient);
    } else if (this.type == pontual) {
        var amb = Vec.compond(shape.ambient, this.ambient);

        //verifica oclusão da luz ao objeto
        var ray_w = new Ray();
        ray_w.o = p;
        ray_w.d = this.position;
        //var result_final = null
        for (var k = 0; k < objects.length; k++) {
            if (shape != objects[k]) {
                var shapet = objects[k];
                //raio transformado em coordenadas do mundo
                var result = shapet.testIntersectionRay(ray_w);
                if (result[0]) {
                    //distancia(luz,intersecao)>distancia(luz,result[1])
                    if (Vec.module(Vec.minus(this.position, p)) >
                    Vec.module(Vec.minus(this.position, result[1]))) {
                        return amb;
                    }

                }
            }
        }


        var l = Vec.minus(this.position, p);
        v = Vec.minus(p, v);
        d = Vec.module(Vec.minus(p, this.position));
        var att = 1. / (this.attenuation.x + this.attenuation.y * d + this.attenuation.z * d * d);
        var factor_diff = 0;
        if (Vec.dot(l, n) > 0) {
            factor_diff = Math.max(Vec.dot(l, n) / (Vec.module(l) * Vec.module(n)), 0);
        }
        //material do objeto com a luz -> cor difusa
        var diff = Vec.compond(shape.difuse, this.difuse);
        //aplicando o fator e a atenuação
        diff = Vec.prod(diff, att * factor_diff);

        //parte especular
        l = Vec.unitary(l);
        var r = Vec.minus(Vec.prod(Vec.prod(n, Vec.dot(l, n)), 2), l);
        var h = Vec.unitary(Vec.minus(v, this.position));
        r = Vec.unitary(Vec.sum(r, h));
        factor_spe = 0;
        if (Vec.dot(r, n) > 0) {
            factor_spe = Math.max(Math.pow(Vec.dot(r, n), shape.shine), 0);
        }
        //material do objeto com a luz -> cor especular
        var spe = Vec.compond(shape.specular, this.specular);
        //aplicando o fator e a atenuação
        spe = Vec.prod(spe, att * factor_spe);
        return Vec.sum(amb, Vec.sum(diff, spe));


    }else if( this.type == direction){
      var amb = Vec.compond(shape.ambient, this.ambient);

      //verifica oclusão da luz ao objeto
      var ray_w = new Ray();
      ray_w.o = p;

      ray_w.d = this.direction;
      //ray_w.d = Vec.minus(this.direction,p);
      //var result_final = null
      for (var k = 0; k < objects.length; k++) {
          if (shape != objects[k]) {
              var shapet = objects[k];
              //raio transformado em coordenadas do mundo
              var result = shapet.testIntersectionRay(ray_w);
              if (result[0]) {
                  //distancia(luz,intersecao)>distancia(luz,result[1])
                  if (Vec.module(Vec.minus(this.direction, p)) >
                  Vec.module(Vec.minus(this.direction, result[1]))) {
                      return amb;
                  }

              }
          }
      }


      //var l = Vec.reverse(this.direction);
      var l = this.direction
      var v = Vec.minus(p, v);
      //d = Vec.module(this.direction);
      d = Vec.module(Vec.reverse(this.direction));
      var att = 1. / (this.attenuation.x + this.attenuation.y * d + this.attenuation.z * d * d);
      var factor_diff = 0;
      if (Vec.dot(l, n) > 0) {
          factor_diff = Math.max(Vec.dot(l, n) / (Vec.module(l) * Vec.module(n)), 0);
      }
      //material do objeto com a luz -> cor difusa
      var diff = Vec.compond(shape.difuse, this.difuse);
      //aplicando o fator e a atenuação
      diff = Vec.prod(diff, att * factor_diff);

      //parte especular
      l = Vec.unitary(l);
      var r = Vec.minus(Vec.prod(Vec.prod(n, Vec.dot(l, n)), 2), l);
      var h =Vec.minus(v, this.direction);
      var h = Vec.unitary(h);
      r = Vec.unitary(Vec.sum(r, h));
      factor_spe = 0;
      if (Vec.dot(r, n) > 0) {
          factor_spe = Math.max(Math.pow(Vec.dot(r, n), shape.shine), 0);
      }
      //material do objeto com a luz -> cor especular
      var spe = Vec.compond(shape.specular, this.specular);
      //aplicando o fator e a atenuação
      spe = Vec.prod(spe, att * factor_spe);
      return Vec.sum(amb, Vec.sum(diff, spe));
    }else if (this.type == spot) {
        var amb = Vec.compond(shape.ambient, this.ambient);
        var l = Vec.minus(this.position, p);

        //raio da direção  da luz para o ponto de intersecao
        var d = Vec.minus(p, this.position)

        v = Vec.minus(p, v);

        var coneDirection = Vec.minus(this.direction,this.position);

        //angulo entre vetores em graus
        var angleVectors = Vec.angleBetweenVectors(d,Vec.reverse(coneDirection));
        //var gapInRad = degToRad(this.coneGap);
        //var angleLight =
        //angleVectors = Math.cos(angleVectors);
        angleVectors = radToDeg(angleVectors);
        //gapInRad = Math.cos(gapInRad);
      if(!(angleVectors >= this.coneGap)){
        //verifica oclusão da luz ao objeto
        var ray_w = new Ray();
        ray_w.o = p;
        ray_w.d = this.position;
        //var result_final = null
        for (var k = 0; k < objects.length; k++) {
            if (shape != objects[k]) {
                var shapet = objects[k];
                //raio transformado em coordenadas do mundo
                var result = shapet.testIntersectionRay(ray_w);
                if (result[0]) {
                    //distancia(luz,intersecao)>distancia(luz,result[1])
                    if (Vec.module(Vec.minus(this.position, p)) >
                    Vec.module(Vec.minus(this.position, result[1]))) {
                        return amb;
                    }

                }
            }
        }



          d = Vec.module(d);
          //console.log(d);
          var att = 1. / (this.attenuation.x + this.attenuation.y * d + this.attenuation.z * d * d);
          var factor_diff = 0;
          if (Vec.dot(l, n) > 0) {
              factor_diff = Math.max(Vec.dot(l, n) / (Vec.module(l) * Vec.module(n)), 0);
          }
          //material do objeto com a luz -> cor difusa
          var diff = Vec.compond(shape.difuse, this.difuse);
          //aplicando o fator e a atenuação
          diff = Vec.prod(diff, att * factor_diff);

          //parte especular
          l = Vec.unitary(l);
          var r = Vec.minus(Vec.prod(Vec.prod(n, Vec.dot(l, n)), 2), l);
          var h = Vec.unitary(Vec.minus(v, this.position));
          r = Vec.unitary(Vec.sum(r, h));
          factor_spe = 0;
          if (Vec.dot(r, n) > 0) {
              factor_spe = Math.max(Math.pow(Vec.dot(r, n), shape.shine), 0);
          }
          //material do objeto com a luz -> cor especular
          var spe = Vec.compond(shape.specular, this.specular);
          //aplicando o fator e a atenuação
          spe = Vec.prod(spe, att * factor_spe);
          return Vec.sum(amb, Vec.sum(diff, spe));
        }
      }



    return new Vec3(0, 0, 0);
}
var sphere = 0;
var cube = 1;
var cone = 2;
var cylinder = 3;

function Shape(type = 0) {
    this.geometry = type;
    this.name = "";
    this.translate = new Vec3(0, 0, 0);
    this.scale = new Vec3(0, 0, 0);
    this.rotate = new Vec3(0, 0, 0);
    this.ambient = new Vec3(0, 0, 0);
    this.specular = new Vec3(0, 0, 0);
    this.difuse = new Vec3(0, 0, 0);
    this.shine = 0;
}



Shape.prototype.setScale = function (x = 0, y = 0, z = 0) {
    this.scale = new Vec3(x, y, z);
}

Shape.prototype.setAmbient = function (x = 0, y = 0, z = 0) {
    this.ambient = new Vec3(x, y, z);
}

Shape.prototype.setSpecular = function (x = 0, y = 0, z = 0) {
    this.specular = new Vec3(x, y, z);
}

Shape.prototype.setDifuse = function (x = 0, y = 0, z = 0) {
    this.difuse = new Vec3(x, y, z);
}

Shape.prototype.setShine = function (x = 0) {
    this.shine = x;
}

Shape.prototype.setTranslate = function (x = 0, y = 0, z = 0) {
    this.translate = new Vec3(x, y, z);
}
Shape.prototype.setRotate = function (x, y, z) {
    this.rotate.x = x;
    this.rotate.y = y;
    this.rotate.z = z;
}

Shape.prototype.setRotateX = function (angle) {
    this.rotate.x = angle;
}

Shape.prototype.setRotateY = function (angle) {
    this.rotate.y = angle;
}

Shape.prototype.setRotateZ = function (angle) {
    this.rotate.z = angle;
}

Shape.prototype.transformMatrix = function () {
    var T = translateMatrix(this.translate.x, this.translate.y, this.translate.z); //TODO: modificar para receber a matriz de escala
    var R = multMatrix(rotateMatrixX(this.rotate.x), multMatrix(rotateMatrixY(this.rotate.y), rotateMatrixZ(this.rotate.z))); //TODO: modificar para receber a matriz de rotação
    var S = scaleMatrix(this.scale.x, this.scale.y, this.scale.z);
    return multMatrix(T, multMatrix(R, S));
}

Shape.prototype.transformMatrixVec = function () {
    var R = multMatrix(rotateMatrixX(this.rotate.x), multMatrix(rotateMatrixY(this.rotate.y), rotateMatrixZ(this.rotate.z))); //TODO: modificar para receber a matriz de rotação
    var S = scaleMatrix(this.scale.x, this.scale.y, this.scale.z);
    return multMatrix(R, S);
}

Shape.prototype.transformMatrixInverse = function () {
    var Ti = translateMatrixI(this.translate.x, this.translate.y, this.translate.z); //TODO: modificar para receber a matriz de escala
    var Ri = multMatrix(rotateMatrixZI(this.rotate.z), multMatrix(rotateMatrixYI(this.rotate.y), rotateMatrixXI(this.rotate.x))); //TODO: modificar para receber a matriz de rotação
    var Si = scaleMatrixI(this.scale.x, this.scale.y, this.scale.z);
    return multMatrix(Si, multMatrix(Ri, Ti));
}

Shape.prototype.transformMatrixVecInverse = function () {
    var Ri = multMatrix(rotateMatrixZI(this.rotate.z), multMatrix(rotateMatrixYI(this.rotate.y), rotateMatrixXI(this.rotate.x))); //TODO: modificar para receber a matriz de rotação
    var Si = scaleMatrixI(this.scale.x, this.scale.y, this.scale.z);
    return multMatrix(Si, Ri);
}

Shape.prototype.testIntersectionRay = function (ray) {
    //salvando raio em coordenadas do mundo para calcular o parâmetro t
    var ray_w = ray;
    var M_i = this.transformMatrixInverse();
    var M_i_v = this.transformMatrixVecInverse();
    var Vec = new Vec3();
    //transformando raio para coordenadas locais do objeto
    Vec = new Vec3();
    ray.d = Vec.minus(ray.d, ray.o);
    ray.o = multVec4(M_i, ray.o);
    ray.d = multVec4(M_i_v, ray.d);
    ray.d = Vec.unitary(ray.d);

    if (this.geometry == sphere) { //testar interseção com a esfera
        //interseção com esfera na origem e raio unitário
        var a = Vec.dot(ray.d, ray.d);
        var b = 2 * (Vec.dot(ray.d, ray.o));
        var c = Vec.dot(ray.o, ray.o) - 1;
        var delta = b * b - 4 * a * c;
        if (delta >= 0) {
            var t1 = (-b + Math.sqrt(delta)) / (2 * a);
            var t2 = (-b - Math.sqrt(delta)) / (2 * a);
            t = Math.min(t1, t2);
            //console.log(b);
            var point = ray.get(t);
            var normal = point;
            var M = this.transformMatrix();
            point = multVec4(M, point);
            M = this.transformMatrixVec();
            normal = multVec4(M, normal);
            normal = Vec.unitary(normal);
            var t_ = Vec.module(Vec.minus(point, ray_w.o));
            return [true, point, normal, t_];
        }

    }
    if (this.geometry == cube) {
        //face xz superior
        var bound_min = new Vec3(-0.5, -0.5, -0.5);
        var bound_max = new Vec3(0.5, 0.5, 0.5);

        var final_normal = null;
        var final_point = null;
        var final_t = null;

        p0 = new Vec3(0.5, 0.5, 0.5);
        n = new Vec3(0, 1, 0);
        if (Vec.dot(ray.d, n) != 0) {
            var t = Vec.dot(Vec.minus(p0, ray.o), n) / Vec.dot(ray.d, n);
            var pl = ray.get(t);
            if ((pl.x >= bound_min.x && pl.x <= bound_max.z) && (pl.z >= bound_min.z && pl.z <= bound_max.z)) {
                var normal = n;
                var M = this.transformMatrix();
                point = multVec4(M, pl);
                M = this.transformMatrixVec();
                normal = multVec4(M, normal);
                normal = Vec.unitary(normal);
                var t_ = Vec.module(Vec.minus(point, ray_w.o));
                if ((final_normal == null) || (final_t > t_)) {
                    final_point = point;
                    final_normal = normal;
                    final_t = t_;
                }
            }
        }
        p0 = new Vec3(-0.5, -0.5, -0.5);
        n = new Vec3(0, -1, 0);
        if (Vec.dot(ray.d, n) != 0) {
            var t = Vec.dot(Vec.minus(p0, ray.o), n) / Vec.dot(ray.d, n);
            var pl = ray.get(t);
            if ((pl.x >= bound_min.x && pl.x <= bound_max.z) && (pl.z >= bound_min.z && pl.z <= bound_max.z)) {
                var normal = n;
                var M = this.transformMatrix();
                point = multVec4(M, pl);
                M = this.transformMatrixVec();
                normal = multVec4(M, normal);
                normal = Vec.unitary(normal);
                var t_ = Vec.module(Vec.minus(point, ray_w.o));
                if ((final_normal == null) || (final_t > t_)) {
                    final_point = point;
                    final_normal = normal;
                    final_t = t_;
                }
            }
        }
        p0 = new Vec3(0.5, 0.5, 0.5);
        n = new Vec3(1, 0, 0);
        if (Vec.dot(ray.d, n) != 0) {
            var t = Vec.dot(Vec.minus(p0, ray.o), n) / Vec.dot(ray.d, n);
            var pl = ray.get(t);
            if ((pl.z >= bound_min.z && pl.z <= bound_max.z) && (pl.y >= bound_min.y && pl.y <= bound_max.y)) {
                var normal = n;
                var M = this.transformMatrix();
                point = multVec4(M, pl);
                M = this.transformMatrixVec();
                normal = multVec4(M, normal);
                normal = Vec.unitary(normal);
                var t_ = Vec.module(Vec.minus(point, ray_w.o));
                if ((final_normal == null) || (final_t > t_)) {
                    final_point = point;
                    final_normal = normal;
                    final_t = t_;
                }
            }
        }
        p0 = new Vec3(-0.5, -0.5, -0.5);
        n = new Vec3(-1, 0, 0);
        if (Vec.dot(ray.d, n) != 0) {
            var t = Vec.dot(Vec.minus(p0, ray.o), n) / Vec.dot(ray.d, n);
            var pl = ray.get(t);
            if ((pl.y >= bound_min.y && pl.y <= bound_max.y) && (pl.z >= bound_min.z && pl.z <= bound_max.z)) {
                var normal = n;
                var M = this.transformMatrix();
                point = multVec4(M, pl);
                M = this.transformMatrixVec();
                normal = multVec4(M, normal);
                normal = Vec.unitary(normal);
                var t_ = Vec.module(Vec.minus(point, ray_w.o));
                if ((final_normal == null) || (final_t > t_)) {
                    final_point = point;
                    final_normal = normal;
                    final_t = t_;
                }
            }
        }
        p0 = new Vec3(0.5, 0.5, 0.5);
        n = new Vec3(0, 0, 1);
        if (Vec.dot(ray.d, n) != 0) {
            var t = Vec.dot(Vec.minus(p0, ray.o), n) / Vec.dot(ray.d, n);
            var pl = ray.get(t);
            if ((pl.x >= bound_min.x && pl.x <= bound_max.x) && (pl.y >= bound_min.y && pl.y <= bound_max.y)) {
                var normal = n;
                var M = this.transformMatrix();
                point = multVec4(M, pl);
                M = this.transformMatrixVec();
                normal = multVec4(M, normal);
                normal = Vec.unitary(normal);
                var t_ = Vec.module(Vec.minus(point, ray_w.o));
                if ((final_normal == null) || (final_t > t_)) {
                    final_point = point;
                    final_normal = normal;
                    final_t = t_;
                }
            }
        }
        p0 = new Vec3(-0.5, -0.5, -0.5);
        n = new Vec3(0, 0, 1);
        if (Vec.dot(ray.d, n) != 0) {
            var t = Vec.dot(Vec.minus(p0, ray.o), n) / Vec.dot(ray.d, n);
            var pl = ray.get(t);
            if ((pl.y >= bound_min.y && pl.y <= bound_max.y) && (pl.x >= bound_min.x && pl.x <= bound_max.x)) {
                var normal = n;
                var M = this.transformMatrix();
                point = multVec4(M, pl);
                M = this.transformMatrixVec();
                normal = multVec4(M, normal);
                normal = Vec.unitary(normal);
                var t_ = Vec.module(Vec.minus(point, ray_w.o));
                if ((final_normal == null) || (final_t > t_)) {
                    final_point = point;
                    final_normal = normal;
                    final_t = t_;
                }
            }
        }
        if (final_normal == null) {
            return [false];
        }
        return [true, final_point, final_normal, final_t];

    }
    if (this.geometry == cylinder){
      var arrayofT = [];
      var v = ray.d;
      var p = ray.o;

      var pa = new Vec3(0.0,0.0,0.0);
      var p1 = pa;
      var p2 = new Vec3(0,1,0);
      var r = 0.5;
      var va = new Vec3(0,1,0);
      var dP = Vec.minus(p,pa);

      //Codigo para as areas laterais do cilindro
      var a1 = Vec.minus(v,Vec.prod(va,Vec.dot(v,va))); // vec dot a,a para o quadrado(deixar em valor e n vetor)
      var a = Vec.dot(a1,a1);
      var b1 = Vec.minus(v,Vec.prod(va,Vec.dot(v,va)));
      var b2 = Vec.minus(dP,Vec.prod(va,Vec.dot(dP,va)));
      var b = 2*Vec.dot(b1,b2);
      var c1 = Vec.minus(dP,Vec.prod(va,Vec.dot(dP,va)));
      var c = Vec.dot(c1,c1) - (r*r);
      var delta = b * b - 4 * a * c;

      if(delta >= 0){
        var t1 = (-b + Math.sqrt(delta)) / (2 * a);
        var t2 = (-b - Math.sqrt(delta)) / (2 * a);


        var qi1 = Vec.sum(ray.o, Vec.prod(ray.d,t1))
        var op11= Vec.dot(va,Vec.minus(qi1,p1));
        var op12 = Vec.dot(va,Vec.minus(qi1,p2));
        if(t1 > 0 && op11>0 && op12<0){
          arrayofT.push(t1);
        }
        var qi2 = Vec.sum(ray.o, Vec.prod(ray.d,t2))
        var op21= Vec.dot(va,Vec.minus(qi2,p1));
        var op22 = Vec.dot(va,Vec.minus(qi2,p2));
        if(t2 >0 && op21>0 && op22 <0){
          arrayofT.push(t2);
        }
      }
      //codigo para as capas do cilindro
      //q = p +vt
      //p-pa+vt-(va)
      var normalTop = new Vec3(0,1,0);
      var p0 = new Vec3(0,1,0);

      //top usa p2 e normal (0,1,0)
      if(Vec.dot(ray.d,normalTop) != 0){
        var t = Vec.dot(Vec.minus(p0, ray.o), normalTop) / Vec.dot(ray.d, normalTop);
        var q = Vec.sum(ray.o, Vec.prod(ray.d,t));
        var cond = Vec.dot(Vec.minus(q,p2),Vec.minus(q,p2));
        if(cond < (r*r)){
          arrayofT.push(t);
        }
      }
      //bottom usa p1 e normal (0,-1,0)
      var normalBottom = new Vec3(0,-1,0);
      var p0 = new Vec3(0,0,0);
      if(Vec.dot(ray.d,normalBottom) != 0){
        var t = Vec.dot(Vec.minus(p0, ray.o), normalBottom) / Vec.dot(ray.d, normalBottom);
        var q = Vec.sum(ray.o, Vec.prod(ray.d,t));
        var cond = Vec.dot(Vec.minus(q,p1),Vec.minus(q,p1));
        if(cond < (r*r)){
          arrayofT.push(t);
        }
      }

      if(arrayofT.length >0){
        arrayofT.sort();
        t = arrayofT[0];
        var point = ray.get(t);
        var teste = new Vec3(0,point.y,0);
        var normal = Vec.minus(point,teste);
        var M = this.transformMatrix();
        point = multVec4(M, point);
        M = this.transformMatrixVec();
        normal = multVec4(M, normal);
        normal = Vec.unitary(normal);
        var t_ = Vec.module(Vec.minus(point, ray_w.o));
        return [true, point, normal, t_];
      }

    }

    if(this.geometry == cone){
      var arrayofT = [];
      var v = ray.d;
      var p = ray.o;

      var pa = new Vec3(0,0,0);
      var va = new Vec3(0,-1,0);
      var r = 1;
      var alpha = 45;
      var alphaRad = degToRad(45);
      var dp = Vec.minus(p,pa);

      var p1 = pa;
      var p2 = va;


      //codigo para as laterais do cone
      var a1 = Vec.minus(v,Vec.prod(va,Vec.dot(v,va)));
      a1 = Vec.dot(a1,a1);
      a1 = (Math.pow(Math.cos(alphaRad),2))*a1;
      var a2 = Vec.dot(v,va);
      a2 = (Math.pow(Math.sin(alphaRad),2))*(a2*a2);
      var a = a1-a2;
      var b1 = Vec.minus(v,Vec.prod(va,Vec.dot(v,va)));
      var b12 = Vec.minus(dp,Vec.prod(va,Vec.dot(dp,va)));
      b1 = Vec.dot(b1,b12);
      b1 = 2 * Math.pow(Math.cos(alphaRad),2) * b1;
      var b2 = (Vec.dot(v,va)*Vec.dot(dp,va));
      b2 = 2 * (Math.pow(Math.sin(alphaRad),2))* b2;
      var b = b1-b2;
      var c1 = Vec.minus(dp,Vec.prod(va,Vec.dot(dp,va)));
      c1 = Vec.dot(c1,c1);
      c1 = (Math.pow(Math.cos(alphaRad),2))*c1;
      var c2 = Vec.dot(dp,va);
      c2 = (Math.pow(Math.sin(alphaRad),2))*(c2*c2);
      var c = c1-c2;

      var delta = b * b - 4 * a * c;
      if(delta >= 0){
        var t1 = (-b + Math.sqrt(delta)) / (2 * a);
        var t2 = (-b - Math.sqrt(delta)) / (2 * a);


        var qi1 = Vec.sum(ray.o, Vec.prod(ray.d,t1))
        var op11= Vec.dot(va,Vec.minus(qi1,p1));
        var op12 = Vec.dot(va,Vec.minus(qi1,p2));
        if(t1 > 0 && op11>0 && op12<0){
          arrayofT.push(t1);
        }
        var qi2 = Vec.sum(ray.o, Vec.prod(ray.d,t2))
        var op21= Vec.dot(va,Vec.minus(qi2,p1));
        var op22 = Vec.dot(va,Vec.minus(qi2,p2));
        if(t2 >0 && op21>0 && op22 <0){
          arrayofT.push(t2);
        }
      }
      var normalBottom = new Vec3(0,-1,0);
      var p0 = new Vec3(0,0,0);
      // var bottom = Vec.dot(Vec.minus(q,p2),Vec.minus(q,p2))
      if(Vec.dot(ray.d,normalBottom) != 0){
        var t = Vec.dot(Vec.minus(p0, ray.o), normalBottom) / Vec.dot(ray.d, normalBottom);
        //var q = ray.get(t);
        var q = Vec.sum(ray.o, Vec.prod(ray.d,t));
        var cond = Vec.dot(Vec.minus(q,p2),Vec.minus(q,p2));
        //console.log(top);
        if(cond < (r*r)){
          console.log(top);
          arrayofT.push(t);
        }
      }

      if(arrayofT.length >0){
        arrayofT.sort();
        t = arrayofT[0];
        var point = ray.get(t);
        var teste = new Vec3(0,point.y,0);
        var normal = Vec.minus(point,teste);
        var M = this.transformMatrix();
        point = multVec4(M, point);
        M = this.transformMatrixVec();
        normal = multVec4(M, normal);
        normal = Vec.unitary(normal);
        var t_ = Vec.module(Vec.minus(point, ray_w.o));
        return [true, point, normal, t_];
      }


    }

    return [false, null];
}
