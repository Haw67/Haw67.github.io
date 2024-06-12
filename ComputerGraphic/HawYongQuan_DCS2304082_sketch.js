let shape1Angle;
let shape1State;
let shape1LastUpdate;
let shape2X; 
let shape2State; 
let shape2LastUpdate; 
let shape2Speed = 2.5; 
let shape3X; 
let shape3State; 
let shape3LastUpdate; 
let shape3Speed = 2.5; 
let shape10Y;
let shape10State; 
let shape10Speed = 5.8; 
let shape10LastUpdate; 
let shape10X = 620; 
let bounceLimit = 15; 
let scalingDown = true;
let lastChangeTime = 0;
const delayTime = 2500; 
let xLeft = 665; 
const xRight = 780;
const xShortLeft = 715; 
const xOriginalLeft = 665; 
let topY = 320;
let middleY = 320;
let bottomY = 360; 
let shortTopY = 320;
let shortBottomY = 360; 
let originalTopY = 300; 
let originalBottomY = 380;
let isScalingDown = false; 
let lastChangeMillis = 0;
const delayDuration = 4000; 
let shape4X1 = 660; 
let shape4X2 = 650; 
let shape4X3 = 600; 
let shape4State = 'shorten'; 
let shape4LastUpdate = 0;
const shape4ShortX1 = 600; 
const shape4ShortX2 = 590; 
const shape4ShortX3 = 540; 
const shape4OriginalX1 = 660;
const shape4OriginalX2 = 650; 
const shape4OriginalX3 = 600; 
const shape4Delay = 4000; 
const shape4Speed = 1; 
let bounceCount = 0; 
let shape14Visible = false; 
let shape14LastToggle = 0; 
let shape7X = 660; 
let targetX = 690; 
let shape7State = 'movingRight'; 
let shape7LastChangeTime = 0; 
const moveDistance = 30; 
const moveDuration = 1000; 
const waitTimeRight = 3000; 
const waitTimeLeft = 2000;
let imgScale = 0; 
let targetScale = 1.0; 
let scaleSpeed = 0.01; 

function setup(){
    createCanvas(1280,720);
    frameRate(1000);
    shape1Angle = 0; 
    shape1State = 'rotateLeft'; 
    shape1LastUpdate = millis(); 
    shape2X = 600; 
    shape2State = 'moveLeft'; 
    shape2LastUpdate = millis(); 
    shape3X = 595; 
    shape3State = 'moveLeft'; 
    shape3LastUpdate = millis(); 
    shape10Y = 0;
    shape10State = 'falling';
    shape10LastUpdate = millis();
    shape7LastChangeTime = millis();
}

function draw(){
    background(255,254,232);

    push();
    scaleImage(); 
    image(img, 0, 0, 150, 150); 
    pop();

    animateShape1();
    animateShape2();
    animateShape3();
    animateShape4();
    animateShape5();
    animateShape6();
    animateShape7();
    animateShape8();
    animateShape9();
    animateShape10();
    animateShape11();
    animateShape12();
    animateShape13();
    animateShape14();
    animateShape15();
}

function preload() {
    img = loadImage('crescendo.jpg'); 
}

function scaleImage() {
    imgScale = lerp(imgScale, targetScale, scaleSpeed); 
    imgScale = constrain(imgScale, 0.1, 10); 
    scale(imgScale); 
}

function mouseClicked() {
    targetScale = targetScale === 1.5 ? 1 : 1.5;
}

function animateShape1(){
    push();
    translate(600, 250);
    rotate(shape1Angle); 
    translate(-600, -250); 
    fill(255,112,90); 
    noStroke();
    beginShape();
    vertex(600,130);
    vertex(600,250);
    vertex(660,250);
    vertex(660,180);
    quadraticVertex(645,135,600,130);
    endShape(CLOSE);
    pop();

    let currentTime = millis();
    if (shape1State === 'rotateLeft') {
        shape1Angle -= 0.04; 
        if (shape1Angle <= -HALF_PI) {
            shape1Angle = -HALF_PI;
            shape1State = 'wait';
            shape1LastUpdate = currentTime; 
        }
    } else if (shape1State === 'wait') {
        if (currentTime - shape1LastUpdate > 3000) { 
            shape1State = 'rotateRight';
        }
    } else if (shape1State === 'rotateRight') {
        shape1Angle += 0.04; 
        if (shape1Angle >= 0) {
            shape1Angle = 0;
            shape1State = 'waitAgain';
            shape1LastUpdate = currentTime; 
        }
    } else if (shape1State === 'waitAgain') {
        if (currentTime - shape1LastUpdate > 3000) { 
            shape1State = 'rotateLeft';
        }
    }
}

function animateShape2() {
    fill(52, 50, 54);
    noStroke();
    square(shape2X, 255, 60);

    let currentTime = millis();
    if (shape2State === 'moveLeft') {
        shape2X -= shape2Speed; 
        if (shape2X <= 500) { 
            shape2X = 500;
            shape2State = 'waitLeft'; 
            shape2LastUpdate = currentTime; 
        }
    } else if (shape2State === 'waitLeft') {
        if (currentTime - shape2LastUpdate > 3000) { 
            shape2State = 'moveRight'; 
        }
    } else if (shape2State === 'moveRight') {
        shape2X += shape2Speed; 
        if (shape2X >= 600) { 
            shape2X = 600;
            shape2State = 'waitRight'; 
            shape2LastUpdate = currentTime; 
        }
    } else if (shape2State === 'waitRight') {
        if (currentTime - shape2LastUpdate > 3000) { 
            shape2State = 'moveLeft'; 
        }
    }
}

function animateShape3(){
    beginShape();
    fill("skyblue");
    vertex(shape3X, 255);
    vertex(shape3X, 315);
    vertex(shape3X - 60, 315); 
    endShape(CLOSE);

    let currentTime = millis();
    if (shape3State === 'moveLeft') {
        shape3X -= shape3Speed; 
        if (shape3X <= 495) {
            shape3X = 495;
            shape3State = 'waitLeft'; 
            shape3LastUpdate = currentTime; 
        }
    } else if (shape3State === 'waitLeft') {
        if (currentTime - shape3LastUpdate > 3000) { 
            shape3State = 'moveRight'; 
        }
    } else if (shape3State === 'moveRight') {
        shape3X += shape3Speed; 
        if (shape3X >= 595) { 
            shape3X = 595;
            shape3State = 'waitRight'; 
            shape3LastUpdate = currentTime; 
        }
    } else if (shape3State === 'waitRight') {
        if (currentTime - shape3LastUpdate > 3000) { 
            shape3State = 'moveLeft'; 
        }
    }
}

function animateShape4() {
    fill(255, 112, 90);
    beginShape();
    vertex(shape4X1, 320); 
    vertex(535, 320);
    vertex(535, 380);
    vertex(shape4X3, 380); 
    quadraticVertex(shape4X2, 365, shape4X1, 320); 
    endShape(CLOSE);

    let currentTime = millis();

    if (currentTime - shape4LastUpdate > shape4Delay) {
        if (shape4State === 'shorten') {
            shape4State = 'lengthen';
        } else {
            shape4State = 'shorten';
        }
        shape4LastUpdate = currentTime;
    }

    if (shape4State === 'shorten') {
        if (shape4X1 > shape4ShortX1) shape4X1 -= shape4Speed;
        if (shape4X2 > shape4ShortX2) shape4X2 -= shape4Speed;
        if (shape4X3 > shape4ShortX3) shape4X3 -= shape4Speed;
    } else if (shape4State === 'lengthen') {
        if (shape4X1 < shape4OriginalX1) shape4X1 += shape4Speed;
        if (shape4X2 < shape4OriginalX2) shape4X2 += shape4Speed;
        if (shape4X3 < shape4OriginalX3) shape4X3 += shape4Speed;
    }
}

function animateShape5() {
    fill(52, 50, 54);
    beginShape();
    vertex(530, bottomY);
    vertex(530, middleY);
    quadraticVertex(525, topY, 505, topY);
    vertex(480, topY);
    quadraticVertex(460, topY, 455, middleY);
    vertex(455, bottomY);
    endShape(CLOSE);

    if (millis() - lastChangeMillis > delayDuration) {
        if (isScalingDown) {
            topY += 1;
            bottomY -= 1;
            if (topY >= shortTopY && bottomY <= shortBottomY) {
                isScalingDown = false;
                lastChangeMillis = millis();
            }
        } else {
            topY -= 1;
            bottomY += 1;
            if (topY <= originalTopY && bottomY >= originalBottomY) {
                isScalingDown = true;
                lastChangeMillis = millis();
            }
        }
    }
}

function animateShape6() {
    let delayTime; 

    fill(255, 112, 90);
    beginShape();
    vertex(xLeft, 255);
    vertex(xLeft, 315);
    vertex(xRight, 315);
    quadraticVertex(820, 280, xRight, 255);
    endShape(CLOSE);

    if (scalingDown) {
        delayTime = 2000; 
    } else {
        delayTime = 2000; 
    }

    if (millis() - lastChangeTime > delayTime) {
        if (scalingDown) {
            xLeft += 1;
            if (xLeft >= xShortLeft) {
                scalingDown = false;
                lastChangeTime = millis();
            }
        } else {
            xLeft -= 1; 
            if (xLeft <= xOriginalLeft) {
                scalingDown = true;
                lastChangeTime = millis();
            }
        }
    }
}

function animateShape7() {
    fill("skyblue");
    rect(shape7X, 320, 140, 60, 30);

    let currentTime = millis();

    if (shape7State === 'movingRight') {
        let progress = (currentTime - shape7LastChangeTime) / moveDuration;
        shape7X = lerp(660, 690, constrain(progress, 0, 1));

        if (progress >= 1) {
            shape7State = 'waitingAfterRight';
            shape7LastChangeTime = currentTime;
        }
    } else if (shape7State === 'waitingAfterRight') {
        if (currentTime - shape7LastChangeTime > waitTimeRight) {
            shape7State = 'movingLeft';
            shape7LastChangeTime = currentTime;
        }
    } else if (shape7State === 'movingLeft') {
        let progress = (currentTime - shape7LastChangeTime) / moveDuration;
        shape7X = lerp(690, 660, constrain(progress, 0, 1));

        if (progress >= 1) {
            shape7State = 'waitingAfterLeft';
            shape7LastChangeTime = currentTime;
        }
    } else if (shape7State === 'waitingAfterLeft') {
        if (currentTime - shape7LastChangeTime > waitTimeLeft) {
            shape7State = 'movingRight';
            shape7LastChangeTime = currentTime;
        }
    }
}

function animateShape8(){
    beginShape();
    fill(255,112,90);
    vertex(455,385);
    vertex(455,455);
    vertex(530,455);
    vertex(530,430);
    quadraticVertex(530,390,495,385);
    endShape(CLOSE);
}

function animateShape9(){
    beginShape();
    fill("skyblue");
    vertex(535,385);
    vertex(535,455);
    vertex(580,455);
    quadraticVertex(605,450,610,420);
    vertex(610,385);
    endShape(CLOSE);
}

function animateShape10() {
    fill(52, 50, 54);
    circle(shape10X, shape10Y, 70);

    let currentTime = millis();

    if (shape10State === 'falling') {
        shape10Y += shape10Speed;
        if (shape10Y >= 280) {
            shape10Y = 280;
            shape10State = 'waitAt280';
            shape10LastUpdate = currentTime;
        }
    } else if (shape10State === 'waitAt280') {
        if (currentTime - shape10LastUpdate > 1900) {
            shape10State = 'moveRight';
            shape10LastUpdate = currentTime;
        }
    } else if (shape10State === 'moveRight') {
        shape10X += 31;
        shape10State = 'waitAfterRight';
        shape10LastUpdate = currentTime;
    } else if (shape10State === 'waitAfterRight') {
        if (currentTime - shape10LastUpdate > 1000) {
            shape10State = 'dropTo420';
            shape10LastUpdate = currentTime;
        }
    } else if (shape10State === 'dropTo420') {
        if (shape10Y < 420) {
            shape10Y += shape10Speed;
        } else {
            shape10Y = 420;
            shape10State = 'bounce';
            shape10LastUpdate = currentTime;
        }
    } else if (shape10State === 'bounce') {
        if (bounceCount < bounceLimit) {
            shape10Y -= shape10Speed / 2; 
            if (shape10Y <= 410) {
                shape10Y = 410;
                shape10State = 'fallFromBounce';
                bounceCount++;
            }
        } else {
            shape10State = 'dropTo780';
        }
    } else if (shape10State === 'fallFromBounce') {
        shape10Y += shape10Speed / 2; 
        if (shape10Y >= 420) {
            shape10Y = 420;
            shape10State = 'bounce';
            shape10LastUpdate = currentTime;
        }
    } else if (shape10State === 'dropTo780') {
        if (shape10Y < 780) {
            shape10Y += shape10Speed;
        } else {
            shape10State = 'reset';
            shape10LastUpdate = currentTime;
        }
    } else if (shape10State === 'reset') {
        shape10X = 620;
        shape10Y = 0;
        shape10State = 'falling';
        bounceCount = 0; 
    }
}

function animateShape11(){
    beginShape();
    fill(255,112,90);
    vertex(690,385);
    vertex(690,455);
    vertex(765,455);
    quadraticVertex(810,420,765,385);
    endShape(CLOSE);
}

function animateShape12(){
    beginShape();
    fill("skyblue");
    vertex(530,460);
    vertex(530,530);
    vertex(490,530);
    quadraticVertex(465,530,455,500);
    vertex(455,460);
    endShape(CLOSE);
}

function animateShape13(){
    fill(52,50,54);
    rect(535,460,55,45);
}

function animateShape14() {
    let currentTime = millis();

    if (shape14Visible && currentTime - shape14LastToggle > 2000) { 
        shape14Visible = false; 
        shape14LastToggle = currentTime; 
    } else if (!shape14Visible && currentTime - shape14LastToggle > 4100) { 
        shape14Visible = true; 
        shape14LastToggle = currentTime;
    }

    if (shape14Visible) {
        fill(255, 112, 90);
        rect(595, 460, 90, 45);
    }
}

function animateShape15(){
    fill(52,50,54);
    arc(728,461,75,80,0,PI)
}