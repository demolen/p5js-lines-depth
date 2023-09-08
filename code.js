let maxDepth = 9000;
let scaleFactor = 0.7;
let offsetFactor = 50;

function setup() {
  createCanvas(600, 600);
  background(255);

  // Draw initial random lines
  for (let i = 0; i < 10; i++) {
    let x1 = random(width);
    let y1 = random(height);
    let x2, y2;
    if (random(1) > 0.5) {
      // Draw horizontal line
      x2 = random(width);
      y2 = y1;
    } else {
      // Draw vertical line
      x2 = x1;
      y2 = random(height);
    }
    drawPerspectiveLine(x1, y1, x2, y2, maxDepth);
  }
}

function drawPerspectiveLine(x1, y1, x2, y2, depth) {
  if (depth == 0) return;

  // Draw the original line
  stroke(0);
  line(x1, y1, x2, y2);

  // Calculate length and angle
  let dx = x2 - x1;
  let dy = y2 - y1;

  // If the line is vertical
  if (dx === 0) {
    let newLength = dy * scaleFactor;
    let newX = x1 + offsetFactor;
    let newY1 = y1 + (dy - newLength) / 2;
    let newY2 = newY1 + newLength;
    drawPerspectiveLine(newX, newY1, newX, newY2, depth - 1);
  }

  // If the line is horizontal
  if (dy === 0) {
    let newLength = dx * scaleFactor;
    let newY = y1 + offsetFactor;
    let newX1 = x1 + (dx - newLength) / 2;
    let newX2 = newX1 + newLength;
    drawPerspectiveLine(newX1, newY, newX2, newY, depth - 1);
  }
}
