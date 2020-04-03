let winH = 600;
let winW = 600;
let winWH = 1200;
let canvas = null;
let max = 30;
let shapeCnt = {
	min: 4,
	max: 10
};
let step = winWH / (shapeCnt.max - shapeCnt.min);
let colors = [];

function setup() {
	canvas = createCanvas(winWH, winWH);

	for (let i = 0; i < max; i++) {
		colors.push(color(random(255), random(255), random(255)));
	}
	strokeCap(ROUND);
	translate(winWH / 2, winWH / 2);

	strokeWeight(4);
	noFill();
}

function mousePressed() {
	let len = map(mouseX, 0, winWH, -winWH, winWH);
	len = Math.abs(len) / 2;

	let shapeLen = Math.floor(len / step) + shapeCnt.min;
	shapeLen = shapeCnt.max - shapeLen;
	shapeLen = constrain(shapeLen, shapeCnt.min, shapeCnt.max);

	let degree = Math.PI * 2 / shapeLen;

	push();

	rotate(Math.random() * Math.PI * 2);

	beginShape();
	for (let i = 0; i < shapeLen; i++) {
		stroke(colors[Math.floor(Math.random() * colors.length)]);
		let x = Math.cos(i * degree) * len;
		let y = Math.sin(i * degree) * len;
		vertex(x, y);
	}
	endShape(CLOSE);

	pop();
}


function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}