let numPointsSlider, radiusSlider, lineThicknessSlider;

function setup() {
    createCanvas(1200, 800);
    angleMode(DEGREES);

    // Create sliders
    createSliders();

    noLoop(); 
}

function draw() {
    background(30, 30, 40);

    let numPoints = numPointsSlider.value();
    let radius = radiusSlider.value();
    let lineThickness = lineThicknessSlider.value();

    translate(width / 2, height / 2);

    let points = [];
    for (let i = 0; i < numPoints; i++) {
        let angle = map(i, 0, numPoints, 0, 360);
        let x = radius * cos(angle);
        let y = radius * sin(angle);
        points.push(createVector(x, y));
    }

    strokeWeight(lineThickness);
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            stroke(random(100, 255), random(100, 255), random(100, 255), 200);
            line(points[i].x, points[i].y, points[j].x, points[j].y);
        }
    }
}

function createSliders() {
    let container = createDiv();
    container.position(10, 10);

    let numPointsLabel = createDiv('Number of Points: ');
    numPointsSlider = createSlider(5, 20, 10);
    numPointsLabel.child(numPointsSlider);
    numPointsLabel.style('color', 'White'); 
    container.child(numPointsLabel);

    let radiusLabel = createDiv('Radius: ');
    radiusSlider = createSlider(50, 400, 200);
    radiusLabel.child(radiusSlider);
    radiusLabel.style('color', 'White'); 
    container.child(radiusLabel);

    let lineThicknessLabel = createDiv('Line Thickness: ');
    lineThicknessSlider = createSlider(1, 10, 2);
    lineThicknessLabel.child(lineThicknessSlider);
    lineThicknessLabel.style('color', 'White');
    container.child(lineThicknessLabel);
}

function mouseReleased() {
    redraw();
}

function keyPressed() {
    if (key === 's' || key === 'S') {
        saveCanvas('generativeArt', 'png');
    }
}
