let winH = 600;
let winW = 600;
let canvas = null;

function setup() {
	canvas = createCanvas(winW + 2, winH + 2);
	colorMode(HSB, 255, winW, winH);
	noStroke();
	rectMode(CENTER);
}

function draw() {
	translate(winW / 2, winH / 2);
	let len = constrain(mouseX, 0, winW);

	let one = Math.PI * 2 / (len);
	for (let i = 0; i < len; i++) {
		let c = map(i * one, 0, Math.PI * 2, 0, 255);
		fill(c, constrain(mouseX, 0, winW), constrain(mouseY, winH / 2, winH));
		arc(0, 0, winW, winH, one * i, one * (i + 1));
	}
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}