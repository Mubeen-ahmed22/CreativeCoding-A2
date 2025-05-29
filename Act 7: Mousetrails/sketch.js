let particles = [];
let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  // Create twinkling stars
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(0.5, 3),
      brightness: random(100, 255),
      speed: random(0.01, 0.05)
    });
  }
}

function draw() {
  // Dark cosmic background with fading effect
  background(10, 20, 30, 30); // Slight fade for motion blur
  
  // Draw twinkling stars
  for (let star of stars) {
    fill(255, star.brightness);
    circle(star.x, star.y, star.size);
    star.brightness += random(-5, 5); // Twinkle effect
    star.y += star.speed; // Slow drift downward
    
    // Reset stars that go off-screen
    if (star.y > height) star.y = 0;
  }
  
  // Create new particles at mouse position
  if (mouseIsPressed) {
    for (let i = 0; i < 5; i++) {
      particles.push({
        x: mouseX + random(-10, 10),
        y: mouseY + random(-10, 10),
        size: random(5, 15),
        color: color(
          random(150, 255),
          random(100, 200),
          random(200, 255),
          200
        ),
        life: 100,
        angle: random(TWO_PI),
        speed: random(0.5, 2)
      });
    }
  } else {
    // Default trail when not clicking
    particles.push({
      x: mouseX,
      y: mouseY,
      size: random(3, 8),
      color: color(
        (frameCount * 2) % 255,
        (frameCount * 3) % 255,
        255,
        150
      ),
      life: 80,
      angle: 0,
      speed: 0
    });
  }
  
  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    
    // Apply motion (spiral if clicked)
    if (mouseIsPressed) {
      p.x += cos(p.angle) * p.speed;
      p.y += sin(p.angle) * p.speed;
      p.angle += 0.1;
    }
    
    // Fade out
    p.life--;
    p.size *= 0.98;
    
    // Draw particle
    fill(p.color);
    circle(p.x, p.y, p.size);
    
    
    if (p.life <= 0 || p.size < 0.5) {
      particles.splice(i, 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}