let winWH = 800;
let winWH2 = winWH / 2;
let canvas = null;

let st = { x: 0, y: 0 };
let n = 30;
let minN = n;
let c = null;
let nd = { x: 0, y: 0 };
let pointPairs = [];
let curr = null;
let step = 3;

function setup() {
	canvas = createCanvas(winWH, winWH);
	c = color(255, 0, 255);
	noFill();
	strokeWeight(2);
}

function draw() {
	background(250);
	for (let i = 0; i < pointPairs.length; i++) {
		let c = pointPairs[i].c;
		let n = pointPairs[i].n;

		let st = pointPairs[i].st;
		let nd = pointPairs[i].nd;
		stroke(c);
		for (let i = -n; i <= n; i += step) {
			let x1 = st.x;
			let y1 = st.y;
			let x2 = nd.x;
			let y2 = nd.y;

			let d = dist(x1, y1, x2, y2);
			push();
			translate(x1, y1);
			rotate(atan2(y2 - y1, x2 - x1));
			line(0, i, d, i);
			pop();
		}
	}

	if (curr) {
		stroke(curr.c);
		curr.nd.x = mouseX;
		curr.nd.y = mouseY;
		curr.n = n;
		curr.c = c;
		for (let i = -n; i <= n; i += step) {
			let x1 = curr.st.x;
			let y1 = curr.st.y;
			let x2 = curr.nd.x;
			let y2 = curr.nd.y;

			let d = dist(x1, y1, x2, y2);
			push();
			translate(x1, y1);
			rotate(atan2(y2 - y1, x2 - x1));
			line(0, i, d, i);
			pop();
		}
	}
}


function mousePressed() {
	curr = {
		c: c,
		n: n,
		st: { x: mouseX, y: mouseY },
		nd: { x: mouseX, y: mouseY }
	};
}


function mouseReleased() {
	pointPairs.push({
		c: curr.c,
		n: curr.n,
		st: curr.st,
		nd: curr.nd
	});
	curr = null;
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}

	if ('1' === e.key) {
		c = color(255, 0, 0, 255);
	} else if ('2' === e.key) {
		c = color(0, 255, 0, 255);
	} else if ('3' === e.key) {
		c = color(0, 0, 255, 255);
	} else if ('4' === e.key) {
		c = color(0, 255, 255, 255);
	} else if ('5' === e.key) {
		c = color(255, 255, 0, 255);
	}

	if ('ArrowUp' === e.key) {
		n += step;
	} else if ('ArrowDown' === e.key) {
		n -= step;
		if (n < minN) n = minN;
	}
}