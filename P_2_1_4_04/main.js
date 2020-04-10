let winWH = 800;
let canvas = null;
let roses = [];
let min = 12;
let max = 18;
let len = 80;
let val = 100;

function SliderRose(x, y) {
	this.slds = [];
	this.pos = { x: x, y: y };
	this.step = 60;
	this.num = 0;

	let count = Math.floor(Math.random() * (max - min)) + min;
	let length = (Math.random() - 0.5) * 60 + len;
	let v = 0.9 * length;

	for (let i = 0; i < count; i++) {
		let x = Math.cos(i / count * Math.PI * 2) * v + this.pos.x;
		let y = Math.sin(i / count * Math.PI * 2) * v + this.pos.y;
		let s = createSlider(0, 255, 0).position(x, y).style("width", length + "px").style("transform", "rotate(" + i / count * 360 + "deg)");
		this.slds.push(s);
	}

	this.update = function () {
		let angle = Math.PI * 2 * this.num / this.step;
		let v = Math.sin(angle) * 255;
		for (let i = 0; i < this.slds.length; i++) {
			this.slds[i].value(v);
		}
		this.num++;
	};
}

function setup() {//旋转的锚点是slider的中心
	// createCanvas(winWH, winWH);
	createCanvas(windowWidth, windowHeight);
	roses.push(new SliderRose(Math.random() * windowWidth, Math.random() * windowHeight));
}

function draw() {
	background(127);
	for (let i = 0; i < roses.length; i++) {
		roses[i].update();
	}
}

function mousePressed() {
	roses.push(new SliderRose(mouseX, mouseY));
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}