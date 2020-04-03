let winWH = 600;
let canvas = null;
let oneSize = 30;
let gridCount = Math.ceil(winWH / oneSize) + 1;
let gridConfig = [];
let max = 30;
let colorConfig = [];

function setup() {
	canvas = createCanvas(winWH, winWH);
	strokeCap(ROUND);
	strokeWeight(4);
	mouseY = winWH / 2;
	mouseX = winWH / 2;
	mousePressed();
}

function draw() {
	background(255);
	let sx = map(mouseX, 0, winWH, 0, max);
	let sy = map(mouseY, 0, winWH, 0, max);
	sx = constrain(sx, 0, max);
	sy = constrain(sy, 0, max);

	for (let i = 0; i < gridCount; i++) {
		for (let j = 0; j < gridCount; j++) {
			let x = j * oneSize;
			let y = i * oneSize;
			if (gridConfig[i][j]) {
				strokeWeight(sx);
				stroke(colorConfig[0]);
				line(x, y, x + oneSize, y + oneSize);
			} else {
				strokeWeight(sy);
				stroke(colorConfig[1]);
				line(x, y + oneSize, x + oneSize, y);
			}
		}
	}
}

function mousePressed(e) {
	oneSize = map(mouseX + mouseY, 0, 2 * winWH, 10, max * 4);
	oneSize = constrain(oneSize, 10, max * 4);

	gridCount = Math.ceil(winWH / oneSize) + 1;
	gridConfig = [];
	for (let i = 0; i < gridCount; i++) {
		let temp = [];
		for (let j = 0; j < gridCount; j++) {
			let rand = Math.random();
			if (rand < 0.5) {
				temp.push(0);
			} else {
				temp.push(1);
			}
		}
		gridConfig.push(temp);
	}
	colorConfig = [];
	for (let i = 0; i < 2; i++) {
		colorConfig.push(color(random(255), random(255), random(255), 255));
	}
}


function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}