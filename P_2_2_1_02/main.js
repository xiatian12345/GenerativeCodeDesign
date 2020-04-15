let winWH = 800;
let canvas = null;
let center = { x: winWH / 2, y: winWH / 2 };
let scl = 5;
let sz = 4;
let step = 200;
let rd = 50;
let curDrawMode = 1;
let isClear = false;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	colorMode(HSB);
	noFill();
}

function draw() {
	step = map(mouseX, 0, windowWidth, 0, 1000);
	step = constrain(step, 0, 1000); 2
	for (let i = 0; i < step; i++) {
		let r1 = 0;
		let r2 = 0;

		if (1 === curDrawMode) {
			r1 = getRand(0, 1);
			r2 = getRand(0, 1);
		}
		if (2 === curDrawMode) {
			r1 = getRand(0, 1);
			r2 = getRand(-1, 0);
		}
		if (3 === curDrawMode) {
			r1 = getRand(-1, 0);
			r2 = getRand(-1, 1);
		}
		center.x += r1 * scl;
		center.y += r2 * scl;

		let r3 = getRand(0, 155);
		let r4 = getRand(0, 155);
		let r5 = getRand(0, 155);

		let co = color((center.x + r3) % 255, (center.y + r4) % 255, (center.x + center.y + r5) % 255);

		if (center.x > windowWidth) center.x = 0;
		if (center.x < 0) center.x = windowWidth;

		if (center.y > windowHeight) center.y = 0;
		if (center.y < 0) center.y = windowHeight;

		if (3 === curDrawMode) {
			fill(co);
			noStroke();
			ellipse(center.x, center.y, sz);
		} else {
			noFill();
			stroke(co);
			ellipse(center.x, center.y, sz);
		}
	}
	if (isClear) {
		background(255);
		isClear = false;
	}
}

function getRand(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}

	if ('1' === e.key) {
		curDrawMode = 1;
		sz = 6;
		scl = 8;
	}
	if ('2' === e.key) {
		curDrawMode = 2;
		sz = 2;
		scl = 5;
	}
	if ('3' === e.key) {
		curDrawMode = 3;

		sz = 12;
		scl = 12;
	}
	if ('c' === e.key || 'C' === e.key) {
		isClear = true;
	}
}