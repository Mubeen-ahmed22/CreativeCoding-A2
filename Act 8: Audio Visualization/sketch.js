let fft;
let song;
let fireParticles = [];
let wavePoints = [];
let bgColor;

function preload() {
  // Replace with your audio file
  song = loadSound("drums.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  noStroke();
  
  // Initialize audio analysis
  fft = new p5.FFT();
  song.loop();
  fft.setInput(song);
  
  // Background color (light orange)
  bgColor = color(30, 80, 95);
  
  // Initialize wave points
  for (let i = 0; i <= width; i += 10) {
    wavePoints.push({
      x: i,
      y: height * 0.7,
      offset: random(100)
    });
  }
}

function draw() {
  // Fading background for motion blur
  background(bgColor);
  
  // Analyze audio
  let spectrum = fft.analyze();
  let bass = fft.getEnergy("bass");
  let treble = fft.getEnergy("treble");
  let amp = fft.getEnergy(20, 200) / 255;
  
  // ======================
  // WAVE VISUALIZATION
  // ======================
  let waveHeight = map(bass, 0, 255, 20, 100);
  let waveSpeed = map(treble, 0, 255, 0.01, 0.05);
  
  beginShape();
  fill(30, 40, 100, 0.3);
  for (let i = 0; i < wavePoints.length; i++) {
    let p = wavePoints[i];
    // Create wave motion with Perlin noise
    let noiseVal = noise(p.offset + frameCount * waveSpeed);
    p.y = height * 0.7 + (noiseVal - 0.5) * waveHeight;
    
    // Make waves react differently to frequency ranges
    if (i % 3 === 0) p.y += sin(frameCount * 0.1) * (treble/50);
    if (i % 5 === 0) p.y -= cos(frameCount * 0.07) * (bass/80);
    
    curveVertex(p.x, p.y);
    p.offset += 0.02;
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  // ======================
  // FIRE VISUALIZATION
  // ======================
  // Generate new fire particles
  if (frameCount % 2 === 0) {
    for (let i = 0; i < 3 * (1 + amp); i++) {
      fireParticles.push({
        x: random(width/2 - 100, width/2 + 100),
        y: height,
        size: random(5, 15) * (1 + amp),
        speed: random(-2, -5) * (1 + bass/255),
        life: 100,
        hue: random(10, 30), // Orange-red hues
        brightness: random(80, 100)
      });
    }
  }
  
  // Update and draw fire particles
  for (let i = fireParticles.length - 1; i >= 0; i--) {
    let p = fireParticles[i];
    
    // Move particles
    p.x += random(-1, 1) * (1 + treble/255);
    p.y += p.speed;
    p.life -= 1.5;
    p.size *= 0.98;
    
    // Flicker effect based on treble
    let flicker = sin(frameCount * 0.2 + i) * 10;
    
    // Draw particle
    fill(p.hue, 90, p.brightness + flicker, p.life/100);
    ellipse(p.x, p.y, p.size);
    
    // Remove dead particles
    if (p.life <= 0 || p.size < 0.5) {
      fireParticles.splice(i, 1);
    }
  }
  
  // Draw fire base (more intense with bass)
  let baseHeight = map(bass, 0, 255, 50, 150);
  for (let x = 0; x < width; x += 10) {
    let noiseVal = noise(x * 0.01, frameCount * 0.05);
    let yOffset = noiseVal * baseHeight;
    let hueVal = map(x, 0, width, 10, 25);
    fill(hueVal, 90, 90);
    rect(x, height - baseHeight + yOffset, 12, baseHeight - yOffset);
  }
  
  // Draw frequency spectrum as colored bars at top
  let spectrumWidth = width / spectrum.length;
  for (let i = 0; i < spectrum.length; i++) {
    let h = map(spectrum[i], 0, 255, 0, 50);
    let hue = map(i, 0, spectrum.length, 10, 40);
    fill(hue, 90, 90);
    rect(i * spectrumWidth, 0, spectrumWidth, h);
  }
}

function mousePressed() {
  // Toggle play/pause when clicked
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}