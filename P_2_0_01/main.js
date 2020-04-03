let winH = 800;
let winW = 800;
let canvas = null;
let max = 400;
let colors = [];

function setup() {
	canvas = createCanvas(winW, winH);
	for (let i = 0; i < max; i++) {
		colors.push(color(random(255), random(255), random(255)));
	}
	strokeCap(ROUND);
}

function draw() {
	background(255);
	let cnt = map(mouseY, 0, winH, 0, max);
	cnt = parseInt(constrain(cnt, 0, max));

	let sw = map(mouseX, 0, winW, 1, 10);
	sw = parseInt(constrain(sw, 1, max));

	let degree = Math.PI * 2 / cnt;
	translate(winW / 2, winH / 2);
	strokeWeight(sw);
	for (let i = 0; i < cnt; i++) {
		stroke(colors[i]);
		let x = Math.cos(i * degree) * winW;
		let y = Math.sin(i * degree) * winW;
		line(0, 0, x, y);
	}
}


function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}