let winH = 600;
let winW = 600;
let canvas = null;
let colors = [];
let colorLen = 30;

function setup() {
	canvas = createCanvas(winW, winH);
	colorMode(HSB);
	noStroke();
	for (let i = 0; i < colorLen; i++) {
		colors.push(color(random(255), random(255), random(255)));
	}
}

function draw() {
	let verticleCount = parseInt(map(mouseX, 0, winW, 2, 100));
	let horizonCount = parseInt(map(mouseY, 0, winH, 2, 10));
	let w = winW / horizonCount;
	let h = winH / verticleCount;
	for (let i = 0; i < horizonCount; i++) {
		let from = colors[i % colorLen];
		let to = colors[colorLen - 1 - i % colorLen];
		for (let j = 0; j < verticleCount; j++) {
			fill(lerpColor(from, to, j / verticleCount));
			rect(i * w, j * h, w, h);
		}
	}
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}