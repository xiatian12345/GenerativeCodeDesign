let canvas = null;
let isClear = false;
let cnt = 30;
let px = [];
let py = [];
let r = 100;
let one = 360 / cnt;
let rnd = 1;
let cntx = 0;
let cnty = 0;
let isShake = true;
let twin = 0.05;


function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	colorMode(HSB);
	for (let i = 0; i <= cnt; i++) {
		let a = i * one;
		let x = r * Math.cos(a);
		let y = r * Math.sin(a);
		px.push(x);
		py.push(y);
	}
	noStroke();
	fill(255, 0, 0);
	cntx = windowWidth / 2;
	cnty = windowHeight / 2;
}

function draw() {
	if (isClear) {
		background(255);
	}
	drawCurve();
}

function drawCurve() {
	cntx += (mouseX - cntx) * twin;
	cnty += (mouseY - cnty) * twin;

	for (let i = 0; i < cnt; i++) {
		px[i] += getRand2(-rnd, rnd);
		py[i] += getRand2(-rnd, rnd);
	}

	if (isShake) {
		noStroke();
		fill(random(255), random(255), random(255));
	} else {
		noFill();
		strokeWeight(0.1);
		stroke(random(255), random(255), random(255));
	}
	beginShape();
	for (let i = 0; i < cnt; i++) {
		curveVertex(px[i] + cntx, py[i] + cnty);
		if (0 === i || cnt - 1 === i) {
			curveVertex(px[i] + cntx, py[i] + cnty);
		}
	}
	endShape();
}

function mousePressed() {
	cntx = mouseX;
	cnty = mouseY;
}

function getRand(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRand2(min, max) {
	return Math.random() * (max - min) + min;
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}

	if ('c' === e.key || 'C' === e.key) {
		isClear = true;
	}

	if ('1' === e.key) {
		isShake = true;
	} else if ('2' === e.key) {
		isShake = false;
	}

}