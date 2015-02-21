
window.addEventListener("load", function () {
// Setup
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 500;
document.body.appendChild(canvas);
var phi = 1.618;

var Pen = {
  lengths: [],
  periods: [],
  radii: [],
  radius: 5,
  speed: 1,
  amplitude: Math.PI / 6,
  gravity: 300,
  count: 12,
  size: 400,
  foreground: "#000000",
  background: "#ffffff"
};

// Functions
function fibb(n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  return fibb(n-1) + fibb(n-2);
}

function drawPendulum(length, radius, theta) {
  ctx.save();
  ctx.fillStyle = Pen.foreground;
  ctx.strokeStyle = Pen.foreground;
  ctx.lineWidth = 1;
  ctx.translate(canvas.width/2, 50);
  ctx.rotate(Math.PI/2);
  
  var x = length * Math.cos(theta);
  var y = length * Math.sin(theta);
  
  // Rope
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(x, y);
  ctx.stroke();
  
  // Ball
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fill();
  
  ctx.restore();
}

function animate() {
  
  ctx.fillStyle = Pen.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  var k = 2 * Math.PI;
  var t = Pen.speed * Date.now() / 10000;
  var L, T, theta;
  
  for (var i = Pen.lengths.length-1; i >= 0; i--) {
    L = Pen.lengths[i];
    T = Pen.periods[i];
    theta = Pen.amplitude * Math.sin(k * t / T);
    drawPendulum(L, Pen.radii[i], theta);
  }
}

function pendulumAnimation(opts) {
  var psi = phi - 1;
  var L, T, R, F;
  
  for (var i = 0; i < Pen.count; i++) {
  	// L = Pen.size * Math.pow(psi, i) + 30;
  	// T = 2 * Math.PI * Math.sqrt(L / Pen.gravity)
  	R = Pen.radius * Math.pow(1-(1-psi)/5, i);
  	F = i + 3;
  	T = 1 / F;
  	L = Pen.size * Pen.gravity * Math.pow(T / (2 * Math.PI), 2)
    Pen.lengths.push(L);
    Pen.periods.push(T);
    Pen.radii.push(R);
  }

  // Pen.radii.push(Pen.radius);
  // for (i = 1; i < Pen.count; i++) {
  // 	R = Pen.radii[i-1] * Math.sqrt(Pen.lengths[i] / Pen.lengths[i-1]);
  // 	Pen.radii.push(R);
  // }
  animate();
  console.log(Pen);
}

pendulumAnimation();
});
