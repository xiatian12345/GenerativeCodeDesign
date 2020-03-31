let winWH = 600;
let r = g = b = 255 / 2;
let canvas = null;

function setup() {
	canvas = createCanvas(winWH, winWH);
	colorMode(HSB);
	rectMode(CENTER);
}

function draw() {
	r = g = b = map(mouseY, 0, winWH, 0, 255);
	background(255 - r, g, 100);
	let rectWH = map(mouseX, 0, winWH, 0, winWH);
	translate(winWH / 2, winWH / 2);
	noStroke();
	fill(r, 255 - g, 100);
	rect(0, 0, rectWH, rectWH);
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}