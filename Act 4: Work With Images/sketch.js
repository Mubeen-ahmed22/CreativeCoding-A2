let scenery;
const levels = 5;  

function preload() {
  scenery = loadImage('mountains.png'); 
}

function setup() {
  createCanvas(400, 400);
  scenery.resize(400, 400);
  scenery.loadPixels();

  for (let y = 0; y < scenery.height; y++) {
    for (let x = 0; x < scenery.width; x++) {
      let index = (x + y * scenery.width) * 4;

      // Get original colors
      let r = scenery.pixels[index];
      let g = scenery.pixels[index + 1];
      let b = scenery.pixels[index + 2];

      // Apply posterize on each channel
      scenery.pixels[index] = posterizeChannel(r, levels);
      scenery.pixels[index + 1] = posterizeChannel(g, levels);
      scenery.pixels[index + 2] = posterizeChannel(b, levels);
      // Keep alpha the same
    }
  }

  scenery.updatePixels();
  image(scenery, 0, 0);
}

// Helper function to posterize a single color channel
function posterizeChannel(value, levels) {
  let step = 255 / (levels - 1);
  return Math.round(value / step) * step;
}
