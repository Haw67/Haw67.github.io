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
let gameOverImg; 
let startImg; 
let gameStarted = false; 
let titleImg; 
let bee1Img; 
let highScore = 0; 
let bgMusic;

let timer; 
let timerInterval; 
const TIMER_DURATION = 5; 
const MIN_DISTANCE_FROM_BUD = 150;
const MAX_TRAJECTORY_POINTS = 30; 

let trajectory = []; 

function preload() {
  beeImg = loadImage('bee.gif');
  sunflowerImg = loadImage('sunflower.gif');
  budImg = loadImage('toothless.gif');
  backgroundImg = loadImage('background.jpg');
  goImg = loadImage('go.png');
  restartImg = loadImage('restart.png');
  gameOverImg = loadImage('gameover.png'); 
  startImg = loadImage('start.png'); 
  titleImg = loadImage('title.png'); 
  bee1Img = loadImage('bee1.png'); 
  
  endSound = loadSound('end.mp4');
  collectSound = loadSound('collect.mp3');
  bgMusic = loadSound('music.mp3');
}

function setup() {
  createCanvas(1280, 720);
  loadHighScore(); 
  startGame();
}

function startGame() {
  sunflowers = [];
  score = 0;
  gameOver = false;
  gameContinue = false;
  timer = TIMER_DURATION; 
  clearInterval(timerInterval); 
  generateSunflowers();
  startTimer(); 

  if (!bgMusic.isPlaying()) {
    bgMusic.loop(); 
  }

  budX = [width / 2 - 75, 300, 800, 300, 800, 100, 1000];
  budY = [height / 2 - 25, 500, 500, 200, 200, 350, 350];
  trajectory = []; 
}

function generateSunflowers() {
  for (let i = 0; i < 10; i++) {
    let validPosition = false;
    let sunflowerX, sunflowerY;

    while (!validPosition) {
      sunflowerX = random(width - 100);
      sunflowerY = random(200, height - 100); 
      validPosition = true;

      for (let j = 0; j < budX.length; j++) {
        let d = dist(sunflowerX, sunflowerY, budX[j], budY[j]);
        if (d < MIN_DISTANCE_FROM_BUD) {
          validPosition = false;
          break;
        }
      }
    }

    sunflowers.push({ x: sunflowerX, y: sunflowerY, scored: false, showScore: false, scoreTime: 0 });
  }
}

function draw() {
  if (gameStarted) {
    if (!gameOver && !gameContinue) {
      image(backgroundImg, 0, 0, width, height);

      drawTrajectory();

      image(beeImg, beeX, beeY, 100, 100);

      for (let i = 0; i < sunflowers.length; i++) {
        let sunflower = sunflowers[i];
        image(sunflowerImg, sunflower.x, sunflower.y, 100, 100);

        if (!sunflower.scored && collideRectRect(beeX, beeY, 100, 100, sunflower.x + 50, sunflower.y + 50, 20, 20)) {
          sunflower.scored = true;
          sunflower.showScore = true;
          sunflower.scoreTime = millis(); 
          score += 100;
          collectSound.play();
        }

        if (sunflower.showScore && millis() - sunflower.scoreTime < 500) {
          fill(255,0,0);
          textSize(32);
          text('+100', sunflower.x + 50, sunflower.y);
        } else {
          sunflower.showScore = false; 
        }
      }

      for (let i = 0; i < budX.length; i++) {
        image(budImg, budX[i], budY[i], 150, 150);
      }

      for (let i = 0; i < budX.length; i++) {
        if (collideRectRect(beeX, beeY, 100, 100, budX[i] + 75, budY[i] + 75, 0, 0)) {
          gameOver = true;
          clearInterval(timerInterval); 
          endSound.play();
          updateHighScore();
        }
      }

      fill(0);
      textSize(32);
      text('Score: ' + score, 10, 40);

      fill(0);
      textSize(32);
      textAlign(RIGHT);
      text('High Score: ' + highScore, 500, 40); 
      textAlign(LEFT);

      fill(255, 0, 0);
      text('Time Left: ' + timer, 1100, 40);

      if (sunflowers.every(sunflower => sunflower.scored)) {
        gameContinue = true;
        clearInterval(timerInterval);
      }

      if (timer <= 0) {
        gameOver = true;
        clearInterval(timerInterval); 
        endSound.play();
        updateHighScore();
      }

    } else if (gameContinue) {
      image(goImg, 0, 90, 150, 75);
      fill(random(255), random(255), random(255));
      textSize(32);
      text('Press C/c to continue next round', 540, 40);
    } else if (gameOver) {
      bgMusic.stop();
      background(0);
      image(gameOverImg, width / 2 - 150, height / 2 - 300, 300, 300);
      fill(255);
      textSize(32);
      text('Your Score: ' + score, width / 2 - 100, height / 2 + 100);
      image(restartImg, width / 2 - 75, height / 2 + 150, 150, 75);
      textSize(32);
      fill(255);
      text('Press R/r to restart', width / 2 - 120, height / 2 + 260);
    }
  } else {
    background(255, 255, 0);
    image(titleImg, width / 2 - 450, 20, 800, 200);
    image(startImg, width / 2 - 125, height / 2 + 150, 250, 100);
    image(bee1Img, 420, 520, 200, 150);
    fill(0);
    textSize(32);
    text('By D.Haw', 1025, 150);
    fill(random(255),0,random(255));
    textSize(48);
    text('Press S/s to start', width / 2 -175, height / 2 +100);
  }
}

function drawTrajectory() {
  fill(255);
  noStroke();
  for (let i = 0; i < trajectory.length; i++) {
    let pos = trajectory[i];
    ellipse(pos.x, pos.y, 10, 10);
  }
}

function mouseMoved() {
  beeX = mouseX - 50;
  beeY = mouseY - 50;

  trajectory.push({ x: beeX + 50, y: beeY + 50 });
  if (trajectory.length > MAX_TRAJECTORY_POINTS) {
    trajectory.shift(); 
  }
}

function mousePressed() {
  if (!gameStarted) {
    if (collideRectRect(mouseX, mouseY, 1, 1, width / 2 - 125, height / 2 + 150, 250, 100)) {
      gameStarted = true;
      startGame(); 
    }
  } else {
    if (gameContinue && collideRectRect(beeX, beeY, 100, 100, 0, 90, 150, 75)) {
      gameContinue = false;
      sunflowers = [];
      generateSunflowers();
      startTimer();
    }

    if (gameOver && collideRectRect(beeX, beeY, 100, 100, width / 2 - 75, height / 2 + 150, 150, 75)) {
      endSound.stop(); // Stop the end sound
      startGame();
    }
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    if (gameStarted) {
      if (!gameOver && !gameContinue) {
        gameStarted = false;
        clearInterval(timerInterval); 
        bgMusic.stop(); 
      } else if (gameOver || gameContinue) {
        gameStarted = true;
        startTimer(); 
        if (!bgMusic.isPlaying()) {
          bgMusic.loop(); 
        }
      }
    }
  }

  if (key === 'R' || key === 'r') {
    endSound.stop();
    startGame(); 
  }

  if (key === 'C' || key === 'c') {
    if (gameContinue) {
      gameContinue = false;
      sunflowers = [];
      generateSunflowers();
      startTimer(); 
      if (!bgMusic.isPlaying()) {
        bgMusic.loop(); 
      }
    }
  }

  if (key === 'S' || key === 's') {
    if (!gameStarted) {
      gameStarted = true;
      startGame(); 
    }
  }
}

function collideRectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

function startTimer() {
  timer = TIMER_DURATION;
  timerInterval = setInterval(() => {
    timer--;
    if (timer <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    saveHighScore();
  }
}

function saveHighScore() {
  localStorage.setItem('highScore', highScore);
}

function loadHighScore() {
  const savedScore = localStorage.getItem('highScore');
  if (savedScore) {
    highScore = parseInt(savedScore);
  }
}
