//鼠标左键旋转画面，按住鼠标中键平移画面
//原始版本：https://editor.p5js.org/huichuan1999/sketches/Mz1FbBpJR 
//使用json文件加入文本的版本：https://editor.p5js.org/huichuan1999/sketches/kphEC9R9a 
//将需要的段落粘贴到json文件里， 在这里我将每个空格“ ”作为单词之间的分隔符，将每个句号“.”号作为句子之间的分隔符。文本的末尾不要有空格，不然会将这个空格识别为一个单独的句子增加一个空旋臂
//每一句话都是一个单独的旋臂，比如，两句话，是双螺旋，三句话，就是三螺旋。

let jsonData;
let sentencesArray = []; //将句子们存储在这里
let wordsArray =[];
let graphicsArray = []; //将每个独立的单词存放在这里
let wordWidths = [];     // 存储每一个单词的宽度用于绘制graphics和planes
let easycam;
let angle = 0;
let radius = 200;
let speed = 0.01;
let spiralCount;
var sentenceColor = {
  r: 0,
  g: 0,
  b: 0,
}

var sentenceColor1 = {
  r: 128,
  g: 128,
  b: 0,
}

var sentenceColor2 = {
  r: 128,
  g: 0,
  b: 128,
}

let camPos;
let state;

let textParagraph;
let rotateText
let currentParagraph;
let textSpace;
var allPage = [];
let currentPage;
let AIText = 'Yeast that lactates';
let spiral = 0;
let particle = 0;
let autoSuffle = 0;
let scaleUp = 0;
let getFrameCount = 0;



function preload() {
  jsonData = loadJSON('json/Revision1.json');
  textOraca = loadStrings('assets/orca.txt');
  textParagraph0 = loadStrings('assets/p_0.txt');
  textParagraph1 = loadStrings('assets/p_1.txt');
  textParagraph2 = loadStrings('assets/p_2.txt');
  textParagraph3 = loadStrings('assets/p_3.txt');
  textParagraph4 = loadStrings('assets/p_4.txt')
  textglands = loadStrings('assets/glands.txt');
  textParagraphEmpty = '';
  font = loadFont("assets/Workbench-Regular.ttf"); 
  font1 = loadFont("assets/SI.ttf"); 
  particleTable = loadTable("assets/1lfg.csv","csv");

}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
 
  frameRate(60);

  chopSentences();

  enableCam();

  createParticleSystem(particleTable);

  //initial setting
  currentParagraph = textParagraphEmpty;
  textSpace = 80;
  sentenceColor = sentenceColor1;
  currentPage = 0;

}

function draw() {
  background(0);
  drawParagraph(currentParagraph, sentenceColor, textSpace);
  if (spiral == 1) {
    spiralVisual();
  }
  bigText(AIText);
 // angleText(textParagraph2, 0, 0.8, 0);
  if (particle == 1){
    createParticleSystem(particleTable);
  }

  if (autoSuffle ==1 && frameCount%200 == 10){
    shuffle(currentParagraph, true);
  }

 easycam.rotateX(0.0008*sin(frameCount/100));
 easycam.rotateY(random(0,1)*0.0008*sin(frameCount/100));
 

// console.log(frameCount);
}

function enableCam(){
 easycam = createEasyCam(p5.RendererGL, {distance:200, center:[0,0,0]});
 
 camPos = easycam.getPosition();
 state = easycam.getState();

}



function drawParagraph(textParagraph, textColor, textSpace){
  textFont(font);
  textSize(16);
for (let i = 0; i < textParagraph.length; i++) {
  fill(textColor.r+i*20, textColor.g+i*20, textColor.b+i*20);
  text(textParagraph[i], 0-0.5*windowWidth +10, i*textSpace - 0.5*windowHeight +30, windowWidth-20, windowHeight); // each paragraph is 80 in height
} 
}

function bigText(AIText){
  textSize(220);
  fill('yellow');
  textFont(font1);
  text(AIText, 0-0.6*windowWidth, 20, windowWidth-20, windowHeight);
}

 function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    currentPage ++;
  }
  if (keyCode === LEFT_ARROW) {
    currentPage --;
  }
  if (keyCode === UP_ARROW) {
    shuffle(currentParagraph, false);
  }  
  switch (currentPage) {
    case 0:
      currentParagraph = textParagraphEmpty;
      textSpace = 10;
      sentenceColor = sentenceColor1;
      AIText = 'Yeast that lactates';
      spiral = 0;
      particle = 0; 
      break;
    case 1:
      currentParagraph = textParagraph0;
      textSpace = 80;
      sentenceColor = sentenceColor1;
      AIText = '';
      spiral = 0;
      particle = 0;
      autoSuffle =1;
      break;

    case 2:
        currentParagraph = textParagraph0;
        textSpace = 80;
        sentenceColor = sentenceColor1;
        AIText = '';
        spiral = 1;
        particle = 0;
        autoSuffle =1;
        break;

    case 3:
      currentParagraph = textParagraph1;
      textSpace = 80;
      sentenceColor = sentenceColor1;
      AIText = '';
      spiral = 1;
      autoSuffle =1;
      break;
    case 4:
      currentParagraph = textOraca;
      textSpace = 10;
      sentenceColor = sentenceColor1;
      AIText = '';
      spiral = 0;
      autoSuffle =0;
      break;
    case 5:
      currentParagraph = textParagraphEmpty;
      textSpace = 10;
      sentenceColor = sentenceColor1;
      AIText = 'Milk is a proxy for milk.';
      spiral = 0;
      particle = 0; 
      break;

   case 6:
    currentParagraph = textglands;
    textSpace = 10;
    sentenceColor = sentenceColor1;
    AIText = '';
    spiral = 0;
    autoSuffle =0; 
       break;

    case 7:
        currentParagraph = textParagraph2;
        textSpace = 80;
        sentenceColor = sentenceColor2;
        AIText = '';
        spiral = 0;
        particle = 0;
        autoSuffle =1;  
           break;

    case 8:
      currentParagraph = textParagraph2;
      textSpace = 80;
      sentenceColor = sentenceColor2;
      AIText = '';
      spiral = 0;
      particle = 1;
      scaleUp = 0;
     // getFrameCount = frameCount;
      autoSuffle =1; 
      break;
    case 9:
        currentParagraph = textParagraphEmpty;
        textSpace = 80;
        sentenceColor = sentenceColor2;
        AIText = '';
        spiral = 0;
        particle = 1;
        scaleUp = 1;
        getFrameCount = frameCount;
        autoSuffle =1; 
        break;
    case 10:
          currentParagraph = textParagraph3;
          textSpace = 80;
          sentenceColor = sentenceColor2;
          AIText = '';
          spiral = 0;
          particle = 0;
          scaleUp = 0;
          autoSuffle =1; 
          break;
   case 10:
          currentParagraph = textParagraph4;
          textSpace = 80;
          sentenceColor = sentenceColor2;
          AIText = '';
          spiral = 0;
          particle = 0;
          scaleUp = 0;

          autoSuffle =1; 

    case 11:
            currentParagraph = textParagraphEmpty;
            textSpace = 80;
            sentenceColor = sentenceColor2;
            AIText = 'This is Milk.';
            spiral = 0;
            particle = 0;
            scaleUp = 0;
            autoSuffle =1;
    default:
      //  
  }

  console.log(currentPage)



 }

//让它们面向摄像机的方向
function lookAt(direction, up) { 
  let z = direction.copy().normalize();
  let x = up.copy().cross(z).normalize();
  let y = z.copy().cross(x);

  return [
    x.x, x.y, x.z, 0,
    y.x, y.y, y.z, 0,
    z.x, z.y, z.z, 0,
    0,   0,   0,   1
  ];
}

function chopSentences(){


  let rawText = jsonData.text;
  let sentences = rawText.split(". "); //用句号来分割每个句子
  spiralCount = sentences.length;

  for (let i = 0; i < spiralCount; i++) {
    let words = sentences[i].split(",").reverse(); // 反转单词顺序
    //let words = sentences[i].split(" ");
    wordsArray.push(words);
  
    let graphics = [];
    let widths = []; // 为每个句子创建一个新的宽度数组
    
    sentenceColor.r= random(100,255);
    sentenceColor.g= random(100,255);
    sentenceColor.b= random(100,255);
  
    for (let word of words) {
      let wordWidth = textWidth(word);
      //let gr = createGraphics(wordWidth, 30); //试图让每一个graphic的宽度等于每个单词的宽度，但是没有成功
      let gr = createGraphics(180, 30);
      console.log(wordWidth);
      gr.textSize(13);
      gr.textAlign(CENTER, CENTER);
      gr.fill(sentenceColor.r, sentenceColor.g, sentenceColor.b);
      gr.text(word, gr.width / 2, gr.height / 2);
      graphics.push(gr);
      widths.push(wordWidth);
    }
  
    graphicsArray.push(graphics);
    wordWidths.push(widths); // 将这个句子的宽度数组添加到wordWidths中
  }

}

function spiralVisual(){


  let camPos = easycam.getPosition();
  let state = easycam.getState();
  let rotation = state.rotation;

  let angleStep = TWO_PI / spiralCount; // 每个螺旋的角度间隔

  for (let i = 0; i < graphicsArray.length; i++) {
    let spiralAngle = angleStep * i; // 每个螺旋的起始角度，在圆周上等分
    let directionMultiplier = i % 2 == 0 ? 1 : -1; // 相邻螺旋方向相反（顺时针和逆时针）

    for (let j = 0; j < graphicsArray[i].length; j++) {
      let offset = j * 50;
      let z = -500 + offset;
      let angleOffset = angle * directionMultiplier + offset;
      let x = radius * cos(spiralAngle + angleOffset);
      let y = radius * sin(spiralAngle + angleOffset);

      push();
      translate(x, y, z);

      //随时都面向摄像机镜头的方向
      let target = createVector(camPos[0], camPos[1], camPos[2]);
      let dir = target.sub(createVector(x, y, z));
      let up = createVector(0, 1, 0);
      applyMatrix(...lookAt(dir, up)); 
      
      normalMaterial(); //注释掉可以显示plane的边框
      texture(graphicsArray[i][j]);
      //plane(wordWidths[i][j], 30); //试图让每一个plane的宽度等于每个单词的宽度，但是没有成功
      plane(150, 30);
      pop();
    }
  }

  angle += speed;
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(true);
    
  }
}

function angleText(textParagraph, x, y, z){
  rotateText = createGraphics(windowWidth, windowHeight);
 
  rotateText.fill(255,200,255);
  rotateText.textFont(font);
  rotateText.textAlign(LEFT);
  rotateText.textSize(13);
    for (let i = 0; i < textParagraph.length; i++) {
   // fill(textColor.r+i*20, textColor.g+i*20, textColor.b+i*20);
   rotateText.text(textParagraph[i], 0, 0.5*windowHeight+i*80, windowWidth-20, windowHeight); // each paragraph is 80 in height
  } 
  
  normalMaterial();
  push();

 translate(100, -200, 0.8);
  //  rotateX(0.8 * cos(frameCount * 0.01));
  //  rotateY(0.2 * sin(frameCount * 0.05));
  //  rotateZ(0.2 * sin(frameCount * 0.005));
  // rotateY(map(mouseX, 0, width, 0, 3));
    rotateX(x);
    rotateY(y);
    rotateZ(z);
  texture(rotateText);
  plane(windowWidth+300, windowHeight+300);
  pop();
}

function createParticleSystem(table){
  let xMax = 0;
  let xMin = 0;
  let yMax = 0;
  let yMin = 0;
  let zMax = 0;
  let zMin = 0;

  // first, create a bounding box around all points in the cloud
  for (let i = 1; i < table.getRowCount(); i+= 1){
    // parsefloat necessary to ensure values from file aren't compared as strings
    let x = parseFloat(table.get(i,6));
    let y = parseFloat(table.get(i,7));
    let z = parseFloat(table.get(i,8));

    if (x > xMax){
      xMax = x;
    }
    if (x < xMin){
      xMin = x;
    }
    if (y > yMax){
      yMax = y;
    }
    if (y < yMin){
      yMin = y;
    }
    if (z > zMax){
      zMax = z;
    }
    if (z < zMin){
      zMin = z;
    }
  }
 // console.log('xMax,xMin,yMax,yMin,zMax,zMin:',xMax,xMin,yMax,yMin,zMax,zMin);
  bbW = xMax-xMin;
  bbH = parseFloat(yMax-yMin,2);
  bbD = parseFloat(zMax-zMin,2);
 // console.log('w/h/d of bounding box: ',bbW,'/',bbH,'/',bbD);

  // use min/max values from bounding box to map everything around 0,0
  for (let i = 0; i < table.getRowCount(); i+= 1){
    
    let x = parseFloat(table.get(i,6));
    let y = parseFloat(table.get(i,7));
    let z = parseFloat(table.get(i,8));
    //console.log (x,y,z);
    // map around 0,0 without scaling values

    let scale = 4
    if (scaleUp ==1){
    scale = 4*(frameCount-getFrameCount)/100;
    }


    x = map(x, xMin,xMax,-bbW*scale,bbW*scale);
    y = map(y, yMin,yMax,-bbH*scale,bbH*scale);
    z = map(z, zMin,zMax,-bbD*scale,bbD*scale);
    stroke(random(100,255),128,128);
    strokeWeight(10);
    point (x,y,z);
  }
}