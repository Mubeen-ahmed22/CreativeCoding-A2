let quote = "True friendship is a rare flower that blooms in adversity";
let words = [];
let bgColor;

function setup() {
  createCanvas(1000, 1000);
  bgColor = color(20, 30, 50);
  textSize(32);
  
  // Split quote into words and position them properly
  let parts = quote.split(' ');
  let x = 150;
  let y = 300;
  
  for (let i = 0; i < parts.length; i++) {
    words.push({
      text: parts[i],
      x: x,
      y: y,
      size: 36,
      baseX: x,
      baseY: y,
      color: color(150 + i*15, 200 - i*10, 220),
      rotation: 0,
      scale: 1
    });
    x += textWidth(parts[i] + ' ');
    
    // Move to next line if needed
    if (x > width - 150 && i < parts.length - 1) {
      x = 150;
      y += 80;
    }
  }
}

function draw() {
  background(bgColor);
  
  // Draw floating hearts in background
  for (let i = 0; i < 5; i++) {
    let x = (frameCount * 2 + i * 200) % (width + 100) - 50;
    let y = height/2 + sin(frameCount * 0.02 + i) * 300;
    drawHeart(x, y, 15, color(255, 100, 100, 50));
  }
  
  // Draw words with subtle animations
  for (let word of words) {
    let d = dist(mouseX, mouseY, word.x, word.y);
    let hover = d < 50;
    
    push();
    translate(word.x, word.y);
    
    if (hover) {
      word.rotation = sin(frameCount * 0.1) * 0.2;
      word.scale = lerp(word.scale, 1.3, 0.1);
      fill(255, 255, 0);
    } else {
      word.rotation = lerp(word.rotation, 0, 0.1);
      word.scale = lerp(word.scale, 1, 0.1);
      fill(word.color);
    }
    
    rotate(word.rotation);
    scale(word.scale);
    text(word.text, 0, 0);
    pop();
  }
}

function drawHeart(x, y, size, col) {
  push();
  fill(col);
  noStroke();
  beginShape();
  vertex(x, y);
  bezierVertex(x - size, y - size/2, x - size, y + size/3, x, y + size);
  bezierVertex(x + size, y + size/3, x + size, y - size/2, x, y);
  endShape(CLOSE);
  pop();
}

function mousePressed() {
  // Change background color
  bgColor = color(random(30, 60), random(30, 60), random(70, 100));
  
  // Gentle bounce effect on words
  for (let word of words) {
    word.y = word.baseY + random(-20, 20);
  }
}

function keyPressed() {
  // Reset positions
  for (let word of words) {
    word.y = word.baseY;
  }
}