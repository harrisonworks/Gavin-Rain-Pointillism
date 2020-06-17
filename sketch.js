let img;
let ringSize,
  ringNumber,
  ringScale,
  colorSampleRange,
  ringSpacing,
  ringInterval;
let canvasScale = 10;

function preload() {
  img = loadImage("data/nan-closeup-2.png");
}

function setup() {
  createCanvas(img.width * canvasScale, img.height * canvasScale);

  // Initialize random pointerlism parameters
  ringSize = round(random(20, 50));
  ringNumber = 3;
  ringScale = random(0.78, 0.92);
  colorSampleRange = round(random(3, 8));
  ringSpacing = ringSize * 1.5;
  ringInterval = ringSize / canvasScale;

  noLoop();
}

function draw() {
  background(255);

  // Run through every pixel of portrait image
  let yCount = 0;
  for (let ringY = 0; ringY < img.height; ringY += ringInterval) {
    let posY = map(ringY, 0, img.height, ringSpacing, height - ringSpacing);
    for (let ringX = 0; ringX < img.width; ringX += ringInterval) {
      let posX;
      if (yCount % 2 == 0) {
        posX = map(ringX, 0, img.width, ringSpacing, width - ringSpacing);
      } else {
        posX = map(
          ringX,
          0,
          img.width,
          ringSpacing * 1.25,
          width - ringSpacing / 1.25
        );
      }

      // get current color
      let colorSample = color(img.get(ringX, ringY));

      // brightness conversion
      let brightness = round(
        red(colorSample) * 0.222 +
          green(colorSample) * 0.707 +
          blue(colorSample) * 0.071
      );

      // pixel color to fill, brightness to ellipse size
      let sizeScale = map(
        brightness,
        255,
        0,
        ringSize * 0.7,
        ringSize * ringScale,
        true
      );

      pointillismPoint(ringX, ringY, posX, posY, sizeScale, ringNumber);
    }

    yCount++;
  }
}

function pointillismPoint(gridX, gridY, xPos, yPos, size, circleNum) {
  noStroke();

  for (let index = 0; index < circleNum; index++) {
    let randomSampleX =
      gridX + random(-size / colorSampleRange, size / colorSampleRange);
    let randomSampleY =
      gridY + random(-size / colorSampleRange, size / colorSampleRange);

    let samplePoint = color(img.get(randomSampleX, randomSampleY));

    // every second loop alternate the color of the ellipse
    fill(samplePoint);
    // Calculate the size of the ellipse needed in each loop
    let currentSize = size - (index * size) / circleNum;
    ellipse(xPos, yPos, currentSize);
  }
}

// function keyPressed() {
//   saveCanvas(millis(), "png");
// }

function mousePressed() {
  ringSize = round(random(20, 50));
  ringNumber = 3;
  ringScale = random(0.78, 0.92);
  colorSampleRange = round(random(3, 8));
  ringSpacing = ringSize * 1.5;
  ringInterval = ringSize / canvasScale;

  loop();
}
