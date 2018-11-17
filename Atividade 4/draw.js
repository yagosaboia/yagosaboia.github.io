var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var textarea = document.getElementById("code");
var reset = document.getElementById("reset");
var edit = document.getElementById("edit");
var code = textarea.value;
var dateBefore = 0;
var scale = 1;

var points_curveB = []
var np = 200;
var par_u = 0;
var arc = 0;
var fps = 30;
var s = 0;
var sPass=0;
var total = 0;
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    eval(textarea.value);
}

function drawCircle(c, canv, color,radius=5) { //desenha um círculo
    canv.beginPath();
    canv.strokeStyle = '#000000';
    canv.arc(c[0], c[1], radius, 0, 2 * Math.PI, false);
    canv.lineWidth = 2;
    canv.fillStyle = color;
    canv.fill();
    canv.setLineDash([]);
    canv.strokeStyle = color;
    canv.stroke();
    canv.fillStyle = '#000000';
}

function setBezierArcLength(p0, p1, p2, p3) {
    ctx.beginPath();
    points_curveB = [];
    M = transformCanvas(canvas.width, canvas.height);
    ctx.font = "14px Arial";
    pos0 = multVec(mult(M, translate(p0[0], p0[1])), [0, 0, 1]);
    pos1 = multVec(mult(M, translate(p1[0], p1[1])), [0, 0, 1]);
    pos2 = multVec(mult(M, translate(p2[0], p2[1])), [0, 0, 1]);
    pos3 = multVec(mult(M, translate(p3[0], p3[1])), [0, 0, 1]);

    //draw the control points
    ctx.fillStyle = "#494949";
    ctx.fillText("p0", pos0[0] + 7, pos0[1] - 7);
    ctx.fillText("p3", pos3[0] + 7, pos3[1] - 7);
    drawCircle(pos0, ctx, "#fb9a40");
    drawCircle(pos3, ctx, "#fb9a40");
    ctx.fillStyle = "#494949";
    ctx.fillText("p1", pos1[0] + 7, pos1[1] - 7);
    ctx.fillText("p2", pos2[0] + 7, pos2[1] - 7);
    drawCircle(pos1, ctx, "#fb9a40");
    drawCircle(pos2, ctx, "#fb9a40");

    p0 = new Vec2(p0[0], p0[1]);
    p1 = new Vec2(p1[0], p1[1]);
    p2 = new Vec2(p2[0], p2[1]);
    p3 = new Vec2(p3[0], p3[1]);
    curve = new CurveBezier(p0, p1, p2, p3);
    arc = new ArcLength("Bezier");
    arc.adaptive_integration(curve, 0.0, 1.0, 0.0000001);
    ctx.fillText("S = " + arc.length.toFixed(4), pos3[0] + 15, pos3[1] - 25);
    for (var i = 0; i <= np; i++) {
        //var s = (i / np) * arc.length;
        var se = ease((i/np),0.3,0.7) * arc.length;
        //console.log(se + "      "+ i);
        //console.log(s+"         "+se+"            "+ i);
        //points_curveB.push(arc.getVec4S(curve, s));
        //ps = multVec(mult(M, translate(points_curveB[i].x, points_curveB[i].y)), [0, 0, 1]);
        points_curveB.push(arc.getVec4S(curve, se));
        pse = multVec(mult(M, translate(points_curveB[i].x, points_curveB[i].y)), [0, 0, 1]);
        points_curveB[i] = new Vec2(pse[0],pse[1]);
        //points_curveB[i+1] = new Vec2(ps[0],ps[1]);
        //console.log(points_curveB[i]);
        //if (!(i==0 || i==np)) FdrawCircle(ps, ctx, "#d2e1c8",3);
        if (!(i==0 || i==np)) drawCircle(pse, ctx, "#d2e1c8",3);
    }
    ctx.fillStyle = "#20716a";
    ctx.strokeStyle = "#20716a";
    if (points_curveB.length > 0) {
        ctx.beginPath();
        ctx.moveTo(points_curveB[0].x, points_curveB[0].y);
        for (var i = 1; i <= np; i++) {
            ctx.lineTo(points_curveB[i].x, points_curveB[i].y);
        }
        ctx.stroke();
    }


    //desenha ponto
    s = ease(par_u,0.3,0.7) * arc.length;
    //var s = par_u * arc.length;
    //console.log(s);
    //var s = ease(par_u,0.3,0.7);
    pu = arc.getVec4S(curve, s);
    // pun = Vec2.normalize(pu.x,pu.y);
    //console.log("x:"+pu.x/arc.length+"   y:"+ pu.y/arc.length);
    pu = multVec(mult(M, translate(pu.x, pu.y)), [0, 0, 1]);
    drawCircle(pu, ctx, "#8b104e",7);

}
function setHermiteArcLength(p0, p1, p2, p3) {
    ctx.beginPath();
    points_curveB = [];
    M = transformCanvas(canvas.width, canvas.height);
    ctx.font = "14px Arial";
    pos0 = multVec(mult(M, translate(p0[0], p0[1])), [0, 0, 1]);
    pos1 = multVec(mult(M, translate(p1[0], p1[1])), [0, 0, 1]);
    pos2 = multVec(mult(M, translate(p2[0], p2[1])), [0, 0, 1]);
    pos3 = multVec(mult(M, translate(p3[0], p3[1])), [0, 0, 1]);

    //draw the control points
    ctx.fillStyle = "#494949";
    ctx.fillText("p0", pos0[0] + 7, pos0[1] - 7);
    ctx.fillText("p3", pos3[0] + 7, pos3[1] - 7);
    drawCircle(pos0, ctx, "#fb9a40");
    drawCircle(pos3, ctx, "#fb9a40");
    ctx.fillStyle = "#494949";
    ctx.fillText("p1", pos1[0] + 7, pos1[1] - 7);
    ctx.fillText("p2", pos2[0] + 7, pos2[1] - 7);
    drawCircle(pos1, ctx, "#fb9a40");
    drawCircle(pos2, ctx, "#fb9a40");
    p0 = new Vec2(p0[0], p0[1]);
    p1 = new Vec2(p1[0], p1[1]);
    p2 = new Vec2(p2[0], p2[1]);
    p3 = new Vec2(p3[0], p3[1]);
    curve = new CurveHermite(p0, p3, p1, p2);
    arc = new ArcLength("Hermite");
    arc.adaptive_integration(curve, 0.0, 1.0, 0.0000001);
    ctx.fillText("S = " + arc.length.toFixed(4), pos3[0] + 15, pos3[1] - 25);
    for (var i = 0; i <= np; i++) {
        //var s = (i / np) * arc.length;
        var se = ease((i/np),0.3,0.7) * arc.length;
        //console.log(se + "      "+ i);
        //console.log(s+"         "+se+"            "+ i);
        //points_curveB.push(arc.getVec4S(curve, s));
        //ps = multVec(mult(M, translate(points_curveB[i].x, points_curveB[i].y)), [0, 0, 1]);
        points_curveB.push(arc.getVec4S(curve, se));
        pse = multVec(mult(M, translate(points_curveB[i].x, points_curveB[i].y)), [0, 0, 1]);
        points_curveB[i] = new Vec2(pse[0],pse[1]);
        //points_curveB[i+1] = new Vec2(ps[0],ps[1]);
        //console.log(points_curveB[i]);
        //if (!(i==0 || i==np)) drawCircle(ps, ctx, "#d2e1c8",3);
        if (!(i==0 || i==np)) drawCircle(pse, ctx, "#d2e1c8",3);
    }
    ctx.fillStyle = "#20716a";
    ctx.strokeStyle = "#20716a";
    if (points_curveB.length > 0) {
        ctx.beginPath();
        ctx.moveTo(points_curveB[0].x, points_curveB[0].y);
        for (var i = 1; i <= np; i++) {
            ctx.lineTo(points_curveB[i].x, points_curveB[i].y);
        }
        ctx.stroke();
    }


    //desenha ponto
    var s = ease(par_u,0.3,0.7) * arc.length;
  //  var s = par_u * arc.length;
    //console.log(s);
    //var s = ease(par_u,0.3,0.7);
    pu = arc.getVec4S(curve, s);
    // pun = Vec2.normalize(pu.x,pu.y);
    //console.log("x:"+pu.x/arc.length+"   y:"+ pu.y/arc.length);
    pu = multVec(mult(M, translate(pu.x, pu.y)), [0, 0, 1]);
    drawCircle(pu, ctx, "#8b104e",7);

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
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function animate(){
  setTimeout(function() {
  par_u += 0.01;
  if (par_u>1) {
    par_u = 0;
  }else{
  drawCanvas();
  ctx.fillText("Distancia percorrida = " + (s), pos3[0] - 225, pos3[1] - 55);
  ctx.fillText("Distancia percorrida por frame = " + (s-sPass), pos3[0] - 225, pos3[1] - 40);
  window.requestAnimationFrame(animate);
  }
}, ((s-sPass)*300) / fps);
  console.log(s-sPass);
  sPass = s;
}
function setSizePoints(v) {
    np = v;
}

function addParameterU(){
    par_u += 0.01;
    if (par_u>1) par_u = 0;
    drawCanvas();
}
function run(){
  animate();
}

textarea.addEventListener("input", drawCanvas);
window.addEventListener("load", drawCanvas);






// function setBSplineArcLength(p0, p1, p2, p3) {
//     ctx.beginPath();
//     points_curveB = [];
//     M = transformCanvas(canvas.width, canvas.height);
//     ctx.font = "14px Arial";
//     pos0 = multVec(mult(M, translate(p0[0], p0[1])), [0, 0, 1]);
//     pos1 = multVec(mult(M, translate(p1[0], p1[1])), [0, 0, 1]);
//     pos2 = multVec(mult(M, translate(p2[0], p2[1])), [0, 0, 1]);
//     pos3 = multVec(mult(M, translate(p3[0], p3[1])), [0, 0, 1]);
//
//     //draw the control points
//     ctx.fillStyle = "#494949";
//     ctx.fillText("p0", pos0[0] + 7, pos0[1] - 7);
//     ctx.fillText("p3", pos3[0] + 7, pos3[1] - 7);
//     drawCircle(pos0, ctx, "#fb9a40");
//     drawCircle(pos3, ctx, "#fb9a40");
//     ctx.fillStyle = "#494949";
//     ctx.fillText("p1", pos1[0] + 7, pos1[1] - 7);
//     ctx.fillText("p2", pos2[0] + 7, pos2[1] - 7);
//     drawCircle(pos1, ctx, "#fb9a40");
//     drawCircle(pos2, ctx, "#fb9a40");
//     p0 = new Vec2(p0[0], p0[1]);
//     p1 = new Vec2(p1[0], p1[1]);
//     p2 = new Vec2(p2[0], p2[1]);
//     p3 = new Vec2(p3[0], p3[1]);
//     curve = new CurveBSpline(p0, p3, p1, p2);
//     arc = new ArcLength("BSpline");
//     arc.adaptive_integration(curve, 0.0, 1.0, 0.0000001);
//     ctx.fillText("S = " + arc.length.toFixed(4), pos3[0] + 15, pos3[1] - 25);
//     for (var i = 0; i <= np; i++) {
//         //var s = (i / np) * arc.length;
//         var se = ease((i/np),0.3,0.7) * arc.length;
//         //console.log(se + "      "+ i);
//         //console.log(s+"         "+se+"            "+ i);
//         //points_curveB.push(arc.getVec4S(curve, s));
//         //ps = multVec(mult(M, translate(points_curveB[i].x, points_curveB[i].y)), [0, 0, 1]);
//         points_curveB.push(arc.getVec4S(curve, se));
//         pse = multVec(mult(M, translate(points_curveB[i].x, points_curveB[i].y)), [0, 0, 1]);
//         points_curveB[i] = new Vec2(pse[0],pse[1]);
//         //points_curveB[i+1] = new Vec2(ps[0],ps[1]);
//         //console.log(points_curveB[i]);
//         //if (!(i==0 || i==np)) drawCircle(ps, ctx, "#d2e1c8",3);
//         if (!(i==0 || i==np)) drawCircle(pse, ctx, "#d2e1c8",3);
//     }
//     ctx.fillStyle = "#20716a";
//     ctx.strokeStyle = "#20716a";
//     if (points_curveB.length > 0) {
//         ctx.beginPath();
//         ctx.moveTo(points_curveB[0].x, points_curveB[0].y);
//         for (var i = 1; i <= np; i++) {
//             ctx.lineTo(points_curveB[i].x, points_curveB[i].y);
//         }
//         ctx.stroke();
//     }
//desenha ponto
// var s = par_u * arc.length;
// //console.log(s);
// //var s = ease(par_u,0.3,0.7);
// pu = arc.getVec4S(curve, s);
// // pun = Vec2.normalize(pu.x,pu.y);
// //console.log("x:"+pu.x/arc.length+"   y:"+ pu.y/arc.length);
// pu = multVec(mult(M, translate(pu.x, pu.y)), [0, 0, 1]);
// drawCircle(pu, ctx, "#8b104e",7);
// }
