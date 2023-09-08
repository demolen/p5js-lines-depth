let noiseOffset = 0.0;
let maxRecursions = 500; // Maximum levels of recursion

function setup() {
  createCanvas(800, 600);
  background(0);
  noLoop();
}

function draw() {
  stroke(255);
  fill(100, 100, 250, 150);
  for (let i = 0; i < 10; i++) {
    // Generate random starting points for polygons
    let x = random(width);
    let y = random(height);
    drawPolygon(x, y, 50, 5, 0);
  }
}

function drawPolygon(x, y, radius, sides, recursionLevel) {
  // Draw the polygon
  beginShape();
  for (let i = 0; i < TWO_PI; i += TWO_PI / sides) {
    let xVertex = x + cos(i) * radius;
    let yVertex = y + sin(i) * radius;
    vertex(xVertex, yVertex);
  }
  endShape(CLOSE);

  // Stop if we reached the recursion limit
  if (recursionLevel >= maxRecursions) {
    return;
  }

  // Generate new positions for smaller polygons using Perlin noise
  let newX = x + map(noise(noiseOffset), 0, 1, -20, 20);
  let newY = y + map(noise(noiseOffset + 10), 0, 1, -20, 20);
  noiseOffset += 0.1;

  // Recursive call to draw a smaller polygon
  drawPolygon(newX, newY, radius * 0.7, sides, recursionLevel + 1);
}
