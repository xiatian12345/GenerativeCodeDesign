let winH = 800;
let winW = 1200;
let canvas = null;
let colors = [];
let colorLen = 60;
let hTotal = 40;

function setup() {
	canvas = createCanvas(winW, winH);
	colorMode(RGB);
	noStroke();
	for (let i = 0; i < colorLen; i++) {
		colors.push(color(random(255), random(255), random(255)));
	}
}

function circleColor(colorArr, num) { //循环移位
	let ret = colorArr.slice();
	for (let i = 0; i < num; i++) {
		let c = ret.pop();
		ret.unshift(c);
	}
	return ret;
}

function draw() {
	let verticleCount = parseInt(map(mouseX, 0, winW, 1, colorLen));
	verticleCount = constrain(verticleCount, 1, colorLen);
	let horizonCount = parseInt(map(mouseY, 0, winH, 1, hTotal));
	horizonCount = constrain(horizonCount, 1, hTotal);
	let w = winW / verticleCount;
	let h = winH / horizonCount;
	for (let i = 0; i < horizonCount; i++) {
		let col = circleColor(colors, i);
		for (let j = 0; j < verticleCount; j++) {
			fill(col[j]);
			rect(w * j, h * i, w, h);
		}
	}
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}