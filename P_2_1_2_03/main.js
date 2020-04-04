let winWH = 600;
let canvas = null;
let oneSize = 30;
let gridCount = Math.ceil(winWH / oneSize) + 1;
let randPos = [];
let colors = [];
let alpha = 200;

function setup() {
	canvas = createCanvas(winWH, winWH);
	mousePressed();
	rectMode(CENTER);
	noFill();
	strokeWeight(4);
}

function draw() {
	background(255);

	for (let i = 0; i < gridCount; i++) {
		for (let j = 0; j < gridCount; j++) {
			let p = {
				x: j * oneSize,
				y: i * oneSize
			};
			let currSize = map(Math.pow(p.x - mouseX, 2) + Math.pow(p.y - mouseY, 2), 0, 100000, 0, oneSize * 2);
			currSize = constrain(currSize, 0, oneSize * 2);
			stroke(colors[i][j]);
			rect(p.x, p.y, currSize, currSize);
		}
	}
}

function mousePressed() {
	randPos = [];
	for (let i = 0; i < gridCount; i++) {
		let temp = [];
		for (let j = 0; j < gridCount; j++) {
			let x = j * oneSize;
			let y = i * oneSize;

			let deltaPos = {
				x: (Math.random() - 0.5) * oneSize * 10,
				y: (Math.random() - 0.5) * oneSize * 10,
			};
			temp.push({
				x: x + deltaPos.x,
				y: y + deltaPos.y,
			});
		}
		randPos.push(temp);
	}

	colors = [];
	for (let i = 0; i < gridCount; i++) {
		let temp = [];
		for (let j = 0; j < gridCount; j++) {
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