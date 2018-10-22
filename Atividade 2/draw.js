var canvas = document.getElementById('canvasId');
var canvasContext = canvas.getContext('2d');
var canvasData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);


var rPixel = 255; // vermelho
var gPixel = 0; // verde
var bPixel = 0; // azul
var aPixel = 255; // transparencia


var x0;
var y0;
var x1;
var y1;


var drawGrid = function(ctx, w, h, step) {
    ctx.beginPath();
    for (var x=0;x<=w;x+=step) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
    }
    // set the color of the line
    ctx.strokeStyle = 'rgb(255,0,0)';
    ctx.lineWidth = 0.3;
    // the stroke will actually paint the current path
    ctx.stroke();
    // for the sake of the example 2nd path
    ctx.beginPath();
    for (var y=0;y<=h;y+=step) {
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
    }
    // set the color of the line
    ctx.strokeStyle = 'rgb(20,20,20)';
    // just for fun
    ctx.lineWidth = 0.3;
    // for your original question - you need to stroke only once
    ctx.stroke();
};


drawGrid(canvasContext, canvas.width, canvas.width, 20);

function drawPixel(x, y, r, g, b, a) {
  var index = (x + y * canvas.width) * 4;

  canvasData.data[index + 0] = r;
  canvasData.data[index + 1] = g;
  canvasData.data[index + 2] = b;
  canvasData.data[index + 3] = a;
}

function update() {
  canvasContext.putImageData(canvasData, 0, 0);
  drawGrid(canvasContext, canvas.width, canvas.width, 20);
}

function clear() {
  var j;
  for (j = 0; j < canvasData.data.length; j++) {
    canvasData.data[j] = 0;
  }

  update();
}

function getOctant(dx, dy) {
  var octant = 0;
  if (dx >= 0 && dy >= 0 && dx <= dy) {
    // octante 1
    octant = 1;
  } else if (dx <= 0 && dy >= 0 && -dx <= dy) {
    // octante 2
    octant = 2;
  } else if (dx <= 0 && dy >= 0 && -dx >= dy) {
    // octante 3
    octant = 3;
  } else if (dx <= 0 && dy <= 0 && -dx >= -dy) {
    // octante 4
    octant = 4;
  } else if (dx <= 0 && dy <= 0 && -dx <= -dy) {
    // octante 5
    octant = 5;
  } else if (dx >= 0 && dy <= 0 && dx <= -dy) {
    // octante 6
    octant = 6;
  } else if (dx >= 0 && dy <= 0 && dx >= -dy) {
    // octante 7
    octant = 7;
  }
  return octant;
}

function switchToOctantZeroFrom(octant, x, y) {
  switch(octant){
    case 0:
      return [x, y];
      break;
    case 1:
      return [y, x];
      break;
    case 2:
      return [y, -x];
      break;
    case 3:
      return [-x, y];
      break;
    case 4:
      return [-x, -y];
      break;
    case 5:
      return [-y, -x];
      break;
    case 6:
      return [-y, x];
      break;
    case 7:
      return [x, -y];
      break;
    default:
      console.log("rip");
      break;
  }
}

function switchFromOctantZeroTo(octant, x, y) {
  switch(octant){
    case 0:
      return [x, y];
      break;
    case 1:
      return [y, x];
      break;
    case 2:
      return [-y, x];
      break;
    case 3:
      return [-x, y];
      break;
    case 4:
      return [-x, -y];
      break;
    case 5:
      return [-y, -x];
      break;
    case 6:
      return [y, -x];
      break;
    case 7:
      return [x, -y];
      break;
    default:
      console.log("rip");
      break;
  }
}

function drawBresenhamLine(x0, y0, x1, y1, octant) {
  [x0, y0] = switchToOctantZeroFrom(octant, x0, y0);
  [x1, y1] = switchToOctantZeroFrom(octant, x1, y1);

  var dx = x1 - y0;
  var dy = y1 - y0;
  var D = 2 * dy - dx;
  var y = y0; //

  for (x = x0; x < x1; x++) {
    drawPixel(
      switchFromOctantZeroTo(octant, x, y)[0],
      switchFromOctantZeroTo(octant, x, y)[1],
      rPixel,
      gPixel,
      bPixel,
      aPixel
    );
    if (D > 0) {
      y = y + 1;
      D = D - 2 * dx;
    }
    D = D + 2 * dy;
  }
}

function getXY() {
  x0 = parseInt(document.getElementById('x0Input').value);
  y0 = parseInt(document.getElementById('y0Input').value);
  x1 = parseInt(document.getElementById('x1Input').value);
  y1 = parseInt(document.getElementById('y1Input').value);
}
function drawButton(){
  getXY();

  var dx = x1 - x0;
  var dy = y1 - y0;


  if (dx == 0 && dy == 0) {
    drawPixel(x0, y0, rPixel, gPixel, bPixel, aPixel);
    update();
    return;
  }

  var octant = getOctant(dx, dy);

  drawBresenhamLine(x0, y0, x1, y1, octant);

  update();
}
function clearButton(){
  clear();
}
