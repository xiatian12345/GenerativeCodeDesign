let winWH = 600;
let canvas = null;
let oneSize = 30;
let gridCount = Math.ceil(winWH / oneSize) + 1;
let randPos = [];
let constPos = [];
let colors = [];
let alpha = 100;

function setup() {
	canvas = createCanvas(winWH, winWH);
	mousePressed();
	rectMode(CENTER);
	noStroke();
}

function draw() {
	background(255);

	for (let i = 0; i < gridCount; i++) {
		for (let j = 0; j < gridCount; j++) {
			beginShape();
			for (let k = 0; k < randPos[i][j].length; k++) {
				let p = randPos[i][j][k];
				let constP = constPos[i][j][k];
				let delta = {
					x: constP.x - p.x,
					y: constP.y - p.y,
				}
				let dx = map(mouseX, 0, winWH, 0, delta.x);
				dx = constrain(dx, 0, delta.x);

				let dy = map(mouseY, 0, winWH, 0, delta.y);
				dy = constrain(dy, 0, delta.y);

				vertex(dx + constP.x, dy + constP.y);
			}
			fill(colors[i][j]);
			endShape(CLOSE);
		}
	}
}

function mousePressed() {
	randPos = [];
	for (let i = 0; i < gridCount; i++) {
		let temp = [];
		let constTemp = [];
		for (let j = 0; j < gridCount; j++) {
			let t = [];
			let tt = [];

			let x = j * oneSize;
			let y = i * oneSize;

			let oneSize2 = oneSize * 0.5;
			let oneSize4 = oneSize * 0.25;
			// let sz = oneSize4;
			let sz = oneSize * 8;
			let tl = {
				x: x - oneSize2,
				y: y + oneSize2
			};
			let tr = {
				x: x + oneSize2,
				y: y + oneSize2
			};
			let dr = {
				x: x + oneSize2,
				y: y - oneSize2
			};
			let dl = {
				x: x - oneSize2,
				y: y - oneSize2
			};
			tt.push(tl);
			tt.push(tr);
			tt.push(dr);
			tt.push(dl);


			t.push({
				x: tl.x + (Math.random() - 0.5) * sz,
				y: tl.y + (Math.random() - 0.5) * sz,
			});
			t.push({
				x: tr.x + (Math.random() - 0.5) * sz,
				y: tr.y + (Math.random() - 0.5) * sz,
			});
			t.push({
				x: dr.x + (Math.random() - 0.5) * sz,
				y: dr.y + (Math.random() - 0.5) * sz,
			});
			t.push({
				x: dl.x + (Math.random() - 0.5) * sz,
				y: dl.y + (Math.random() - 0.5) * sz,
			});
			temp.push(t);
			constTemp.push(tt);
		}
		randPos.push(temp);
		constPos.push(constTemp);
	}

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