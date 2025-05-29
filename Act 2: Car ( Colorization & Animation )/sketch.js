let carX = 0;
let carY = 0;
let carSpeed = 5;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(255); // plain white background

  // Arrow key movement
  if (keyIsDown(LEFT_ARROW)) carX -= carSpeed;
  if (keyIsDown(RIGHT_ARROW)) carX += carSpeed;
  if (keyIsDown(UP_ARROW)) carY -= carSpeed;
  if (keyIsDown(DOWN_ARROW)) carY += carSpeed;

  // Road
  fill(30);
  rect(0, 300, width, 100);

  // Draw car
  drawCar(carX, carY);
}

function drawCar(x, y) {
  // Shadow
  fill(0, 80);
  noStroke();
  ellipse(x + 300, y + 315, 330, 35);

  // Body
  fill(0, 140, 255); // Blue color
  noStroke();
  beginShape();
  vertex(x + 130, y + 300);
  bezierVertex(x + 160, y + 260, x + 250, y + 230, x + 320, y + 230);
  bezierVertex(x + 390, y + 230, x + 470, y + 260, x + 500, y + 300);
  endShape(CLOSE);

  // Roof
  fill(10, 60, 100);
  beginShape();
  vertex(x + 220, y + 250);
  bezierVertex(x + 260, y + 240, x + 380, y + 240, x + 420, y + 250);
  vertex(x + 420, y + 270);
  bezierVertex(x + 370, y + 260, x + 280, y + 260, x + 220, y + 270);
  endShape(CLOSE);

  // Front wheel
  fill(40);
  ellipse(x + 220, y + 305, 65, 60);
  fill(30);
  ellipse(x + 220, y + 305, 50, 45);
  fill(180);
  ellipse(x + 220, y + 305, 15, 15);
  for (let i = 0; i < 5; i++) {
    push();
    translate(x + 220, y + 305);
    rotate(i * TWO_PI / 5);
    rect(0, -3, 25, 6);
    pop();
  }

  // Rear wheel
  fill(40);
  ellipse(x + 430, y + 305, 75, 70);
  fill(30);
  ellipse(x + 430, y + 305, 60, 55);
  fill(180);
  ellipse(x + 430, y + 305, 20, 20);
  for (let i = 0; i < 6; i++) {
    push();
    translate(x + 430, y + 305);
    rotate(i * TWO_PI / 6);
    rect(0, -4, 30, 8);
    pop();
  }

  // Headlights
  fill(255, 250, 200);
  ellipse(x + 145, y + 280, 20, 8);

  // Taillights
  fill(255, 60, 40);
  rect(x + 485, y + 280, 15, 8);
}