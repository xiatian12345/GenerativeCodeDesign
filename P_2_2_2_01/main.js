let winWH = 800;
let canvas = null;
let center = { x: winWH / 2, y: winWH / 2 };
let scl = 5;
let sz = 1;
let step = 20;

let isClear = false;

let sclx = 1;
let scly = 1;

let st = { x: winWH / 2, y: winWH / 2 };
let nd = { x: 0, y: 0 };

let rndx = (Math.random() - 0.5) * 2;
let rndy = (Math.random() - 0.5) * 2;

function setup() {
	canvas = createCanvas(winWH, winWH);
}

function draw() {
	step = map(mouseX, 0, winWH, 0, 20);

	for (let i = 0; i < step; i++) {
		strokeWeight(1);
		ellipse(center.x, center.y, sz);
		center.x += (sclx + rndx) * scl;
		center.y += (scly + rndy) * scl;
	}


	if (!(center.x > 0 && center.x < winWH && center.y > 0 && center.y < winWH)) {

		nd.x = center.x;
		nd.y = center.y;

		strokeWeight(3);
		line(st.x, st.y, nd.x, nd.y);

		st.x = nd.x;
		st.y = nd.y;

		if (center.x <= 0 || center.x >= winWH) {
			sclx *= -1;
			if (center.x <= 0) center.x = 0;
			if (center.x >= winWH) center.x = winWH;
		}
		if (center.y <= 0 || center.y >= winWH) {
			scly *= -1;
			if (center.y <= 0) center.y = 0;
			if (center.y >= winWH) center.y = winWH;
		}

		st.x = nd.x = center.x;
		st.y = nd.y = center.y;


		rndx = (Math.random() - 0.5) * 2;
		rndy = (Math.random() - 0.5) * 2;
	}


	if (isClear) {
		background(255);
		isClear = false;
	}
}

function getRand(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}

	if ('c' === e.key || 'C' === e.key) {
		isClear = true;
	}
}