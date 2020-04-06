let winWH = 600;
let canvas = null;
let oneSize = 100;
let gridCount = Math.ceil(winWH / oneSize);
let randPos = [];
let colors = [];
let alpha = 255;
let max = 10;
let one = -10;
let cnt = 5;

function setup() {
	canvas = createCanvas(winWH, winWH);
	mousePressed();
	noFill();
}

function draw() {
	console.log(frameRate());
	background(255);
	translate(oneSize / 2, oneSize / 2);

	for (let i = 0; i < gridCount; i++) {
		for (let j = 0; j < gridCount; j++) {
			stroke(colors[i][j]);
			let x = j * oneSize;
			let y = i * oneSize;
			circle(x, y, oneSize);

			let dk = map(mouseX, 0, winWH, 0, max);
			dk = Math.floor(constrain(dk, 0, max));
			let dir = randPos[i][j];
			let dx = x;
			let dy = y;
			let dr = 0;


			let count = map(mouseY, 0, winWH, 0, cnt);
			count = constrain(count, 0, cnt);

			for (let k = 1; k < dk; k++) {
				dr = oneSize + k * one;
				let kcnt = k * count;
				if (dir.x === 0 && dir.y === 1) {
					dy = y + kcnt;
				} else if (dir.x === 0 && dir.y === -1) {
					dy = y - kcnt;
				} else if (dir.x === 1 && dir.y === 0) {
					dx = x + kcnt;
				} else if (dir.x === -1 && dir.y === 0) {
					dx = x - kcnt;
				}
				circle(dx, dy, dr);
			}
		}
	}
}

function mousePressed() {
	randPos = [];
	for (let i = 0; i < gridCount; i++) {
		let temp = [];
		for (let j = 0; j < gridCount; j++) {
			let rnd = Math.random() * 4;
			let dx = 0;
			let dy = 0;
			if (0 <= rnd && rnd < 1) {
				dx = -1;
			} else if (1 <= rnd && rnd < 2) {
				dx = 1;
			} else if (2 <= rnd && rnd < 3) {
				dy = -1;
			} else {
				dy = 1;
			}
			temp.push({
				x: dx,
				y: dy,
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