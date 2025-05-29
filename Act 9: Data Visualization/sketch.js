let data = [
  [1950, 2.5],
  [1960, 3.0],
  [1970, 3.7],
  [1980, 4.4],
  [1990, 5.3],
  [2000, 6.1],
  [2010, 6.9],
  [2020, 7.8],
  [2025, 8.2]
];

function setup() {
  createCanvas(1000, 600);
  textFont('Helvetica Neue');
  noLoop();
  noStroke();
}

function draw() {
  background(245);
  translate(100, height - 120);

  // Chart dimensions
  let chartHeight = 400;
  let chartWidth = width - 200;
  let barWidth = chartWidth / data.length;
  
  // Modern color palette
  let colors = [
    '#4C72B0', '#55A868', '#C44E52', 
    '#8172B2', '#CCB974', '#64B5CD'
  ];

  // Draw subtle grid lines
  stroke(230);
  strokeWeight(1);
  for (let p = 0; p <= 8; p++) {
    let y = map(p, 0, 8, 0, -chartHeight);
    line(0, y, chartWidth, y);
  }

  // Draw bars with modern styling
  for (let i = 0; i < data.length; i++) {
    let year = data[i][0];
    let population = data[i][1];
    let x = i * barWidth + barWidth * 0.15;
    let y = map(population, 0, 8, 0, -chartHeight);

    // Gradient fill for bars
    let gradient = drawingContext.createLinearGradient(0, 0, 0, y);
    gradient.addColorStop(0, colors[i % colors.length]);
    gradient.addColorStop(1, lighten(colors[i % colors.length], 30));
    drawingContext.fillStyle = gradient;
    
    // Modern bar with subtle shadow
    drawingContext.shadowColor = 'rgba(0,0,0,0.1)';
    drawingContext.shadowBlur = 8;
    drawingContext.shadowOffsetY = 3;
    
    rect(x, 0, barWidth * 0.7, y, 4);
    
    // Reset shadow
    drawingContext.shadowColor = 'transparent';
    
    // Value label above bars
    fill(80);
    textAlign(CENTER);
    textSize(12);
    text(population.toFixed(1) + "B", x + barWidth * 0.35, y - 20);
  }

  // Clean axis styling
  stroke(200);
  strokeWeight(1.5);
  line(0, 0, chartWidth, 0); // x-axis
  line(0, 0, 0, -chartHeight); // y-axis
  
  // Y-axis labels
  fill(120);
  textSize(12);
  textAlign(RIGHT, CENTER);
  for (let p = 0; p <= 8; p++) {
    let y = map(p, 0, 8, 0, -chartHeight);
    text(p + "B", -15, y);
  }

  // Year labels
  fill(100);
  textAlign(CENTER, TOP);
  textSize(12);
  for (let i = 0; i < data.length; i++) {
    let x = i * barWidth + barWidth * 0.35;
    text(data[i][0], x, 15);
  }

  // Chart title and labels
  fill(40);
  textSize(18);
  textAlign(CENTER);
  textStyle(BOLD);
  text("World Population Growth (1950-2025)", chartWidth/2, -chartHeight - 50);
  
  textSize(14);
  textStyle(NORMAL);
  text("Population in billions", -70, -chartHeight/2);
  text("Year", chartWidth/2, 50);
}

// Helper function to lighten colors
function lighten(col, amt) {
  let c = color(col);
  return color(red(c) + amt, green(c) + amt, blue(c) + amt);
}


