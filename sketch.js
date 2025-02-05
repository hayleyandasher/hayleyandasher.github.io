var back, front, frontalpha;
var paper;
var randPaper = [0,0,0,0];
var px = 0;
var letters = [];
var icons = [];
var l,i;
var letter_imgs = [];
var icon_imgs = [];
var letter_gen = ['a','h','s','y','e','l','+','r'];
var icon_gen = ['Dat','Loc','Clo','Pre','Mai'];
var abc = ['A','B','C'];
var target_ticker = 0;
var info_text = '';
var detail_text = '';
var info_index = -1;
var clicked = -1;
var fr = 30;
var clicked_tick = -90;
var curr_alpha = 0;
var trans = 10;
var icon_jump;
var info = [
  "they met in november 2022 at mcMenamin's\n then returned one year later to get engaged",
  "they have two great cats: Poe and Tog",
  "they enjoy playing board games together\nsuch as go, star realms, and wavelength",
  "early on they bonded over 'ishmael'\na book they had both read and loved"
];
var icon_info = [
  "10 . 15 . 2025\n6 : 00 pm",
  "blockhouse\n1988 nw 18th ave\nportland or 97209",
  "the celebration will be formal.\nhowever, we discourage purchasing\nnew items, so please wear\nsomething you already have",
  "we kindly request no presents,\nbut we will have more\ndetails to come for those\nwho love gift giving ",
  "click here to rsvp by emailing\nhayleyandasher@gmail.com"
];
var detail_info = [
  "",
  "we highly encourage car-pooling\nor public transport as\nparking will be limited",
  "",
  "",
  ""
];
                 
function preload() {
  
  //maryKate = loadFont("MaryKate.ttf");
  //reenieBeanie = loadFont("ReenieBeanie-Regular.ttf");
  caveat = loadFont("Caveat-VariableFont_wght.ttf");
  paper = loadImage("IMG_4969.jpg");
  var i;
  for (var lt of letter_gen){
    letter_imgs.push([]);
    for (i = 1; i<4; i++){
      letter_imgs[letter_imgs.length-1].push(loadImage(lt+str(i)+".png"));
    }
  }
  for (var ic of icon_gen){
    icon_imgs.push([]);
    for (i = 0; i<3; i++){
      icon_imgs[icon_imgs.length-1].push(loadImage("Wed"+ic+abc[i]+".png"));
    }
  }
  
}

function setup() {
  
  frameRate(30);
  textFont(caveat);
  front = color('#4D3D2E');
  back = color('#FFECD6aa');
  frontalpha = color('#4D3D2E');
  createCanvas(windowWidth, windowHeight);
  
  px = min(windowWidth/6,windowHeight/10)
  imageMode(CENTER);
  textAlign(CENTER,TOP);
  letters.push(new letterI(1,[[px*-1.5,px*-1],[0,px*-1],[px*-1.9,px*3.5]]));
  letters.push(new letterI(0,[[px*-0.9,px*-1],[px*-0.9,px*1],[px*-1.6,px*3.5]]));
  letters.push(new letterI(3,[[px*-0.3,px*-1],[px*1.5,px*1],[px*-1.3,px*3.5]]));
  letters.push(new letterI(5,[[px*0.3,px*-1],[px*0.3,px*1],[px*-1,px*3.5]]));
  letters.push(new letterI(4,[[px*0.9,px*-1],[px*0.6,px*-1],[px*-0.7,px*3.5]]));
  letters.push(new letterI(3,[[px*1.5,px*-1],[px*-0.3,px*1],[px*-0.4,px*3.5]]));
  letters.push(new letterI(6,[[0,0],[0,0],[px*0.2,px*3.5]]));
  letters.push(new letterI(0,[[px*-1.2,px*1],[px*-1.2,px*-1],[px*0.8,px*3.5]]));
  letters.push(new letterI(2,[[px*-0.6,px*1],[px*-0.6,px*-1],[px*1.1,px*3.5]]));
  letters.push(new letterI(1,[[0,px*1],[px*-1.5,px*1],[px*1.4,px*3.5]]));
  letters.push(new letterI(4,[[px*0.6,px*1],[px*0.9,px*1],[px*1.7,px*3.5]]));
  letters.push(new letterI(7,[[px*1.2,px*1],[px*1.2,px*-1],[px*2,px*3.5]]));
  
  icon_jump = max(px*3,width/(icon_gen.length-2));
  icon_x = width/2 + icon_jump;
  for (var ic = 0; ic < icon_gen.length; ic++){
    icons.push(new icon(ic,[[icon_x,px*-3.5],[0,px*-2]]));
    icon_x += icon_jump;
  }
  
}

function draw() {
  
  if(clicked == -1){
    if(target_ticker == 0){
      frontalpha.setAlpha(255*randPaper[3]/(fr*1.5));
    }else if(target_ticker == trans - 1){
      frontalpha.setAlpha(255*(1-randPaper[3]/(fr*1.5)));
    }else if (clicked_tick >= -fr*1.5){
      clicked_tick--;
      frontalpha.setAlpha(255*(clicked_tick + fr*1.5)/(fr*1.5));
      if(clicked_tick < -fr*1.5){
        info_text = '';
      }
    }
  } else {
    if(clicked_tick < -fr*1.5){
      frontalpha.setAlpha(curr_alpha*(-fr*1.5-clicked_tick)/(fr*1.5));
      clicked_tick++;
    }else if(clicked_tick == int(-fr*1.5)){
      frontalpha.setAlpha(0);
      info_text = icon_info[clicked];
      detail_text = detail_info[clicked];
      clicked_tick++;
    }else if(clicked_tick < 0){
      frontalpha.setAlpha(255*(clicked_tick + fr*1.5)/(fr*1.5));
      clicked_tick++;
    }
  }
  
  
  
  randPaper[3] += 1;
  if (randPaper[3] >= fr*1.5){
    randPaper = [random()*TWO_PI,random()*50-25,random()*50-25,0];
    for (l of letters){
      l.rerandom();
    }
    for (i of icons){
      i.rerandom();
    }
    target_ticker+=1;
    if (target_ticker == trans && clicked == -1){
      target_ticker = 0;
      for (l of letters){
        l.t = (l.t + 1) % 2;
      }
      var new_info_index = int(random()*info.length);
      while (new_info_index == info_index){
        new_info_index = int(random()*info.length);
      }
      info_index = new_info_index;
      info_text = info[info_index];
      detail_text = '';
    }
  }
  
  translate(width/2,height/2);
  rotate(randPaper[0]);
  image (paper, randPaper[1], randPaper[2], 2400,1800);
  rotate(-randPaper[0]);
  background(back);
  
  for (l of letters){
    l.move();
    l.display();
  }
  for (i of icons){
    i.move();
    i.display();
  }
  
  fill(frontalpha);
  if(clicked_tick < -fr*1.5){
    textUpTo(info_text,0,px*2.5,px*0.35,width*0.9);
  } else {
    textUpTo(info_text,0,px*-0.8,px*0.45,width*0.9);
    textUpTo(detail_text,0,px*1.5,px*0.3,width*0.9);
  }
  
}



class letterI {
  constructor(ltr,target) {
    this.ltr = ltr;
    this.target = target;
    this.t = 0;
    this.pos = [target[0][0],target[0][1]];
    this.vel = [0,0];
    this.acc = [0,0];
    this.size = 0;
    this.sizet = [px,px,px*0.6];
    this.rot = random()*0.5-0.25;
    this.index = int(random()*letter_imgs[this.ltr].length);
    this.theta = random()*TWO_PI;
    this.noiseinput = random()*1000;
  }
  display() {
    this.size = this.size*0.9 + this.sizet[this.t]*0.1;
    translate(this.pos[0],this.pos[1]);
    rotate(this.rot);
    image (letter_imgs[this.ltr][this.index], 0, 0,this.size,this.size);
    rotate(-this.rot);
    translate(-this.pos[0],-this.pos[1]);
  }
  rerandom(){
    
    this.rot = random()*0.5-0.25;
    var new_idx = int(random()*letter_imgs[this.ltr].length);
    while (new_idx == this.index ){
      new_idx = int(random()*letter_imgs[this.ltr].length);
    }
    this.index = new_idx;
  }
  move() {
    for (var m = 0; m < 2; m++){
      this.acc[m] += (this.target[this.t][m] - this.pos[m])*0.004;
      this.vel[m] += this.acc[m];
      this.vel[m] *= 0.9;
      this.pos[m] += this.vel[m];
    }
    
    this.noiseinput += 0.01;
    this.theta += noise(this.noiseinput)*0.1 - 0.05;
    this.acc = [cos(this.theta)*this.size*0.0002,sin(this.theta)*this.size*0.0002];
    
   // this.acc = [0,0];
  }
}



class icon {
  constructor(icon,target) {
    this.icon = icon;
    this.target = target;
    this.t = 0;
    this.pos = [target[0][0],target[0][1]];
    this.vel = [0,0];
    this.acc = [0,0];
    this.size = px*1.2;
    this.sizet = [px*1.2,px*2];
    this.rot = random()*0.5-0.25;
    this.index = int(random()*icon_imgs[this.icon].length);
    this.theta = random()*TWO_PI;
    this.noiseinput = random()*1000;
  }
  display() {
    this.size = this.size*0.9 + this.sizet[this.t]*0.1;
    var disp_mult = 1;
    if (this.isMouse() && clicked == -1){disp_mult = 1.2;}
    translate(this.pos[0],this.pos[1]);
    rotate(this.rot);
    image (icon_imgs[this.icon][this.index], 0, 0,this.size*disp_mult,this.size*disp_mult);
    rotate(-this.rot);
    translate(-this.pos[0],-this.pos[1]);
  }
  rerandom(){
    this.rot = random()*0.5-0.25;
    var new_idx = int(random()*icon_imgs[this.icon].length);
    while (new_idx == this.index ){
      new_idx = int(random()*icon_imgs[this.icon].length);
    }
    this.index = new_idx;
  }
  move() {
    if (clicked == -1){
      this.target[0][0] -= px*0.03;
      if (this.target[0][0] <= -(width + icon_jump)/2){
        this.target[0][0] = icons[(icons.length+this.icon-1)%icons.length].target[0][0] + icon_jump;
        this.pos[0] = this.target[0][0];
      }
    }
    
    for (var m = 0; m < 2; m++){
      this.acc[m] += (this.target[this.t][m] - this.pos[m])*0.004;
      this.vel[m] += this.acc[m];
      this.vel[m] *= 0.9;
      this.pos[m] += this.vel[m];
    }
    
    this.noiseinput += 0.01;
    this.theta += noise(this.noiseinput)*0.1 - 0.05;
    this.acc = [cos(this.theta)*this.size*0.0006,sin(this.theta)*this.size*0.0006];
  }
  isMouse(){
    return (max(abs(mouseX-width/2-this.pos[0]),abs(mouseY-height/2-this.pos[1]))*2<this.size);
  }
}

function touchStarted(){
  
  if (clicked == 4 && mouseY > height/2-px*2 && mouseY < height/2+px*2){
    window.open('mailto:' + 'hayleyandasher@gmail.com');
  }
  
  if (clicked != -1 && clicked_tick == 0){
    
    clicked = -1;
    randPaper[3] = 0;
    target_ticker = 1;
    for (var lr of letters){
      lr.t = 0;
    }
    for (lr of icons){
      lr.target[0][1] = px*-2.75;
      lr.t = 0;
    }
    return;
    
  }
  if (clicked != -1){
    return;
  }
  for (var ic = 0; ic < icons.length; ic++){
    if (icons[ic].isMouse()){
      
      var x_var = icons[ic].pos[0];
      
      clicked = ic;
      icons[ic].t = 1;
      curr_alpha = alpha(frontalpha);
      clicked_tick = fr*-3;
      for (var lt of letters){
        lt.t = 2;
      }
      for (lt = 0; lt < icons.length; lt++){
        if (lt != ic){
          icons[lt].target[0][1] = -height/2-icon_jump;
        }
        icons[lt].target[0][0] -= x_var;
      }
      return;
    }
  }
  
  
  
 
}

function textUpTo(text_string,x,y,size,max_size){
  textSize(size);
  var tw = textWidth(text_string);
  if (tw > max_size){
    textSize(size*max_size/tw);
  }
  text(text_string,x,y);
}
