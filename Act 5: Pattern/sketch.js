let spacing = 40;
let cols, rows;
let zOffset;

function setup() {
  createCanvas(400, 400);
  noLoop(); // No animation, draw once
  background(245);
  strokeWeight(2);
  noFill();

  cols = floor(width / spacing);
  rows = floor(height / spacing);

  // Random seed + noise offset make each pattern unique
  noiseSeed(floor(random(10000)));
  zOffset = random(1000);

  drawPattern();
}

function drawPattern() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let px = x * spacing + spacing / 2;
      let py = y * spacing + spacing / 2;

      let angle = noise(x * 0.15, y * 0.15, zOffset) * TWO_PI * 2;
      let len = map(noise(x * 0.2, y * 0.2, zOffset), 0, 1, 10, 30);

      push();
      translate(px, py);
      rotate(angle);

      // Clean modern color variation (gray to teal)
      stroke(lerpColor(color('#333'), color('#1abc9c'), noise(x, y, zOffset)));
      line(-len / 2, 0, len / 2, 0);
      pop();
    }
  }
}

