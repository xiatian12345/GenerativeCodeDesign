let canvas = null;
let isClear = true;

let WH = 1000;
let WW = 1400;

let WH2 = WH / 2;
let WW2 = WW / 2;

let growSpeed = 1;
let cells = [];
let maxCell = 30;
let maxTryTimes = 100;

function setup() {
	canvas = createCanvas(WW, WH);

	noFill();
	stroke(255, 0, 0, 255);

	for (let i = 0; i < maxCell; i++) {
		let x = getRand(0, WW);
		let y = getRand(0, WH);
		let c = new cell(x, y);
		cells.push(c);
	}
}

function cell(x, y) {
	this.x = x;
	this.y = y;
	this.r = 0;
	this.growing = true;

	this.update = function (otherCells) {
		if (this.growing) {
			this.r += growSpeed;
			for (let i = 0; i < otherCells.length; i++) {
				let otherCell = otherCells[i];
				if (this === otherCell) continue;
				if ((this.r + otherCell.r) > dist(this.x, this.y, otherCell.x, otherCell.y)) {
					this.growing = false;
					break;
				}
			}
		}
	}

	this.draw = function () {
		ellipse(this.x, this.y, this.r * 2);
	}
}



function draw() {
	if (isClear) {
		background(100);
	}

	for (let i = cells.length - 1; i >= 0; i--) {
		let cell = cells[i];
		cell.update(cells);
		cell.draw();
	}

	let cnt = 0;
	for (let i = 0; i < cells.length; i++) {
		if (cells[i].growing) {
			cnt++;
		}
	}

	cnt = maxCell - cnt;

	let tryTimes = 0;
	while (true) {
		if (cnt <= 0) break;
		let x = getRand(0, WW);
		let y = getRand(0, WH);
		let can = true;
		for (let i = cells.length - 1; i >= 0; i--) {
			let cell = cells[i];
			if (cell.r > dist(x, y, cell.x, cell.y)) {
				can = false;
			}
		}
		if (can) {
			let c = new cell(x, y);
			cells.push(c);
			cnt--;
		}
		tryTimes++;
		if (tryTimes > maxTryTimes) {
			noLoop();
			break;
		}
	}
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