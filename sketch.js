//鼠标左键旋转画面，鼠标中键或者按住ctrl平移

let angle = 0;
let radius = 100; // 可以增加这个值让两个螺旋之间的距离更远
let speed = 0.02;
let ballCount = 40; //有多少个
let spacing;
let easycam;

let title;
let textContent = "hello world";//在这里改文字内容
let textLength;

let spiralCount = 1; 

function setup() {
  createCanvas(1000, 600, WEBGL);
  frameRate(60);
  
  title = createGraphics(200,100);
  title.textAlign(CENTER);
  title.textSize(20);
  title.textFont("Inter");
  
  textLength = title.textWidth(textContent); // 计算文字长度
  //title = createGraphics(textLength,100);
  spacing = textLength/2; // 除以2是两个螺旋，除以3是三个螺旋

  easycam = createEasyCam();
}
function draw() {
  background(250);
  sphere(3); // 原点
  
  let camPos = easycam.getPosition(); // 获取摄像机位置
  
  title.clear();
  title.text(textContent, title.width/2, title.height/2);
  
  let state = easycam.getState();//get摄像机的角度
  let rotation = state.rotation;

  for (let i = 0; i < ballCount; i++) {
    let offset = i * spacing;
    let spiralIndex = i % spiralCount; // 确定当前平面属于哪个螺旋
    let z = offset/3; // 计算z轴坐标, 文字和文字之间的间距
    
    // 使用不同的方向旋转每个螺旋
    let angleOffset = spiralIndex === 0 ? angle + offset : -angle - offset;
    let x = radius * cos(angleOffset);
    let y = radius * sin(angleOffset);
    
    normalMaterial();
    push();
    translate(x, y, z);

    let target = createVector(camPos[0], camPos[1], camPos[2]);
    let dir = target.sub(createVector(x, y, z));
    let up = createVector(0, 1, 0);
    applyMatrix(...lookAt(dir, up));
    
    texture(title);
    plane(textLength, 30);
    pop();
  }

  angle += speed;
}


// 计算LookAt矩阵 让它们旋转的时候面向观众
function lookAt(direction, up) {
  let z = direction.copy().normalize();
  let x = up.copy().cross(z).normalize();
  let y = z.copy().cross(x);

  // 创建并返回一个适用于applyMatrix的数组
  return [
    x.x, x.y, x.z, 0,
    y.x, y.y, y.z, 0,
    z.x, z.y, z.z, 0,
    0,   0,   0,   1
  ];
}
