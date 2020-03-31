let winH = 500;
let winW = 800;
let canvas = null;

function setup() {
	canvas = createCanvas(winW, winH);
	colorMode(HSB, winW, winH, 255);
	noStroke();
}

function draw() {
	let xStep = constrain(mouseX, 0, winW) + 2;
	let yStep = constrain(mouseY, 0, winH) + 2;
	for (let i = 0; i < winH; i += yStep) {
		for (let j = 0; j < winW; j += xStep) {
			fill(j, winH - i, 255);
			rect(j, i, xStep, yStep);
		}
	}

}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}