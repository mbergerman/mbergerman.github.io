var sketch_head = function(p) {

  const IMG_SIZE = 250;
  const SEP = 30;
  const SUM_MAX = 100;
  const SUM_SCALE = SUM_MAX/(IMG_SIZE*255);
  const RADON_H = IMG_SIZE*2-SEP;
  const WAIT_TIME = 60;

  let start_loop = 0;

  let pg;
  let img;
  let im = [];

  let i, j = 0;

  let radon;

  let h = 0;
  let phi = 0.0;

  let wait_counter = 0;

  // helper for writing color to array
  p.writeGray = function(image, x, y, g) {
      let idx = (x + y * image.width) * 4;
      image.pixels[idx] = g;
      image.pixels[idx + 1] = g;
      image.pixels[idx + 2] = g;
      image.pixels[idx + 3] = 255;
    }

  p.preload = function() {
    img = p.loadImage("assets/files/tomografia-files/head.png", function(){
      img.resize(IMG_SIZE, IMG_SIZE);
    });
    img.loadPixels();
  }

  p.windowResized = function() {
    var canvasDiv = document.getElementById('sketch-tomography');
    var width = canvasDiv.offsetWidth;
    p.resizeCanvas(width, width*5/8);
  }

  p.setup = function() {
    var canvasDiv = document.getElementById('sketch-tomography');
    var width = canvasDiv.offsetWidth;
    const canvas = p.createCanvas(width, width*5/8);
    canvas.parent('sketch-tomography');

    pg = p.createGraphics(800, 500);
    pg.imageMode(p.CENTER);
    pg.rectMode(p.CENTER);
    
    let index = 0;
    for(i=0; i<img.width; i++){
      let row = [];
      for(j=0; j<img.height; j++){
        let pix = (img.pixels[index]+
                  img.pixels[index+1]+
                  img.pixels[index+2])/3;
        if (img.pixels[index+3] == 0){
          pix = 0;
        }
        row.push(pix);
        index += 4;
      }
      im.push(row);
    }
    
    radon = p.createImage(IMG_SIZE, RADON_H);

  }

  p.draw = function() {

    if(wait_counter==0){
      if(h==0){
        radon = p.createImage(IMG_SIZE, RADON_H);
      }
      h = (h+1)%RADON_H;
      phi = h * 2*p.PI/RADON_H + p.PI; 
    }
    
    if(h == 0){
      if(wait_counter == 0){
        wait_counter = WAIT_TIME;
      }
      wait_counter--;
    }

    
    let sums = [];
    for(i=0; i<img.width; i++){
      let sum = 0;
      for(j=0; j<img.height; j++){
        let vecy = p5.Vector.fromAngle(p.PI/2 - phi);
        vecy.mult(IMG_SIZE/2-j);
        let vecx = p5.Vector.fromAngle(-phi);
        vecx.mult(-IMG_SIZE/2+i);
        
        let vec = p5.Vector.add(vecx, vecy);

        let imx = p.int(IMG_SIZE/2 + vec.x);
        let imy = p.int(IMG_SIZE/2 - vec.y);
        
        if( imx >= 0 && imx < img.width && imy > 0 && imy < img.height){
          sum += im[imy][imx];
        }
      }
      sums.push(sum*SUM_SCALE);
    }
    
    pg.background(0);
    
    pg.push();
    pg.translate(250, 250);
    
    pg.push();
    pg.rotate(phi);
    pg.fill(150);
    pg.noStroke();
    //rect(0, -(IMG_SIZE/2+SEP), IMG_SIZE, 10);
    pg.stroke(50);
    pg.fill(50);
    pg.strokeWeight(6);
    for(i of [-100, -50, 0, 50, 100]){
      pg.line(i, -IMG_SIZE/2-SEP, i, IMG_SIZE/2+SEP-10);
      pg.triangle(i, IMG_SIZE/2+SEP-10,
              i-5, IMG_SIZE/2+SEP-20,
              i+5, IMG_SIZE/2+SEP-20)
    }

    pg.stroke(150);
    pg.fill(150);
    pg.strokeWeight(1);
    pg.beginShape();
    pg.vertex(-IMG_SIZE/2, IMG_SIZE/2+SEP-1);
    pg.vertex(-IMG_SIZE/2, IMG_SIZE/2+SEP);
    
    for(i=0; i<img.width; i++){
      pg.vertex(-IMG_SIZE/2+i, IMG_SIZE/2+SEP + sums[i]);
    }
    
    pg.vertex(+IMG_SIZE/2, IMG_SIZE/2+SEP);
    pg.vertex(+IMG_SIZE/2, IMG_SIZE/2+SEP-1);
    pg.endShape(p.CLOSE);
    
    pg.pop();
    
    pg.noFill();
    pg.stroke(255);
    pg.image(img, 0, 0, IMG_SIZE, IMG_SIZE);
    pg.circle(0, 0, IMG_SIZE);
    pg.pop();
    
    
    radon.loadPixels();
    for(i=0; i<IMG_SIZE; i++){
      p.writeGray(radon, i, h, 2*255*sums[i]/SUM_MAX);//255*log(sums[i])/log(SUM_MAX));
    }
    radon.updatePixels();
    pg.image(radon, pg.width-IMG_SIZE/2-SEP, pg.height/2);
    
    pg.stroke(255);
    pg.fill(0, 0, 0, 0);
    pg.rect(pg.width-IMG_SIZE/2-SEP, pg.height/2, IMG_SIZE, RADON_H);
    
    
    
    p.image(pg, 0, 0, p.width, p.height);

    
    if(start_loop == 0){
      start_loop = 1;
      p.noLoop();
    }
  }

  p.mouseClicked = function() {
    if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){
      if(p.isLooping()){
        p.noLoop();
      }else{
        p.loop();
      }
    }
  }
}

var myp5Head = new p5(sketch_head);


var sketch_dots = function(p) {

  const IMG_SIZE = 250;
  const SEP = 30;
  const SUM_MAX = 100;
  const SUM_SCALE = SUM_MAX/(IMG_SIZE*255);
  const RADON_H = IMG_SIZE*2-SEP;
  const WAIT_TIME = 60;

  let start_loop = 0;

  let pg;
  let img;
  let im = [];

  let i, j = 0;

  let radon;

  let h = 0;
  let phi = 0.0;

  let wait_counter = 0;

  // helper for writing color to array
  p.writeGray = function(image, x, y, g) {
      let idx = (x + y * image.width) * 4;
      image.pixels[idx] = g;
      image.pixels[idx + 1] = g;
      image.pixels[idx + 2] = g;
      image.pixels[idx + 3] = 255;
    }

  p.preload = function() {
    img = p.loadImage("assets/files/tomografia-files/dots.png", function(){
      img.resize(IMG_SIZE, IMG_SIZE);
    });
    img.loadPixels();
  }

  p.windowResized = function() {
    var canvasDiv = document.getElementById('sketch-tomography-dots');
    var width = canvasDiv.offsetWidth;
    p.resizeCanvas(width, width*5/8);
  }

  p.setup = function() {
    var canvasDiv = document.getElementById('sketch-tomography-dots');
    var width = canvasDiv.offsetWidth;
    const canvas = p.createCanvas(width, width*5/8);
    canvas.parent('sketch-tomography-dots');

    pg = p.createGraphics(800, 500);
    pg.imageMode(p.CENTER);
    pg.rectMode(p.CENTER);
    
    let index = 0;
    for(i=0; i<img.width; i++){
      let row = [];
      for(j=0; j<img.height; j++){
        let pix = (img.pixels[index]+
                  img.pixels[index+1]+
                  img.pixels[index+2])/3;
        if (img.pixels[index+3] == 0){
          pix = 0;
        }
        row.push(pix);
        index += 4;
      }
      im.push(row);
    }
    
    radon = p.createImage(IMG_SIZE, RADON_H);
  }

  p.draw = function() {

    if(wait_counter==0){
      if(h==0){
        radon = p.createImage(IMG_SIZE, RADON_H);
      }
      h = (h+1)%RADON_H;
      phi = h * 2*p.PI/RADON_H + p.PI; 
    }
    
    if(h == 0){
      if(wait_counter == 0){
        wait_counter = WAIT_TIME;
      }
      wait_counter--;
    }

    
    let sums = [];
    for(i=0; i<img.width; i++){
      let sum = 0;
      for(j=0; j<img.height; j++){
        let vecy = p5.Vector.fromAngle(p.PI/2 - phi);
        vecy.mult(IMG_SIZE/2-j);
        let vecx = p5.Vector.fromAngle(-phi);
        vecx.mult(-IMG_SIZE/2+i);
        
        let vec = p5.Vector.add(vecx, vecy);

        let imx = p.int(IMG_SIZE/2 + vec.x);
        let imy = p.int(IMG_SIZE/2 - vec.y);
        
        if( imx >= 0 && imx < img.width && imy > 0 && imy < img.height){
          sum += im[imy][imx];
        }
      }
      sums.push(sum*SUM_SCALE);
    }
    
    pg.background(0);
    
    pg.push();
    pg.translate(250, 250);
    
    pg.push();
    pg.rotate(phi);
    pg.fill(150);
    pg.noStroke();
    //rect(0, -(IMG_SIZE/2+SEP), IMG_SIZE, 10);
    pg.stroke(50);
    pg.fill(50);
    pg.strokeWeight(6);
    for(i of [-100, -50, 0, 50, 100]){
      pg.line(i, -IMG_SIZE/2-SEP, i, IMG_SIZE/2+SEP-10);
      pg.triangle(i, IMG_SIZE/2+SEP-10,
              i-5, IMG_SIZE/2+SEP-20,
              i+5, IMG_SIZE/2+SEP-20)
    }

    pg.stroke(150);
    pg.fill(150);
    pg.strokeWeight(1);
    pg.beginShape();
    pg.vertex(-IMG_SIZE/2, IMG_SIZE/2+SEP-1);
    pg.vertex(-IMG_SIZE/2, IMG_SIZE/2+SEP);
    
    for(i=0; i<img.width; i++){
      pg.vertex(-IMG_SIZE/2+i, IMG_SIZE/2+SEP + sums[i]);
    }
    
    pg.vertex(+IMG_SIZE/2, IMG_SIZE/2+SEP);
    pg.vertex(+IMG_SIZE/2, IMG_SIZE/2+SEP-1);
    pg.endShape(p.CLOSE);
    
    pg.pop();
    
    pg.noFill();
    pg.stroke(255);
    pg.image(img, 0, 0, IMG_SIZE, IMG_SIZE);
    pg.circle(0, 0, IMG_SIZE);
    pg.pop();
    
    
    radon.loadPixels();
    for(i=0; i<IMG_SIZE; i++){
      p.writeGray(radon, i, h, 2*255*sums[i]/SUM_MAX);//255*log(sums[i])/log(SUM_MAX));
    }
    radon.updatePixels();
    pg.image(radon, pg.width-IMG_SIZE/2-SEP, pg.height/2);
    
    pg.stroke(255);
    pg.fill(0, 0, 0, 0);
    pg.rect(pg.width-IMG_SIZE/2-SEP, pg.height/2, IMG_SIZE, RADON_H);
    
    
    
    p.image(pg, 0, 0, p.width, p.height);

    
    if(start_loop == 0){
      start_loop = 1;
      p.noLoop();
    }
  }

  p.mouseClicked = function() {
    if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){
      if(p.isLooping()){
        p.noLoop();
      }else{
        p.loop();
      }
    }
  }
}

var myp5Dot1 = new p5(sketch_dots);



var sketch_logo = function(p) {

  const IMG_SIZE = 250;
  const SEP = 30;
  const SUM_MAX = 100;
  const SUM_SCALE = SUM_MAX/(IMG_SIZE*255);
  const RADON_H = IMG_SIZE*2-SEP;
  const WAIT_TIME = 60;

  let start_loop = 0;

  let pg;
  let img;
  let im = [];

  let i, j = 0;

  let radon;

  let h = 0;
  let phi = 0.0;

  let wait_counter = 0;

  // helper for writing color to array
  p.writeGray = function(image, x, y, g) {
      let idx = (x + y * image.width) * 4;
      image.pixels[idx] = g;
      image.pixels[idx + 1] = g;
      image.pixels[idx + 2] = g;
      image.pixels[idx + 3] = 255;
    }

  p.preload = function() {
    img = p.loadImage("assets/files/tomografia-files/ITBA Logo.png", function(){
      img.resize(IMG_SIZE, IMG_SIZE);
    });
    img.loadPixels();
  }

  p.windowResized = function() {
    var canvasDiv = document.getElementById('sketch-tomography-logo');
    var width = canvasDiv.offsetWidth;
    p.resizeCanvas(width, width*5/8);
  }

  p.setup = function() {
    var canvasDiv = document.getElementById('sketch-tomography-logo');
    var width = canvasDiv.offsetWidth;
    const canvas = p.createCanvas(width, width*5/8);
    canvas.parent('sketch-tomography-logo');

    pg = p.createGraphics(800, 500);
    pg.imageMode(p.CENTER);
    pg.rectMode(p.CENTER);
    
    let index = 0;
    for(i=0; i<img.width; i++){
      let row = [];
      for(j=0; j<img.height; j++){
        let pix = (img.pixels[index]+
                  img.pixels[index+1]+
                  img.pixels[index+2])/3;
        if (img.pixels[index+3] == 0){
          pix = 0;
        }
        row.push(pix);
        index += 4;
      }
      im.push(row);
    }
    
    radon = p.createImage(IMG_SIZE, RADON_H);
  }

  p.draw = function() {

    if(wait_counter==0){
      if(h==0){
        radon = p.createImage(IMG_SIZE, RADON_H);
      }
      h = (h+1)%RADON_H;
      phi = h * 2*p.PI/RADON_H + p.PI; 
    }
    
    if(h == 0){
      if(wait_counter == 0){
        wait_counter = WAIT_TIME;
      }
      wait_counter--;
    }

    
    let sums = [];
    for(i=0; i<img.width; i++){
      let sum = 0;
      for(j=0; j<img.height; j++){
        let vecy = p5.Vector.fromAngle(p.PI/2 - phi);
        vecy.mult(IMG_SIZE/2-j);
        let vecx = p5.Vector.fromAngle(-phi);
        vecx.mult(-IMG_SIZE/2+i);
        
        let vec = p5.Vector.add(vecx, vecy);

        let imx = p.int(IMG_SIZE/2 + vec.x);
        let imy = p.int(IMG_SIZE/2 - vec.y);
        
        if( imx >= 0 && imx < img.width && imy > 0 && imy < img.height){
          sum += im[imy][imx];
        }
      }
      sums.push(sum*SUM_SCALE);
    }
    
    pg.background(0);
    
    pg.push();
    pg.translate(250, 250);
    
    pg.push();
    pg.rotate(phi);
    pg.fill(150);
    pg.noStroke();
    //rect(0, -(IMG_SIZE/2+SEP), IMG_SIZE, 10);
    pg.stroke(50);
    pg.fill(50);
    pg.strokeWeight(6);
    for(i of [-100, -50, 0, 50, 100]){
      pg.line(i, -IMG_SIZE/2-SEP, i, IMG_SIZE/2+SEP-10);
      pg.triangle(i, IMG_SIZE/2+SEP-10,
              i-5, IMG_SIZE/2+SEP-20,
              i+5, IMG_SIZE/2+SEP-20)
    }

    pg.stroke(150);
    pg.fill(150);
    pg.strokeWeight(1);
    pg.beginShape();
    pg.vertex(-IMG_SIZE/2, IMG_SIZE/2+SEP-1);
    pg.vertex(-IMG_SIZE/2, IMG_SIZE/2+SEP);
    
    for(i=0; i<img.width; i++){
      pg.vertex(-IMG_SIZE/2+i, IMG_SIZE/2+SEP + sums[i]);
    }
    
    pg.vertex(+IMG_SIZE/2, IMG_SIZE/2+SEP);
    pg.vertex(+IMG_SIZE/2, IMG_SIZE/2+SEP-1);
    pg.endShape(p.CLOSE);
    
    pg.pop();
    
    pg.noFill();
    pg.stroke(255);
    pg.image(img, 0, 0, IMG_SIZE, IMG_SIZE);
    pg.circle(0, 0, IMG_SIZE);
    pg.pop();
    
    
    radon.loadPixels();
    for(i=0; i<IMG_SIZE; i++){
      p.writeGray(radon, i, h, 2*255*sums[i]/SUM_MAX);//255*log(sums[i])/log(SUM_MAX));
    }
    radon.updatePixels();
    pg.image(radon, pg.width-IMG_SIZE/2-SEP, pg.height/2);
    
    pg.stroke(255);
    pg.fill(0, 0, 0, 0);
    pg.rect(pg.width-IMG_SIZE/2-SEP, pg.height/2, IMG_SIZE, RADON_H);
    
    
    
    p.image(pg, 0, 0, p.width, p.height);

    
    if(start_loop == 0){
      start_loop = 1;
      p.noLoop();
    }
  }

  p.mouseClicked = function() {
    if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){
      if(p.isLooping()){
        p.noLoop();
      }else{
        p.loop();
      }
    }
  }
}

var myp5Logo = new p5(sketch_logo);


var sketch_logo2 = function(p) {

  const IMG_SIZE = 250;
  const SEP = 30;
  const SUM_MAX = 100;
  const SUM_SCALE = SUM_MAX/(IMG_SIZE*255);
  const RADON_H = IMG_SIZE*2-SEP;
  const WAIT_TIME = 60;

  let start_loop = 0;

  let pg;
  let img;
  let im = [];

  let i, j = 0;

  let radon;

  let h = 0;
  let phi = 0.0;

  let wait_counter = 0;

  // helper for writing color to array
  p.writeGray = function(image, x, y, g) {
      let idx = (x + y * image.width) * 4;
      image.pixels[idx] = g;
      image.pixels[idx + 1] = g;
      image.pixels[idx + 2] = g;
      image.pixels[idx + 3] = 255;
    }

  p.preload = function() {
    img = p.loadImage("assets/files/tomografia-files/ITBA Logo.png", function(){
      img.resize(IMG_SIZE, IMG_SIZE);
    });
    img.loadPixels();
  }

  p.windowResized = function() {
    var canvasDiv = document.getElementById('sketch-tomography-logo2');
    var width = canvasDiv.offsetWidth;
    p.resizeCanvas(width, width*5/8);
  }

  p.setup = function() {
    var canvasDiv = document.getElementById('sketch-tomography-logo2');
    var width = canvasDiv.offsetWidth;
    const canvas = p.createCanvas(width, width*5/8);
    canvas.parent('sketch-tomography-logo2');

    pg = p.createGraphics(800, 500);
    pg.imageMode(p.CENTER);
    pg.rectMode(p.CENTER);
    
    let index = 0;
    for(i=0; i<img.width; i++){
      let row = [];
      for(j=0; j<img.height; j++){
        let pix = (img.pixels[index]+
                  img.pixels[index+1]+
                  img.pixels[index+2])/3;
        if (img.pixels[index+3] == 0){
          pix = 0;
        }
        row.push(pix);
        index += 4;
      }
      im.push(row);
    }
    
    radon = p.createImage(IMG_SIZE, RADON_H);
  }

  p.draw = function() {

    
    if(wait_counter==0){
      if(h==0){
        radon = p.createImage(IMG_SIZE, RADON_H);
      }
      h = (h+1)%RADON_H;
      phi = h * 2*p.PI/RADON_H + p.PI; 
    }
    
    if(h == 0){
      if(wait_counter == 0){
        wait_counter = WAIT_TIME;
      }
      wait_counter--;
    }
    
    
    let sums = [];
    for(i=0; i<img.width; i++){
      let sum = 0;
      for(j=0; j<img.height; j++){
        let vecy = p5.Vector.fromAngle(p.PI/2 - phi);
        vecy.mult(IMG_SIZE/2-j);
        let vecx = p5.Vector.fromAngle(-phi);
        vecx.mult(-IMG_SIZE/2+i);
        
        let vec = p5.Vector.add(vecx, vecy);

        let imx = p.int(IMG_SIZE/2 + vec.x);
        let imy = p.int(IMG_SIZE/2 - vec.y);
        
        if( imx >= 0 && imx < img.width && imy > 0 && imy < img.height){
          sum += im[imy][imx];
        }
      }
      sums.push(sum*SUM_SCALE);
    }
    
    pg.background(0);
    
    pg.push();
    pg.translate(250, 250);
    
    pg.push();
    pg.scale(1, -1);
    pg.fill(150);
    pg.noStroke();
    //rect(0, -(IMG_SIZE/2+SEP), IMG_SIZE, 10);
    pg.stroke(50);
    pg.fill(50);
    pg.strokeWeight(6);
    for(i of [-100, -50, 0, 50, 100]){
      pg.line(i, -IMG_SIZE/2-SEP, i, IMG_SIZE/2+SEP-10);
      pg.triangle(i, IMG_SIZE/2+SEP-10,
              i-5, IMG_SIZE/2+SEP-20,
              i+5, IMG_SIZE/2+SEP-20)
    }

    pg.stroke(150);
    pg.fill(150);
    pg.strokeWeight(1);
    pg.beginShape();
    pg.vertex(-IMG_SIZE/2, IMG_SIZE/2+SEP-1);
    pg.vertex(-IMG_SIZE/2, IMG_SIZE/2+SEP);
    
    for(i=0; i<img.width; i++){
      pg.vertex(-IMG_SIZE/2+i, IMG_SIZE/2+SEP + sums[i]);
    }
    
    pg.vertex(+IMG_SIZE/2, IMG_SIZE/2+SEP);
    pg.vertex(+IMG_SIZE/2, IMG_SIZE/2+SEP-1);
    pg.endShape(p.CLOSE);
    
    pg.pop();
    
    pg.noFill();
    pg.stroke(255);
    pg.rotate(-phi);
    pg.image(img, 0, 0, IMG_SIZE, IMG_SIZE);
    pg.circle(0, 0, IMG_SIZE);
    pg.pop();
    
    
    radon.loadPixels();
    for(i=0; i<IMG_SIZE; i++){
      p.writeGray(radon, i, h, 2*255*sums[i]/SUM_MAX);//255*log(sums[i])/log(SUM_MAX));
    }
    radon.updatePixels();
    pg.image(radon, pg.width-IMG_SIZE/2-SEP, pg.height/2);
    
    pg.stroke(255);
    pg.fill(0, 0, 0, 0);
    pg.rect(pg.width-IMG_SIZE/2-SEP, pg.height/2, IMG_SIZE, RADON_H);
    
    
    p.image(pg, 0, 0, p.width, p.height);
    
    if(start_loop == 0){
      start_loop = 1;
      p.noLoop();
    }
  }

  p.mouseClicked = function() {
    if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){
      if(p.isLooping()){
        p.noLoop();
      }else{
        p.loop();
      }
    }
  }
}

var myp5Logo2 = new p5(sketch_logo2);