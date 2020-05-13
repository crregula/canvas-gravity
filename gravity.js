var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var colorArray = ["#23303B", "#385D84", "#AED3F2", "#F2F2F2", "#E77557"];

const gravity = 1;
const friction = 0.9;

window.addEventListener("resize", function (event) {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;

     init();
});

window.addEventListener("click", function () {
     init();
});

function randomIntFromRange(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
     return colors[Math.floor(Math.random() * colors.length)];
}

// x: x-coordinate, y: y-coordinate, r: radius, w: weight
function Ball(x, y, dx, dy, radius, color) {
     this.x = x;
     this.y = y;
     this.dx = dx;
     this.dy = dy;
     this.radius = radius;
     this.color = color;

     this.update = function () {
          if (this.y + this.radius + this.dy > canvas.height) {
               this.dy = -this.dy * friction;
          } else {
               this.dy += gravity;
          }

          if (
               this.x + this.radius + this.dx > canvas.width ||
               this.x - this.radius < 0
          ) {
               this.dx = -this.dx;
          }

          this.x += this.dx;
          this.y += this.dy;
          this.draw();
     };

     this.draw = function () {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
     };
}

var ball;
var ballArray = [];
function init() {
     //ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, "red");
     ballArray = [];
     for (let i = 0; i < 100; i++) {
          let radius = randomIntFromRange(10, 50);
          let x = randomIntFromRange(radius, canvas.width - radius);
          let y = randomIntFromRange(0, canvas.height - radius);
          let dx = randomIntFromRange(-2, 2);
          let dy = randomIntFromRange(-2, 2);
          let color = randomColor(colorArray);
          ballArray.push(new Ball(x, y, dx, dy, radius, color));
     }
}

function animate() {
     requestAnimationFrame(animate);
     ctx.clearRect(0, 0, canvas.width, canvas.height);

     //ball.update();
     for (let i = 0; i < ballArray.length; i++) {
          ballArray[i].update();
     }
}

init();
animate();
