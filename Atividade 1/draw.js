var segLine = 0;
var segPoly = 0;
var segRecPoly = 0;
recorte = new Clipping();
veclines = []
vecpolygons = []




function draw() {
    var canvas = document.getElementById('window');
    canvas.width = recorte.width()*20;
    canvas.height = recorte.height()*20;
    if (canvas.getContext) {
        Width = canvas.width;
        Height = canvas.height;
        context = canvas.getContext('2d');
        drawBorder(context, Width, Height);
        M = mult(transformCanvas(Width,Height),mult(scale(15,15),translate(-recorte.center()[0],-recorte.center()[1])));
        drawClipping(M,recorte,context);
        for(var i=0;i<veclines.length;i++){
            drawLine(M,veclines[i],context,recorte);
        }
        for(var i=0;i<vecpolygons.length;i++){
          drawPolygon(M,vecpolygons[i],context, recorte);
        }
    }

}


function drawBoxFill(M, canv) { //desenha um cubo passando a matriz de transformação e o canvas para desenho
    a = multVec(M, [0.5, 0.5, 1]);
    b = multVec(M, [0.5, -0.5, 1]);
    c = multVec(M, [-0.5, -0.5, 1]);
    d = multVec(M, [-0.5, 0.5, 1]);
    canv.beginPath();
    canv.moveTo(a[0], a[1]);
    canv.lineTo(b[0], b[1]);
    canv.lineTo(c[0], c[1]);
    canv.lineTo(d[0], d[1]);
    canv.fill();
}

function drawBorder(border, Width, Height) {
    border.beginPath();
    border.setLineDash([]);
    border.moveTo(0, 0);
    border.lineTo(Width, 0);
    border.lineTo(Width, Height);
    border.lineTo(0, Height);
    border.lineTo(0, 0);
    border.stroke();
}


function drawClipping(M, recorte, context) {
    a = multVec(M, [recorte.xmin, recorte.ymin, 1]);
    b = multVec(M, [recorte.xmax, recorte.ymin, 1]);
    c = multVec(M, [recorte.xmax, recorte.ymax, 1]);
    d = multVec(M, [recorte.xmin, recorte.ymax, 1]);
    context.beginPath();
    context.moveTo(a[0], a[1]);
    context.lineTo(b[0], b[1]);
    context.lineTo(c[0], c[1]);
    context.lineTo(d[0], d[1]);
    context.lineTo(a[0], a[1]);
    context.stroke();
}


function drawLine(M, line, context,recorte) {
    a = multVec(M, [line.x1, line.y1, 1]);
    b = multVec(M, [line.x2, line.y2, 1]);
    max = multVec(M, [recorte.xmax, recorte.ymax, 1]);
    min = multVec(M, [recorte.xmin, recorte.ymin, 1]);
    if(b[1] < max[1]){
        b = interception(a,b, max);
    }
    if(b[1] > min[1]){
        b = interception(a,b, min);
    }
    context.beginPath();
    context.moveTo(a[0], a[1]);
    context.lineTo(b[0], b[1]);
    context.stroke();
    segLine = segLine+1;
}

function drawPolygon(M, polygon, context) {
    max1 = multVec(M, [recorte.xmax, recorte.ymax, 1]);
    min1 = multVec(M, [recorte.xmin, recorte.ymin, 1]);
    vr = 0;
    context.beginPath();

    for (var j = 0; j < polygon.points.length; j++) {
        a = multVec(M, [polygon.points[j].x, polygon.points[j].y, 1]);
        if (j == 0) {
            context.moveTo(a[0], a[1]);
        }
        else {
            b = multVec(M, [polygon.points[j - 1].x, polygon.points[j - 1].y, 1]);
            if(polygon.points[j-1].y > recorte.ymax){
                pontonovo2 = interception(a, b, max1);
                segRecPoly = segRecPoly+1;
                context.lineTo(pontonovo2[0],pontonovo2[1]);
                context.lineTo(a[0], a[1]);
                c = multVec(M, [polygon.points[0].x, polygon.points[0].y, 1]);
                context.lineTo(c[0],c[1]);
                }
            else{
                if(polygon.points[j].y > recorte.ymax){
                    pontonovo = interception(b,a,max1);
                    segRecPoly = segRecPoly+1;
                    context.lineTo(pontonovo[0], pontonovo[1]);
                    vr = 1;
                }
                else {
                    context.lineTo(a[0],a[1]);
                }
            }
        }
    }
    segPoly = segPoly + polygon.points.length;
    context.fill();
}
function interception(ponto1, ponto2, max){
    y3 = max[1];
    x3 = ponto1[0] + ((max[1] - ponto1[1])*((ponto2[0]- ponto1[0])/(ponto2[1] - ponto1[1])));
    ponto3 = [x3,y3];
    return ponto3;
}

function openJson() { //carrega json file
    var json_obj = JSON.parse(document.getElementById("link").value);
    //alert("This is the scene: "+json_obj.scene)
    //console.log("This is the scene: " + json_obj.scene);
    if (json_obj.hasOwnProperty('clipping')) {
        if (json_obj.clipping.hasOwnProperty('top-right')) {
            //console.log(json_obj.clipping['top-right']);
            //console.log(json_obj.clipping['bottom-left']);
            recorte.xmin = parseFloat(json_obj.clipping['bottom-left'].x);
            recorte.ymin = parseFloat(json_obj.clipping['bottom-left'].y);
            recorte.xmax = parseFloat(json_obj.clipping['top-right'].x);
            recorte.ymax = parseFloat(json_obj.clipping['top-right'].y);
        }
    }
    if (json_obj.hasOwnProperty('lines')) {
        if (json_obj.lines.hasOwnProperty('line')) {
            lines = json_obj.lines.line;
            //console.log(lines);
            for (var i = 0; i < lines.length; i++) {
                line = new Line();
                line.set(parseFloat(lines[i].x1),parseFloat(lines[i].y1),parseFloat(lines[i].x2),parseFloat(lines[i].y2));
                veclines.push(line);
            }
        }
    }
    if (json_obj.hasOwnProperty('polygons')) {
        if (json_obj.polygons.hasOwnProperty('polygon')) {
            polygons = json_obj.polygons.polygon;
            for (var i = 0; i < polygons.length; i++) {
                //console.log(polygons[i]); //carrega a lista de vetores do poligono i
                ipoly = new Polygon();
                for (var j = 0; j < polygons[i].length; j++) {
                    //console.log(polygons[i][j]); //carrega cada vetor do poligono i
                    vec = new Vec2();
                    vec.set(parseFloat(polygons[i][j].x),parseFloat(polygons[i][j].y));
                    ipoly.add(vec);
                }
                vecpolygons.push(ipoly);
            }
        }
    }
    draw();
    print();
  }
function print(){
    segments = segPoly + segLine;
    segRecPoly = segments + segRecPoly/2
    console.log("Segmentos total: "+segments +" Segmentos na área de recorte: " +segRecPoly);
}
