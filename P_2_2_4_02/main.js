let canvas = null;
let isClear = true;

let WH = 1000;
let WW = 1000;

let WH2 = WH / 2;
let WW2 = WW / 2;

let xs = [];
let ys = [];
let rs = [];

let minr = 2;
let maxr = 6;

let maxLen = 2000;

function setup() {
	canvas = createCanvas(WW, WH);

	let a = Math.PI * 2 * Math.random();
	xs.push(WW / 2 + Math.cos(a) * WW2 / 2);
	ys.push(WH / 2 + Math.sin(a) * WH2 / 2);
	rs.push((minr + maxr) / 2);

	noFill();
	stroke(255, 0, 255, 255);
}



function draw() {
	if (isClear) {
		background(155);
	}

	stroke(0, 255, 0, 255);
	strokeWeight(6);
	noFill();
	circle(WW2, WH2, WH2);

	if (Math.random() > 0.9) {
		let a = Math.PI * 2 * Math.random();
		xs.push(WW / 2 + Math.cos(a) * WW2 / 2);
		ys.push(WH / 2 + Math.sin(a) * WH2 / 2);
		rs.push((minr + maxr) / 2);
	} else {
		let rx = getRand(0, WW);
		let ry = getRand(0, WH);
		let rr = getRand(minr, maxr);

		let minDist = Number.MAX_VALUE;
		let rIdx = 0;
		for (let i = 0; i < xs.length; i++) {
			let d = dist(xs[i], ys[i], rx, ry);
			if (minDist > d) {
				minDist = d;
				rIdx = i;
			}
		}

		let angle = Math.atan2(-WH2 + ry, -WW2 + rx);


		let nx = Math.cos(angle) * (rs[rIdx] + rr) + xs[rIdx];
		let ny = Math.sin(angle) * (rs[rIdx] + rr) + ys[rIdx];
		let nr = rr;

		xs.push(nx);
		ys.push(ny);
		rs.push(nr);
	}

	noStroke();
	fill(255, 0, 255, 255);
	for (let i = 0; i < xs.length; i++) {
		ellipse(xs[i], ys[i], rs[i] * 2);
	}

	if (xs.length > maxLen) {
		noLoop();
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