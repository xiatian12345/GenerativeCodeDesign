let winWH = 800 - 10;
let canvas = null;
let oneSize = 40;
let gridCount = Math.ceil(winWH / oneSize) + 1;


function setup() {
	canvas = createCanvas(winWH, winWH);
	strokeCap(ROUND);
	strokeWeight(6);
}

function draw() {
	background(255);

	for (let i = 0; i < gridCount; i++) {
		for (let j = 0; j < gridCount; j++) {
			let x = j * oneSize;
			let y = i * oneSize;

			let x1 = x + oneSize * 0.5;
			let y1 = y + oneSize * 0.5;

			let cx = (x + x1) * 0.5;
			let cy = (y + y1) * 0.5;

			let distX = Math.pow(cx - mouseX, 2);
			let distY = Math.pow(cy - mouseY, 2);

			let theta = map(distX + distY, 0, 200000, -Math.PI, Math.PI);
			theta = constrain(theta, -Math.PI, Math.PI);

			let dx = oneSize * Math.cos(theta) * 0.5;
			let dy = oneSize * Math.sin(theta) * 0.5;

			line(cx - dx, cy - dy, cx + dx, cy + dy);
		}
	}
}



function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
}