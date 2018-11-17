//OBS: Acredito que o problema esteja na normal que o cilindro e o cone estão retornando.
function scenaries(sce){
  //cenarios do 1 ao 4 são a esfera com as respectivas luzes, cenario 5 é com 2 luzes+ambiente(pontual,spot)
  //cenarios do 5 ao 9 são o retangulo com as respectivas luzes, cenario 10 é com 2 luzes+ambiente
  //cenarios do 11 ao 14 são o cilindro com as respectivas luzes, cenario 15 é com 2 luzes+ambiente
  //cenarios do 16 ao 19 são o cone com as respectivas luzes, cenario 20 é com 2 luzes+ambiente
  //cenario 21 -> 2 luzes spots em 1 cilindro
  switch(sce){
    case 1: return [[shapes("e0")],[lights("a0")]]; break;
    case 2: return [[shapes("e0")],[lights("a0"),lights("p0")]]; break;
    case 3: return [[shapes("e0")],[lights("a0"),lights("d0")]]; break;
    case 4: return [[shapes("e0")],[lights("a0"),lights("s0")]]; break;
    case 5: return [[shapes("e0")],[lights("a0"),lights("p0"),lights("s0")]]; break;
    case 6: return [[shapes("r0")],[lights("a0")]]; break;
    case 7: return [[shapes("r0")],[lights("a0"),lights("p0")]]; break;
    case 8: return [[shapes("r0")],[lights("a0"),lights("d0")]]; break;
    case 9: return [[shapes("r0")],[lights("a0"),lights("s0")]]; break;
    case 10: return [[shapes("r0")],[lights("a0"),lights("p0"),lights("s0")]]; break;
    case 11: return [[shapes("ci0")],[lights("a0")]]; break;
    case 12: return [[shapes("ci0")],[lights("a0"),lights("p0")]]; break;
    case 13: return [[shapes("ci0")],[lights("a0"),lights("d0")]]; break;
    case 14: return [[shapes("ci0")],[lights("a0"),lights("s0")]]; break;
    case 15: return [[shapes("ci0")],[lights("a0"),lights("p0"),lights("s0")]]; break;
    case 16: return [[shapes("co0")],[lights("a0")]]; break;
    case 17: return [[shapes("co0")],[lights("a0"),lights("p0")]]; break;
    case 18: return [[shapes("co0")],[lights("a0"),lights("d0")]]; break;
    case 19: return [[shapes("co0")],[lights("a0"),lights("s0")]]; break;
    case 20: return [[shapes("co0")],[lights("a0"),lights("p0"),lights("s0")]]; break;
    case 21: return [[shapes("e0"),shapes("ci1")],[lights("a0"),lights("p0")]]; // Cone + esfera
    case 24: return [[shapes("r2"),shapes("e0")],[lights("p0")]];
    default: return [[shapes("e0")],[lights("a0")]]; break;
  }

}
function shapes(shape){
  switch(shape){

  case "e0":
    //Esfera
    e = new Shape(0);
    e.setTranslate(0.5,0.5,0.5);
    e.setScale(0.5,0.5,0.5);
    //material gold
    e.setAmbient(0.24705, 0.2, 0.0666);
    e.setDifuse(0.7490, 0.6078, 0.2274);
    e.setSpecular(0.6274, 0.6470, 0.3686);
    e.setShine(51.2);
    return(e);
    break;

  case "e1":
    e = new Shape(0);
    e.setTranslate(-0.8,0.5,-0.8);
    e.setScale(0.5,0.5,0.5);
    //material gold
    e.setAmbient(0.24705, 0.2, 0.0666);
    e.setDifuse(0.7490, 0.6078, 0.2274);
    e.setSpecular(0.6274, 0.6470, 0.3686);
    e.setShine(51.2);
    return(e);
    break;

  case "r0":
    //Retangulo
    r = new Shape(1);
    r.setTranslate(0.5,0.2,0.5);
    r.setScale(0.5,0.5,0.5);
    //material Jade
    r.setAmbient(0.2, 0.4, 0.1);
    r.setDifuse(0.54, 0.89, 0.63);
    r.setSpecular(0.316228, 0.316228, 0.316228);
    r.setShine(12.8);
    return(r);
    break;

  case "r1":
    //Retangulo
    r = new Shape(1);
    r.setTranslate(1.7,0.6,0.9);
    r.setScale(0.5,0.5,0.5);
    //material Jade
    r.setAmbient(0.105882, 0.058824, 0.113725);
    r.setDifuse(0.427451, 0.470588, 0.541176);
    r.setSpecular(0.333333,  0.333333, 0.521569);
    r.setShine(9.84615);
    return(r);
    break;

  case "r2":
    //Retangulo
    r = new Shape(1);
    r.setTranslate(-0.5,0.2,0.5);
    r.setScale(0.5,1.5,0.5);
    //material Jade
    r.setAmbient(0.105882, 0.058824, 0.113725);
    r.setDifuse(0.427451, 0.470588, 0.541176);
    r.setSpecular(0.333333,  0.333333, 0.521569);
    r.setShine(9.84615);
    return(r);
    break;

  case "r3":
    //Retangulo
    r = new Shape(1);
    r.setTranslate(0.5,0.2,0.5);
    r.setScale(0.5,1.5,0.5);
    //material Jade
    r.setAmbient(0.105882, 0.058824, 0.113725);
    r.setDifuse(0.427451, 0.470588, 0.541176);
    r.setSpecular(0.333333,  0.333333, 0.521569);
    r.setShine(9.84615);
    return(r);
    break;




  case "ci0":
    //Cilindro
    ci = new Shape(3);
    ci.setTranslate(0.5,0.2,0.5);
    ci.setScale(0.5,0.95,0.5);
    //material gold
    ci.setAmbient(0.1745, 0.01175, 0.01175);
    ci.setDifuse(0.61424, 0.04136, 0.04136);
    ci.setSpecular(0.727811, 0.626959, 0.626959);
    ci.setShine(76.8);
    return(ci);
    break;

  case "ci1":
    //Cilindro
    ci = new Shape(3);
    ci.setTranslate(1.3,0.1,-1.5);
    ci.setScale(0.5,0.95,0.5);
    //material gold
    ci.setAmbient(0.1745, 0.01175, 0.01175);
    ci.setDifuse(0.61424, 0.04136, 0.04136);
    ci.setSpecular(0.727811, 0.626959, 0.626959);
    ci.setShine(76.8);
    return(ci);
    break;

  case "ci2":
    //Cilindro
    ci = new Shape(3);
    ci.setTranslate(0.5,0.1,2);
    ci.setScale(0.5,1,0.5);
    //material gold
    ci.setAmbient(0.1745, 0.01175, 0.01175);
    ci.setDifuse(0.61424, 0.04136, 0.04136);
    ci.setSpecular(0.727811, 0.626959, 0.626959);
    ci.setShine(76.8);
    return(ci);
    break;


  case "co0":
    //cone
    co = new Shape(2);
    co.setTranslate(0.5,0.9,0.5);
    co.setScale(0.8,0.8,0.8);
    //material gold
    co.setAmbient(0.24705, 0.2, 0.0666);
    co.setDifuse(0.7490, 0.6078, 0.2274);
    co.setSpecular(0.6274, 0.6470, 0.3686);
    co.setShine(51.2);
    return(co);
    break;

  case "co1":
    //cone
    co = new Shape(2);
    co.setTranslate(-0.8,0.6,0.8);
    co.setScale(0.6,0.5,0.6);
    //material gold
    co.setAmbient(0.0, 0.05, 0.0);
    co.setDifuse(0.4, 0.5, 0.4);
    co.setSpecular(0.04, 0.7, 0.04);
    co.setShine(10.0);
    return(co);
    break;

  }
}
function lights(light){
  //Luzes
  switch(light){

  case "a0":
  a0 = new Light(0); //luz ambiente
  a0.setAmbient(0.2,0.2,0.2);
  return(a0);
  break;

  case "p0":
  p0 = new Light(1); //luz pontual
  p0.setAmbient(0.8,0.8,0.8);
  p0.setDifuse(0.5,0.5,0.5);
  p0.setPosition(-3,3,-4);
  p0.setAttenuation(1,0,0);
  return(p0);
  break;

  case "p1":
  p1 = new Light(1); //luz pontual
  p1.setSpecular(0.8,0.8,0.8);
  p1.setPosition(3,3,4);
  p1.setAttenuation(1,0,0);
  return(p1);
  break;

  case "d0":
  d0 = new Light(2); //luz direcao
  d0.setAmbient(0.6,0.6,0.6);
  d0.setSpecular(0.8,0.8,0.8);
  d0.setDifuse(0.3,0.3,0.3);
  d0.setDirection(3,3,4);
  d0.setAttenuation(1,0,0);
  return(d0);
  break;

  case "s0":
  s0 = new Light(3); //luz spot
  s0.setAmbient(0.4,0.4,0.4);
  s0.setSpecular(0.2,0.2,0.2);
  s0.setDifuse(0.4,0.4,0.4);
  s0.setPosition(3,3,4);
  s0.setDirection(6,6,8);
  s0.setAttenuation(1,0,0);
  s0.setConeGap(10);
  return(s0);
  break;



  }
}
