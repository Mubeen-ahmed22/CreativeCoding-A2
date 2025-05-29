function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(20, 20, 40);

  // Alien body
  fill(80, 250, 100);
  ellipse(200, 250, 100, 150);

  // Alien head
  fill(80, 250, 100);
  ellipse(200, 150, 80, 100);

  // Eyes
  fill(0);
  ellipse(185, 140, 15, 30);
  ellipse(215, 140, 15, 30);

  // Antennas
  stroke(80, 250, 100);
  strokeWeight(4);
  line(200, 100, 180, 70);
  line(200, 100, 220, 70);

  fill(255, 0, 100);
  noStroke();
  ellipse(180, 70, 10, 10);
  ellipse(220, 70, 10, 10);

  // Alien arms
  stroke(80, 250, 100);
  strokeWeight(10);
  line(150, 250, 100, 200);
  line(250, 250, 300, 200);

  // Mouth
  noStroke();
  fill(255);
  arc(200, 170, 30, 20, 0, PI);
}
