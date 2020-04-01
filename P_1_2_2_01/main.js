let winH = 896;
let winW = 658;
let canvas = null;


let img;
function preload() {
	img = loadImage('data/cat.jpeg');
}

function setup() {
	canvas = createCanvas(winW, winH);
	// colorMode(HSB);
	noStroke();
	rectMode(CORNER);
	img.loadPixels();
	// image(img, 0, 0);
}

function draw() {
	let cellSize = map(mouseX, 0, winW, 5, 50);
	let wCnt = Math.ceil(winW / cellSize);
	let hCnt = Math.ceil(winH / cellSize);

	for (let i = 0; i < hCnt; i++) {
		for (let j = 0; j < wCnt; j++) {
			let x = j * cellSize;
			let y = i * cellSize;
			let c = img.get(x, y);//获取x,y处像素点颜色
			fill(c);
			rect(x, y, cellSize, cellSize);
		}
	}
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}