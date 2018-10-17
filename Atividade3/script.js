var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var textarea = document.getElementById("code");
var code = textarea.value;
// var p1 = 0;
// var p2 = 0;
// var c1 = 0;
// var c2 = 0;

//matriz de transformação de canvas para sistema de coordenadas usual
M = transformCanvas(canvas.width, canvas.height);
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawAxis();
    eval(textarea.value);

}


function drawAxis() {
    ctx.strokeStyle = "#dbd7cb";
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
}
const line = 0;

function Shape() {
    this.type = type;
    this.translate = new Vec3(0,0,0);
    this.scale = new Vec3(0,0,0);
    this.rotate = new Vec3(0,0,0);
}

function Shape(type) {
    this.type = type;
    this.translate = new Vec3(0,0,0);
    this.scale = new Vec3(0,0,0);
    this.rotate = new Vec3(0,0,0);
}

Shape.prototype.setScale = function (x = 0, y = 0, z = 0) {
    this.scale = new Vec3(x, y, z);
}

Shape.prototype.draw = function (type,p1,p2,c1,c2,steps) {
  // var ponto1 = multVec(M,[p1[0], p1[1],p1[2], 1]);
  //
  // var ponto2 = multVec(M,[p2[0], p2[1],p2[2], 1]);
  // var controle1 = multVec(M,[c1[0], c1[1],c1[2], 1]);
  // var controle2 = multVec(M,[c2[0], c2[1],c2[2], 1]);
    ctx.strokeStyle = "#851e52";
    ctx.beginPath(); //tell canvas to start a set of lines


    for(i=0.0; i <= 1; i+=(1/steps)){
      if(type == "hermite"){
      var novoPonto = hermite(p1,p2,c1,c2,i);

      //transformando em coordenada de canvas
      var novoPontoT = multVec(M,[novoPonto[0], novoPonto[1],novoPonto[2], 1]);

      ctx.lineTo(novoPontoT.x, novoPontoT.y);
    }else{
      p1l = [c1[0]-p1[0],c1[1]-p1[1],c1[2]-p1[2],0];
      p2l = [p2[0]-c2[0],p2[1]-c2[1],p2[2]-c2[2],0];
      p1l = [3*p1l[0],3*p1l[1],3*p1l[2],3*p1l[3]];
      p2l = [3*p2l[0],3*p2l[1],3*p2l[2],3*p2l[3]];
      var novoPonto = bezier(p1,p2,p1l,p2l,i);
      var novoPontoT = multVec(M,[novoPonto[0], novoPonto[1],novoPonto[2], 1]);

      ctx.lineTo(novoPontoT.x, novoPontoT.y);
    }
    }
    //ctx.closePath(); //close the end to the start point
    ctx.stroke(); //actually draw the accumulated lines
}

textarea.addEventListener("input", drawCanvas);
window.addEventListener("load", drawCanvas);
