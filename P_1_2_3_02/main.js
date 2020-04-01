let winH = 800;
let winW = 1200;
let canvas = null;
let cfg = {
	minH: 9,
	maxH: 15,
	colors: []
};

function setup() {
	canvas = createCanvas(winW, winH);
	colorMode(RGB);
	noStroke();
	reDraw();
}

function divide(num) {
	if (1 === num) {
		return [1];
	} else {
		let ret = [];
		let n = Math.pow(2, num - 1);
		let average = 1 / n;
		for (let i = 1; i <= n; i++) {
			if (i % 2 === 1) {
				let rand = Math.random() + 0.3;
				let cur = average * rand;
				ret.push(cur);
			} else {
				ret.push(2 * average - ret[ret.length - 1]);
			}
		}
		return ret;
	}
}

function reDraw() {
	background(100);
	let hCount = Math.floor(Math.random() * (cfg.maxH - cfg.minH)) + cfg.minH;
	let h = winH / hCount;
	cfg.colors = [];
	for (let i = 0; i < hCount; i++) {
		cfg.colors.push(color(Math.random() * 255, Math.random() * 255, Math.random() * 255));
	}
	for (let i = 1; i <= hCount; i++) {
		let arr = divide(i);
		let currWTotal = 0;
		for (let j = 0; j < arr.length; j++) {
			let w = arr[j] * winW;
			let x = currWTotal;
			let y = (i - 1) * h;
			currWTotal += w;
			let c = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
			fill(c);
			rect(x, y, w, h);
		}
	}
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}


function mousePressed(e) {
	if ("mousedown" === e.type) {
		reDraw();
	}
}