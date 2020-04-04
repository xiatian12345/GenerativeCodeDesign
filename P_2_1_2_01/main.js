let winWH = 600;
let canvas = null;
let oneSize = 30;
let gridCount = Math.ceil(winWH / oneSize) + 1;
let randPos = [];
let colors = [];
let alpha = 160;

function setup() {
	canvas = createCanvas(winWH, winWH);
	noFill();
	mousePressed();
}

function draw() {
	background(255);
	strokeWeight(mouseY / 40);

	for (let i = 0; i < gridCount; i++) {
		for (let j = 0; j < gridCount; j++) {
			let p = {
				x: j * oneSize,
				y: i * oneSize
			};

			let size = map(mouseY, 0, winWH, 0, oneSize * 2);
			size = constrain(size, 0, oneSize * 2);
			let delta = {
				x: -randPos[i][j].x + j * oneSize,
				y: -randPos[i][j].y + i * oneSize,
			}

			let px = map(mouseX, 0, winWH, 0, delta.x);
			px = constrain(px, 0, delta.x);

			let py = map(mouseX, 0, winWH, 0, delta.y);
			py = constrain(py, 0, delta.y);

			if (i === 0 && j === 0) console.log(px, py);

			let newP = {
				x: p.x + px,
				y: p.y + py,
			};

			stroke(colors[i][j]);
			circle(newP.x, newP.y, size);
		}
	}

	// noLoop();
}

function mousePressed() {
	randPos = [];
	for (let i = 0; i < gridCount; i++) {
		let temp = [];
		for (let j = 0; j < gridCount; j++) {
			let x = j * oneSize;
			let y = i * oneSize;

			let deltaPos = {
				x: (Math.random() - 0.5) * oneSize,
				y: (Math.random() - 0.5) * oneSize,
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