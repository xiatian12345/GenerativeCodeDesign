let winWH = 800;
let winWH2 = winWH / 2;
let canvas = null;
let shapes = [];
let step = 12;

function setup() {
	canvas = createCanvas(winWH, winWH);
	noFill();
	strokeWeight(4);
	shapes.push(new Shape(winWH2, winWH2, winWH));
}

function draw() {
	background(250);
	frameRate(10);
	for (let i = 0; i < shapes.length; i++) {
		shapes[i].show();
	}
}

function Shape(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.show = function () {
		for (let i = 0; i < r; i += step) {
			stroke(random(255), random(255), random(255));
			ellipse(x, y, i);
		}
	}
}

function mousePressed() {
	shapes.push(new Shape(mouseX, mouseY, Math.random() * winWH2));
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}

}