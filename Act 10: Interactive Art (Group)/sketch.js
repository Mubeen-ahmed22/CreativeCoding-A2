let particles = [];
let messages = [
  "Welcome to Bath Spa University",
  "Explore our creative courses",
  "Discover our beautiful campuses",
  "Join our vibrant community"
];
let messageIndex = 0;
let showMessage = false;
let messageTimer = 0;
let hasInteracted = false;

function setup() {
  createCanvas(800, 600);
  noCursor();
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255);
}

function draw() {
  background(30, 30, 50, 50);

  // Create particle at mouse position
  particles.push(new Particle(mouseX, mouseY));

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }

  // Prompt message before interaction
  if (!hasInteracted) {
    fill(200);
    text("Click anywhere to begin", width / 2, height / 2 + 100);
  }

  // Display message if active
  if (showMessage) {
    fill(255);
    text(messages[messageIndex], width / 2, height / 2);
    if (millis() - messageTimer > 3000) {
      showMessage = false;
    }
  }
}

function mousePressed() {
  if (!hasInteracted) {
    hasInteracted = true;
  }
  showMessage = true;
  messageTimer = millis();
  messageIndex = (messageIndex + 1) % messages.length;
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 3));
    this.acc = createVector(0, 0);
    this.lifetime = 255;
  }

  finished() {
    return this.lifetime < 0;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifetime -= 5;
  }

  show() {
    noStroke();
    fill(255, this.lifetime);
    ellipse(this.pos.x, this.pos.y, 8);
  }
}