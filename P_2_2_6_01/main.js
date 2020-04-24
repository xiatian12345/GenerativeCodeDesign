let canvas = null;

let WH = 1200;
let WW = 1400;

let WH2 = WH / 2;
let WW2 = WW / 2;

let rootX = WW2;
let rootY = WH2;

let rootR = 4;
let rootAngleSpeed = 0.002;
let rootDistToParent = 0;

let childAngleSpeedScl = 2;
let childRadiusScl = 0.8;
let childDistScl = 60;

let maxNodesNumber = 8;

let totalAngle = 0;

let nodeList = [];
let isClear = false;//通过改变clear变量不重绘减轻性能

function resetNodes(numbers) {
	nodeList = [];
	let temp = null;
	for (let i = 0; i < numbers; i++) {
		temp = new Pen(i > 0 ? nodeList[i - 1] : null);
		nodeList.push(temp);
	}
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	rootX = windowWidth / 2;
	rootY = windowHeight / 2;
	background(100);
	resetNodes(maxNodesNumber);
}

function checkOver() {
	if (nodeList[1].angle > Math.PI * 2.01) return true;
	return false;
}

function Pen(parent) {
	this.parent = parent;
	this.child = null;

	this.r = 0;
	this.x = 0;
	this.y = 0;
	this.angleSpeed = 0;
	this.angle = 0;
	this.distToParent = 0;
	this.history = [];

	this.first = true;

	if (this.parent) {
		this.r = this.parent.r * childRadiusScl;
		this.x = this.parent.x + this.r;
		this.y = this.parent.y;
		this.angleSpeed = this.parent.angleSpeed * childAngleSpeedScl;
		this.distToParent = childDistScl * this.r;
	} else {
		this.r = rootR;
		this.x = rootX;
		this.y = rootY;
		this.angleSpeed = rootAngleSpeed;
		this.distToParent = rootDistToParent;
	}

	this.update = function () {
		if (this.parent) {
			let prex = this.x;
			let prey = this.y;

			this.angle += this.angleSpeed;
			let parentX = this.parent.x;
			let parentY = this.parent.y;
			let tempX = Math.cos(this.angle) * (this.r + this.distToParent + this.parent.r);
			let tempY = Math.sin(this.angle) * (this.r + this.distToParent + this.parent.r);
			this.x = parentX + tempX;
			this.y = parentY + tempY;

			if (isClear) {
				this.history.push([this.x, this.y]);//性能瓶颈
			} else {
				if (this.first) {
					this.first = false;
				} else {
					strokeWeight(4);
					stroke(255, 255, 0, 255);
					line(this.x, this.y, prex, prey);
				}
			}
		}
	}

	this.draw = function () {
		if (!isClear) return;
		stroke(255, 0, 0, 255);
		strokeWeight(4);
		ellipse(this.x, this.y, this.r);
		if (this.parent) {
			stroke(0, 255, 0, 255);
			strokeWeight(2);
			line(this.x, this.y, this.parent.x, this.parent.y);
			for (let i = 1; i < this.history.length; i++) {
				let his = this.history[i - 1];
				let cur = this.history[i];
				stroke(0, 0, 255, 255);
				strokeWeight(1);
				line(his[0], his[1], cur[0], cur[1]);
			}
		}
	}
}



function draw() {
	if (isClear) {
		background(100);
	}

	for (let i = 0; i < nodeList.length; i++) {
		nodeList[i].update();
		nodeList[i].draw();
	}

	if (checkOver()) noLoop();
}



function getRand(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRand2(min, max) {
	return Math.random() * (max - min) + min;
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}