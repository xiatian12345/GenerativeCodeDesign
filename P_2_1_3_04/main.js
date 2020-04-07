let winW = 1200 * 2;
let winH = 900 * 2;
let canvas = null;
let oneH = 150 * 2;
let oneW = 200 * 2;

let oneH2 = oneH * 0.5;
let oneW2 = oneW * 0.5;

let cntX = winW / oneW;
let cntY = winH / oneH;

let colors = [];
let alpha = 255;

let min = 8;
let max = 100;

let minR = 0;
let maxR = Math.PI * 36;

function setup() {
	canvas = createCanvas(winW + 10, winH + 10);
	mousePressed();
	colorMode(HSB);
	rectMode(CENTER);
	strokeWeight(2);
	noFill();
}

function draw() {
	background(255);
	translate(cntX, cntY);

	let count = map(mouseX, 0, winW, min, max);
	count = constrain(count, min, max);
	count1 = 1 / count;

	let rotatebase = map(mouseX, 0, winH, minR, maxR);
	rotatebase = constrain(rotatebase, minR, maxR);

	for (let i = 0; i < winH / oneH; i++) {
		for (let j = 0; j < winW / oneW; j++) {
			push();
			translate(j * oneW + oneW2, i * oneH + oneH2);

			let lpcolor = color(255, 255, 0, 255);
			for (let m = 0; m < count; m++) {
				stroke(lerpColor(colors[i][j], lpcolor, m / count));
				rotate(rotatebase * 0.002);
				rect(0, 0, oneW, oneH);
				scale(1 - 3 / count);
			}

			pop();
		}
	}
}

function mousePressed() {
	colors = [];
	for (let i = 0; i < winH / oneH; i++) {
		let temp = [];
		for (let j = 0; j < winW / oneW; j++) {
			temp.push(color(random(255), random(255), random(255), alpha));
		}
		colors.push(temp);
	}
}



function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}