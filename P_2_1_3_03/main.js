let winWH = 800;
let canvas = null;
let oneSize = 80;
let oneSize2 = oneSize * 0.5;
let gridCount = Math.ceil(winWH / oneSize) + 1;
let colors = [];
let alpha = 100;
let min = 5;
let max = 12;

function setup() {
	canvas = createCanvas(winWH, winWH);
	mousePressed();
	rectMode(CENTER);
	strokeWeight(4);
	noFill();
}

function draw() {
	background(255);
	translate(oneSize2, 0);

	let cnt = map(mouseX, 0, winWH, min, max);
	cnt = constrain(cnt, min, max);
	let dis = oneSize / cnt;

	let deltaY = map(mouseY, 0, winWH, -oneSize2, oneSize2);
	deltaY = constrain(deltaY, -oneSize2, oneSize2);

	for (let i = 0; i < gridCount; i++) {
		for (let j = 0; j < gridCount; j++) {
			push();
			translate(j * oneSize, i * oneSize);

			let l = { x: -oneSize, y: oneSize2 };
			let r = { x: oneSize, y: oneSize2 };

			l.y += deltaY;
			r.y -= deltaY;

			for (let m = 0; m < cnt; m++) {
				let p = { x: 0, y: oneSize - dis * m };
				stroke(colors[i][j]);
				line(p.x, p.y, l.x, l.y);
				line(p.x, p.y, r.x, r.y);
			}
			pop();
		}
	}
}

function mousePressed() {
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