let winWH = 800;
let canvas = null;
let padding = 10;
let count = winWH / padding * 0.5;
let wh = winWH / 2 - padding;

let s = null;
function setup() {//旋转的锚点是slider的中心
	createCanvas(winWH + padding / 2, winWH + padding);
	background(120);
	for (let i = 1; i <= count; i++) {
		createSlider(0, 100, 100 - 100 * ((i - 1) / (count - 1))).position(padding, i * padding).style("width", wh + "px");
	}

	for (let i = 1; i <= count; i++) {
		createSlider(0, 100, 100 * ((i - 1) / (count - 1))).position((i + count * 0.5) * padding, winWH / 4 + padding / 2).style("width", wh + "px").style("transform", "rotate(90deg)");
	}

	for (let i = 1; i <= count; i++) {
		createSlider(0, 100, 100 * ((i - 1) / (count - 1))).position((i + count * 0.5) * padding - winWH / 2 + padding / 2, winWH / 4 + padding / 2 + winWH / 2).style("width", wh + "px").style("transform", "rotate(90deg)");
	}

	for (let i = 1; i <= count; i++) {
		createSlider(0, 100, 100 - 100 * ((i - 1) / (count - 1))).position(padding + winWH / 2, i * padding + winWH / 2 - padding / 4).style("width", wh + "px");
	}
}


function keyPressed(e) {
	/*
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
	*/
}