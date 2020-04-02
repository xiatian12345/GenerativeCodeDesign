let winH = 600;
let winW = 800;
let canvas = null;
let cfg = {
	minH: 4,
	maxH: 9,
	colors: []
};

function setup() {
	canvas = createCanvas(winW, winH);
	// colorMode(HSB);
	noStroke();
	reDraw();
}

function divide(num) {
	if (1 === num) {
		return [1];
	} else {
		let ret = [];
		let n = Math.pow(2, num - 1) * (Math.random() + 0.2);
		let average = 1 / n;
		let cur = 0;
		while (cur < winW) {
			let r = Math.random() * average * (Math.random() + 0.8);
			cur += r;
			ret.push(r);
		}
		return ret;
	}
}

function reDraw() {
	let hCount = Math.floor(Math.random() * (cfg.maxH - cfg.minH)) + cfg.minH;
	let h = winH / hCount;
	cfg.colors = [];
	for (let i = 0; i < hCount; i++) {
		cfg.colors.push(color(Math.random() * 255, Math.random() * 255, Math.random() * 255, 100));
	}
	for (let i = hCount; i >= 1; i--) {
		let arr = divide(i);
		let currWTotal = 0;
		for (let j = 0; j < arr.length; j++) {
			let w = arr[j] * winW;
			let x = currWTotal;
			let y = (i - 1) * h;
			currWTotal += w;
			let c = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
			let from = color(0, 0, 0, 100);
			fill(lerpColor(from, c, Math.random()));
			rect(x, y - 50, w, h + 50);
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