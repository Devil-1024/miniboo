// 设置画布

const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

const width = canvas.width = 1550;      //限定宽度留白方便展示字体和其他

const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {

  const num = Math.floor(Math.random() * (max - min)) + min;  //max - min最大和最小的差值随机，再加上最小值得到随机数
  return num;

}


function randomColor() {       //随机小球为任意颜色
  return (
    "rgb(" +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ")"
  );
}


function Ball(x, y, velX, velY, color, size) {    //定义小球的基础参数方便之后设置
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function () {
  ctx.beginPath();

  ctx.fillStyle = this.color;

  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);

  ctx.fill();
};

Ball.prototype.update = function () {        //判断更新小球位置造成小球在画布上碰壁反向移动
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};


Ball.prototype.collisionDetect = function () {                 //增加小球之间的碰撞改色,并且相对于示例增加碰撞转向的功能，在loop函数中调用
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
        this.x += this.velX;
        this.y += this.velY;
      }
    }
  }
};

let balls = [];

while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size,
  );
  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgb(128, 232, 240)";      //将整个画布的颜色设置成自己喜欢的青色
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();                    //增加小球之间碰撞的效果
  }

  requestAnimationFrame(loop);
}

loop();

