let beeImg;
let sunflowerImg;
let budImg;
let backgroundImg;
let beeX = 0;
let beeY = 0;
let sunflowers = [];
let budX = [];
let budY = [];
let score = 0;
let goImg;
let restartImg;
let gameOver = false;
let gameContinue = false;
let endSound;
let collectSound;
let gameOverImg; // Variable to hold the game over image
let startImg; // Variable to hold the start image
let gameStarted = false; // Variable to track if the game has started
let titleImg; // Variable to hold the title image
let bee1Img; // Variable to hold the bee1 image

function preload() {
  // Load images
  beeImg = loadImage('bee.gif');
  sunflowerImg = loadImage('sunflower.gif');
  budImg = loadImage('bud.gif');
  backgroundImg = loadImage('background.jpg');
  goImg = loadImage('go.png');
  restartImg = loadImage('restart.png');
  gameOverImg = loadImage('gameover.png'); // Load game over image
  startImg = loadImage('start.png'); // Load start image
  titleImg = loadImage('title.png'); // Load title image
  bee1Img = loadImage('bee1.png'); // Load bee1 image
  
  // Load sounds
  endSound = loadSound('end.mp4');
  collectSound = loadSound('collect.mp3');
}

function setup() {
  createCanvas(1280, 720);
  startGame();
}

function startGame() {
  sunflowers = [];
  score = 0;
  gameOver = false;
  gameContinue = false;
  generateSunflowers();
  // Calculate position for bud images
  budX = [width / 2 - 75, 300, 900];
  budY = [height / 2 - 75, 450, 450];
}

function generateSunflowers() {
  for (let i = 0; i < 5; i++) {
    let sunflowerX = random(width - 100);
    let sunflowerY = random(200, height - 100); // Ensure y is more than 200
    sunflowers.push({ x: sunflowerX, y: sunflowerY, scored: false });
  }
}

function draw() {
  if (gameStarted) {
    if (!gameOver && !gameContinue) {
      // Draw the background image
      image(backgroundImg, 0, 0, width, height);

      // Draw bee image at mouse position
      image(beeImg, beeX, beeY, 100, 100);

      // Draw sunflower images at random positions within the canvas
      for (let i = 0; i < sunflowers.length; i++) {
        let sunflower = sunflowers[i];
        image(sunflowerImg, sunflower.x, sunflower.y, 100, 100);

        // Check for collision between bee and sunflower
        if (!sunflower.scored && collideRectRect(beeX, beeY, 100, 100, sunflower.x+50, sunflower.y+50, 20, 20)) {
          sunflower.scored = true;
          score += 100;
          // Play the collect sound
          collectSound.play();
        }
      }

      // Draw bud images
      for (let i = 0; i < budX.length; i++) {
        image(budImg, budX[i], budY[i], 150, 150);
      }

      // Check if bee touches any of the buds
      for (let i = 0; i < budX.length; i++) {
        if (collideRectRect(beeX, beeY, 100, 100, budX[i] + 75, budY[i] + 75, 0, 0)) {
          gameOver = true;
          // Play the end sound
          endSound.play();
        }
      }

      // Display the score
      fill(0);
      textSize(32);
      text('Score: ' + score, 10, 40);

      // Check if all sunflowers are scored
      if (sunflowers.every(sunflower => sunflower.scored)) {
        gameContinue = true;
      }

    } else if (gameContinue) {
      // Draw the 'go' image for continuation
      image(goImg, 0, 90, 150, 75);
    } else if (gameOver) {
      // Draw black background
      background(0);
      // Display the game over image
      image(gameOverImg, width/2-150, height/2-300, 300, 300);
      // Display the score
      fill(255);
      textSize(32);
      text('Your Score: ' + score, width / 2 - 100, height / 2 + 100);
      // Display the restart image
      image(restartImg, width / 2 - 75, height / 2 + 150, 150, 75); // Adjust position and size as needed
    }
  } else {
    // Draw yellow background
    background(255, 255, 0);
    // Display the title image
    image(titleImg, width / 2 - 450, 20, 800,200);
    // Display the start image
    image(startImg, width / 2 - 125, height / 2 + 150, 250, 100);
    // Display the bee1 image
    image(bee1Img, 420, 520, 200, 150);
  }
}

function mouseMoved() {
  // Update the position of the bee image based on mouse movement
  beeX = mouseX - 50;
  beeY = mouseY - 50;
}

function mousePressed() {
  if (!gameStarted) {
    // Check if the mouse is pressed on the start image
    if (collideRectRect(mouseX, mouseY, 1, 1, width / 2 - 125, height / 2 + 150, 250, 100)) {
      gameStarted = true;
    }
  } else {
    // Check if game is in continue state and bee touches the 'go' image
    if (gameContinue && collideRectRect(beeX, beeY, 100, 100, 0, 90, 150, 75)) {
      gameContinue = false;
      sunflowers = [];
      generateSunflowers();
    }

    // Check if game is over and bee touches the restart image
    if (gameOver && collideRectRect(beeX, beeY, 100, 100, width / 2 - 75, height / 2 + 150, 150, 75)) {
      startGame();
    }
  }
}

function keyPressed() {
  // Check if the 'esc' key is pressed
  if (keyCode === ESCAPE) {
    if (gameStarted) {
      if (!gameOver && !gameContinue) {
        // Pause the game
        gameStarted = false;
      } else if (gameOver || gameContinue) {
        // Resume the game
        gameStarted = true;
      }
    }
  }

  // Check if the 'R' key is pressed
  if (key === 'R' || key === 'r') {
    startGame(); // Restart the game
  }

  // Check if the 'c' key is pressed when the game is in the continue state
  if (key === 'C' || key === 'c') {
    if (gameContinue) {
      gameContinue = false;
      sunflowers = [];
      generateSunflowers();
    }
  }
}

// Function to check for collision between two rectangles
function collideRectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}