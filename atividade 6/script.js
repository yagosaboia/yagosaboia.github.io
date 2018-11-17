var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var textarea = document.getElementById("code");
var reset = document.getElementById("reset");
var edit = document.getElementById("edit");
var animation = document.getElementById("animation");
var code = textarea.value;
var scale = 1;
var dX, dY;
var heightt = 0;
var widthh = 0;
var M = 0, vrM1 = 0, vrM2 = 0;
var rootPos = [0,0], M1Pos = [0,0], M2Pos = [0,0];
var juntaMembro1 = [0,0];
var juntaMembro2 = [0,0];

var CRoot = [
        [1, 0, 1],
        [0, 1, 0],
        [0, 0, 1]
    ];
var Cmembro1 = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
var Cmembro2 = [
        [1, 0, 0]
        [0, 1, 0],
        [0, 0, 1],
    ];


function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setScale(30);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    eval(textarea.value);
}

function setScale(v){
    scale = v;
}


function grid(){
    canvas.width = Math.abs(dX)*scale;
    canvas.height = Math.abs(dY)*scale;
    ctx.beginPath();
    //constroi a grid de "pixels"
    ctx.scale(scale,scale);
    ctx.lineWidth = 1./scale;
    for(var i=0;i<Math.abs(dX);i++){
        for(var j=0;j<Math.abs(dY);j++){
            ctx.strokeRect(i,j,1,1);
        }
    }
}

function drawMembros(x1,y1,x2,y2){
    x1 = parseFloat(x1);
    y1 = parseFloat(y1);
    x2 = parseFloat(x2);
    y2 = parseFloat(y2);
    dX = x2 - x1; //delta x
    dY = y2 - y1; //delta y
    canvas.width = Math.abs(dX)*scale;
    canvas.height = Math.abs(dY)*scale;
    xM = (x1+x2)/2.; //encontra o ponto médio no eixo x
    yM = (y1+y2)/2.; //encontra o ponto médio no eixo y
    M = multMatrix(transformCanvas(canvas.width/scale,canvas.height/scale),translateMatrix(-xM,-yM)); // transforma para coordenadas do canvas
    grid();

    widthh = (canvas.width/scale)/2;
    heightt = (canvas.height/scale)/2;

    root1 = new Shape("root1");
    membro1 = new Shape("membro1");
    membro2 = new Shape("membro2");
    membro3 = new Shape("membro3");
}
const rectangle = 0;

function Shape() {
    this.geometry = rectangle;
    this.name = "";
    this.translate = new Vec3(0,0,0);
    this.rotate = new Vec3(0,0,0);
}

function Shape(name) {
    this.geometry = rectangle;
    this.name = name;
    this.translate = new Vec3(0,0,0);
    this.scale = new Vec3(0,0,0);
    this.rotate = new Vec3(0,0,0);
}

Shape.prototype.setScale = function (x = 0, y = 0, z = 0) {
    this.scale = new Vec3(1, 1, 1);
}

Shape.prototype.setTranslate = function (x = 0, y = 0) {
    if(this.name == "root1"){this.translate = new Vec3(x, y,1);}
}

Shape.prototype.setRotate = function (angle = 0) {
    this.rotate = new Vec3(angle, 1, 1);
}


Shape.prototype.draw = function () {
    var aux1 = 0,aux2 = 0;
    if (this.name == "root1"){
        aux1 = this.translate.x+11.5; aux2 = this.translate.y+11;
        rootPos.x = rootPos.x +this.translate.x;
        rootPos.y = rootPos.y +this.translate.y;
    }
    if (this.name == "membro1"){aux1 = rootPos.x+0.5; aux2 = rootPos.y+2;}
    if (this.name == "membro2"){ aux1 = juntaMembro1[0]; aux2 = juntaMembro1[1];}
    if (this.name == "membro3"){aux1 = juntaMembro2[0]; aux2 = juntaMembro2[1];}
    var T = translateMatrix (this.translate.x,this.translate.y);
    var R = multMatrix(translateMatrix(aux1,aux2),multMatrix(rotate(this.rotate.x),translateMatrix(-aux1,-aux2)));
    var C = multMatrix(T,R);
    //verifica se a geometria é um círculo
    if (this.geometry == rectangle) {
        ctx.beginPath(); //tell canvas to start a set of lines
        if (this.name == "root1"){
            ctx.fillStyle = "#851e52";

            p01 = [Math.round(widthh)-1, Math.round(heightt)+1,1];
            console.log(p01);
            p02 = [p01[0]+1, p01[1],1];
            console.log(p02);
            p03 = [p01[0]+1, p01[1]+2,1];
            console.log(p03);
            p04 = [p01[0], p01[1]+2,1];
            console.log(p04);
            p01 = multVec(C,p01);
            p02 = multVec(C,p02);
            p03 = multVec(C,p03);
            p04 = multVec(C,p04);
            rootPos = p01;
            CRoot = C;
            p01 = multVec(M,[p01.x,p01.y,1]);
            p02 = multVec(M,[p02.x,p02.y,1]);
            p03 = multVec(M,[p03.x,p03.y,1]);
            p04 = multVec(M,[p04.x,p04.y,1]);

            ctx.moveTo(p01.x,p01.y);
            ctx.lineTo(p02.x,p02.y);
            ctx.lineTo(p03.x,p03.y);
            ctx.lineTo(p04.x,p04.y);
            ctx.fill();
        }
        if (this.name == "membro1"){
            ctx.fillStyle = "#000000";
            p01 = [rootPos.x, rootPos.y+2,1];
            p02 = [p01[0]+1, p01[1],1];
            p03 = [p01[0]+1, p01[1]+2,1];
            p04 = [p01[0], p01[1]+2,1];

            Cmembro1 = C;
            C =  multMatrix(CRoot,C);

            p01 = multVec(C,p01);
            p02 = multVec(C,p02);
            p03 = multVec(C,p03);
            p04 = multVec(C,p04);
            M1Pos= p01;

            juntaMembro1  = [Math.abs(p03.x + p04.x)/2,Math.abs(p03.y + p04.y)/2];

            p01 = multVec(M,[p01.x,p01.y,1]);
            p02 = multVec(M,[p02.x,p02.y,1]);
            p03 = multVec(M,[p03.x,p03.y,1]);
            p04 = multVec(M,[p04.x,p04.y,1]);
            ctx.moveTo(p01.x,p01.y);
            ctx.lineTo(p02.x,p02.y);
            ctx.lineTo(p03.x,p03.y);
            ctx.lineTo(p04.x,p04.y);
            ctx.fill();

        }
        if (this.name == "membro2"){
            p01 = [rootPos.x, rootPos.y+4,1];
            p02 = [p01[0]+1, p01[1],1];
            p03 = [p01[0]+1, p01[1]+2,1];
            p04 = [p01[0], p01[1]+2,1];

            Cmembro2 = C;
            C = multMatrix(CRoot,multMatrix(Cmembro1,C));

            p01 = multVec(C,p01);
            p02 = multVec(C,p02);
            p03 = multVec(C,p03);
            p04 = multVec(C,p04);
            M2Pos = p01;
            juntaMembro2  = [Math.abs(p03.x + p04.x)/2,Math.abs(p03.y + p04.y)/2];
            p01 = multVec(M,[p01.x,p01.y,1]);
            p02 = multVec(M,[p02.x,p02.y,1]);
            p03 = multVec(M,[p03.x,p03.y,1]);
            p04 = multVec(M,[p04.x,p04.y,1]);
            ctx.moveTo(p01.x,p01.y);
            ctx.lineTo(p02.x,p02.y);
            ctx.lineTo(p03.x,p03.y);
            ctx.lineTo(p04.x,p04.y);
            ctx.fill();

        }
        if (this.name == "membro3"){
            ctx.fillStyle = "#000000";
            p01 = [rootPos.x, rootPos.y+6,1];
            p02 = [p01[0]+1, p01[1],1];
            p03 = [p01[0]+1, p01[1]+2,1];
            p04 = [p01[0], p01[1]+2,1];

            C = multMatrix(CRoot,multMatrix(Cmembro1,multMatrix(Cmembro2,C)));

            p01 = multVec(C,p01);
            p02 = multVec(C,p02);
            p03 = multVec(C,p03);
            p04 = multVec(C,p04);

            p01 = multVec(M,[p01.x,p01.y,1]);
            p02 = multVec(M,[p02.x,p02.y,1]);
            p03 = multVec(M,[p03.x,p03.y,1]);
            p04 = multVec(M,[p04.x,p04.y,1]);

            ctx.moveTo(p01.x,p01.y);
            ctx.lineTo(p02.x,p02.y);
            ctx.lineTo(p03.x,p03.y);
            ctx.lineTo(p04.x,p04.y);
            ctx.fill();
        }

        ctx.strokeStyle = "#851e52";
        ctx.stroke(); //actually draw the accumulated lines
        ctx.closePath(); //close the end to the start point
    }
}

function animationN(){
    par_u = 0;
    setTimeout(function(){
        par_u += 0.01;
        if(par_u>1){
            par_u = 0;
        }
        else{
            drawCanvas();
            window.requestAnimationFrame(animationN);
        }
    },1000/30);
}



edit.addEventListener("click", function () {
    textarea.focus();
})

textarea.addEventListener("input", drawCanvas);
window.addEventListener("load", drawCanvas);

animation.addEventListener("click", function () {
    animationN();
})
