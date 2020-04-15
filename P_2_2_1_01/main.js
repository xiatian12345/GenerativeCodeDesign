let winWH = 800;
let canvas = null;
let center = { x: winWH / 2, y: winWH / 2 };
let scl = 5;
let sz = 4;
let step = 200;
let rd = 50;

function setup() {
	canvas = createCanvas(winWH, winWH);
	colorMode(HSB);
	noFill();
}

function draw() {
	for (let i = 0; i < step; i++) {
		let r1 = getRand(-1, 1);
		let r2 = getRand(-1, 1);
		center.x += r1 * scl;
		center.y += r2 * scl;

		let r3 = getRand(0, 40);
		let r4 = getRand(0, 40);
		let r5 = getRand(0, 40);
		stroke((center.x + r3) % 255, (center.y + r4) % 255, (center.x + center.y + r5) % 255);

		if (center.x > winWH) center.x = 0;
		if (center.x < 0) center.x = winWH;

		if (center.y > winWH) center.y = 0;
		if (center.y < 0) center.y = winWH;

		ellipse(center.x, center.y, sz);
	}
}

function getRand(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}