let winWH = 800;
let canvas = null;
let oneSizex = 20;
let oneSizey = 20;
let minsize = 40;
let minsize1 = 1 / minsize;
let gridCount = Math.ceil(winWH / oneSizex);
let colors = [];
let alpha = 100;
let cnt = 10;

function setup() {
	canvas = createCanvas(winWH, winWH);
	mousePressed();
}

function draw() {
	background(255);

	let cntx = map(mouseX, 0, winWH, minsize1, minsize);
	cntx = constrain(cntx, minsize1, minsize);

	let cnty = map(mouseY, 0, winWH, minsize1, minsize);
	cnty = constrain(cnty, minsize1, minsize);

	oneSizex = winWH / cntx;
	oneSizey = winWH / cnty;

	let halfx = oneSizex * 0.5;
	let halfy = oneSizey * 0.5;

	translate(halfx, halfy);
	for (let i = 0; i < gridCount; i++) {
		for (let j = 0; j < gridCount; j++) {
			push();
			let x1 = j * oneSizex;
			let y1 = i * oneSizey;

			translate(x1, y1);

			let x2 = 0;
			let y2 = 0;
			for (let m = 0; m < 4; m++) {
				for (let n = 0; n < cnt; n++) {
					if (0 === m) {
						x2 = -halfx + n * oneSizex / cnt;
						y2 = -halfy;
					} if (1 === m) {
						x2 = -halfx + n * oneSizex / cnt;
						y2 = halfy;
					} if (2 === m) {
						y2 = -halfy + n * oneSizey / cnt;
						x2 = -halfx;
					} if (3 === m) {
						y2 = -halfy + n * oneSizey / cnt;
						x2 = halfx;
					}
					stroke(colors[i][j]);
					line(0, 0, x2, y2);
				}
			}
			pop();
		}
	}
}

function mousePressed() {
	colors = [];
	for (let i = 0; i < gridCount; i++) {
		let temp = [];
		for (let j = 0; j < gridCount; j++) {
			temp.push(color(random(255), random(255), random(255), alpha));
		}
		colors.push(temp);
	}
}



function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}
