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
	strokeWeight(4);
	noFill();
}

function draw() {
	background(255);

	for (let i = 0; i < gridCount; i++) {
		for (let j = 0; j < gridCount; j++) {
			let p = {
				x: j * oneSize,
				y: i * oneSize
			};

			let delta = {
				x: -randPos[i][j].x + j * oneSize,
				y: -randPos[i][j].y + i * oneSize,
			}

			let px = map(mouseX, 0, winWH, 0, delta.x);
			px = constrain(px, 0, delta.x);

			let py = map(mouseY, 0, winWH, 0, delta.y);
			py = constrain(py, 0, delta.y);

			let newP = {
				x: p.x + px,
				y: p.y + py,
			};

			stroke(colors[i][j]);

			rect(newP.x, newP.y, oneSize, oneSize);

			rect(p.x, p.y, oneSize, oneSize);
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