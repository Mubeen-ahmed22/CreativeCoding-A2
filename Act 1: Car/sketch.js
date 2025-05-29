function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(220);
  
  // Car Body
  fill(0, 102, 204);
  rect(100, 100, 150, 50, 10);
  
  // Car Roof
  fill(0, 153, 255);
  rect(130, 70, 90, 40, 10);
  
  // Wheels
  fill(0);
  ellipse(120, 150, 30, 30);
  ellipse(230, 150, 30, 30);
}