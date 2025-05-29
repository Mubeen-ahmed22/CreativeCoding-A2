let neurons = [];
let bloomForce = 0;
let audioInput;
let fft;
let isAudioActive = false;
let colorHarmony = [];
let currentPalette = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  smooth();
  
  // Initialize audio analysis (optional)
  audioInput = new p5.AudioIn();
  fft = new p5.FFT();
  
  // Generate initial neurons
  for (let i = 0; i < 50; i++) {
    neurons.push(new Neuron());
  }
  
  // Predefined harmonic color palettes
  colorHarmony = [
    [color(10, 90, 100), color(200, 80, 70), color(300, 60, 90)], // Warm/Cool contrast
    [color(180, 100, 80), color(30, 100, 100), color(270, 80, 60)], // Triadic
    [color(0, 0, 100), color(120, 100, 80), color(240, 100, 80)], // Monochrome + accents
    [color(30, 100, 100), color(200, 100, 50), color(330, 100, 80)] // Vibrant clash
  ];
}

function draw() {
  background(0, 0, 10, 0.1); // Semi-transparent for motion blur
  
  // Audio reactivity (if enabled)
  if (isAudioActive) {
    fft.analyze();
    let bass = fft.getEnergy(20, 150);
    bloomForce = map(bass, 0, 255, 0, 50);
  }
  
  // Update and display neurons
  for (let neuron of neurons) {
    neuron.update();
    neuron.display();
  }
  
  // Bloom effect on mouse press
  if (mouseIsPressed) {
    push();
    fill(colorHarmony[currentPalette][0]);
    blendMode(SCREEN);
    ellipse(mouseX, mouseY, bloomForce * 10, bloomForce * 10);
    pop();
  }
  
  // Instructions
  fill(255);
  noStroke();
  textSize(14);
  text("CLICK: Bloom | KEYS 1-4: Color Palettes | 'A': Toggle Audio | 'R': Reset", 20, 30);
}

function mousePressed() {
  bloomForce = 30; // Trigger bloom
  for (let neuron of neurons) {
    let d = dist(mouseX, mouseY, neuron.pos.x, neuron.pos.y);
    if (d < 200) {
      neuron.vel.add(p5.Vector.random2D().mult(5));
    }
  }
}

function keyPressed() {
  // Change color palette
  if (key >= '1' && key <= '4') {
    currentPalette = int(key) - 1;
  }
  
  // Toggle audio reactivity
  if (key === 'a' || key === 'A') {
    isAudioActive = !isAudioActive;
    if (isAudioActive) {
      audioInput.start();
    } else {
      audioInput.stop();
    }
  }
  
  // Reset simulation
  if (key === 'r' || key === 'R') {
    neurons = [];
    for (let i = 0; i < 50; i++) {
      neurons.push(new Neuron());
    }
  }
}

// Neuron class
class Neuron {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(0.5);
    this.acc = createVector();
    this.size = random(5, 15);
    this.branches = [];
    this.maxSpeed = 2;
    this.hue = random(360);
  }
  
  update() {
    // Mouse interaction (repel)
    let mouseDist = dist(this.pos.x, this.pos.y, mouseX, mouseY);
    if (mouseDist < 150) {
      let force = map(mouseDist, 0, 150, -1, 0);
      let dir = createVector(this.pos.x - mouseX, this.pos.y - mouseY);
      dir.normalize();
      dir.mult(force * 2);
      this.acc.add(dir);
    }
    
    // Random organic movement
    this.acc.add(p5.Vector.random2D().mult(0.05));
    
    // Apply velocity & limit speed
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    // Wrap around edges
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }
  
  display() {
    // Draw neuron core
    let col = colorHarmony[currentPalette][floor(random(3))];
    fill(col);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
    
    // Draw subtle glow
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(hue(col), saturation(col), brightness(col), 0.5);
    
    // Draw connections to nearby neurons
    for (let other of neurons) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (d < 100 && random() > 0.7) {
        stroke(hue(col), 50, 100, 0.3);
        line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}