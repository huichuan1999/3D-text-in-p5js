//鼠标左键旋转画面，按住鼠标中键平移画面
//原始版本：https://editor.p5js.org/huichuan1999/sketches/Mz1FbBpJR 
//使用json文件加入文本的版本：https://editor.p5js.org/huichuan1999/sketches/kphEC9R9a 
//将需要的段落粘贴到json文件里， 在这里我将每个空格“ ”作为单词之间的分隔符，将每个句号“.”号作为句子之间的分隔符。文本的末尾不要有空格，不然会将这个空格识别为一个单独的句子增加一个空旋臂
//每一句话都是一个单独的旋臂，比如，两句话，是双螺旋，三句话，就是三螺旋。

let jsonData;
let sentencesArray = []; //将句子们存储在这里
let graphicsArray = []; //将每个独立的单词存放在这里
let wordWidths = [];     // 存储每一个单词的宽度用于绘制graphics和planes
let easycam;
let angle = 0;
let radius = 200;
let speed = 0.02;
let spiralCount;

function preload() {
  jsonData = loadJSON('json/Revision1.json');
}

function setup() {
  createCanvas(1000, 600, WEBGL);
  frameRate(60);
  //textSize(20);
  //text('initializing...', 0, 0);

  let rawText = jsonData.text;
  let sentences = rawText.split(". "); //用句号来分割每个句子
  spiralCount = sentences.length;

  for (let i = 0; i < sentences.length; i++) {
    let words = sentences[i].split(" ");
    sentencesArray.push(words);
  
    let graphics = [];
    let widths = []; // 为每个句子创建一个新的宽度数组
  
    for (let word of words) {
      let wordWidth = textWidth(word);
      //let gr = createGraphics(wordWidth, 30); //试图让每一个graphic的宽度等于每个单词的宽度，但是没有成功
      let gr = createGraphics(120, 30);
      console.log(wordWidth);
      gr.textSize(20);
      gr.textAlign(CENTER, CENTER);
      gr.text(word, gr.width / 2, gr.height / 2);
  
      graphics.push(gr);
      widths.push(wordWidth);
    }
  
    graphicsArray.push(graphics);
    wordWidths.push(widths); // 将这个句子的宽度数组添加到wordWidths中
  }
  easycam = createEasyCam();
}

function draw() {
  background(250);
  let camPos = easycam.getPosition();
  let state = easycam.getState();
  let rotation = state.rotation;

  let angleStep = TWO_PI / spiralCount; // 每个螺旋的角度间隔

  for (let i = 0; i < graphicsArray.length; i++) {
    let spiralAngle = angleStep * i; // 每个螺旋的起始角度，在圆周上等分
    let directionMultiplier = i % 2 == 0 ? 1 : -1; // 相邻螺旋方向相反（顺时针和逆时针）

    for (let j = 0; j < graphicsArray[i].length; j++) {
      let offset = j * 50;
      let z = offset;
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
      plane(120, 30);
      pop();
    }
  }

  angle += speed;
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