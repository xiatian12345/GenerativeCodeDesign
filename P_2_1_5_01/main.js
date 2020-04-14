let winWH = 800;
let winWH2 = winWH/2;
let winWH4 = winWH2/2;
let canvas = null;
let shapeType = 1;
let dist = 10;
let step = winWH/dist;
let each = 255/step;

function setup() {
	createCanvas(winWH, winWH);
	noFill();
	stroke(0,200,255,200);
	angleMode(DEGREES);
}

function draw() {
	background(250);
	translate(winWH2,winWH2);

	strokeWeight(3);
	drawShape();

	if(shapeType === 1){
		strokeWeight(2);
		let r = map(mouseX,0,winWH,-180,180);
		r = constrain(r, -180, 180);
		rotate(r);
	}

	let s = map(mouseY,0,winWH,0.5,1);
	s = constrain(s, 0.5, 1);
	scale(s);

	if(shapeType === 2){
		let t = map(mouseX,0,winWH,-20,20);
		t = constrain(t, -20, 20);
		translate(t,t);
	}

	drawShape();
}

function drawShape(){
	if(1 === shapeType){
		for(let i = 0;i < winWH;i += dist){
			line(i-winWH2,0-winWH2,i-winWH2,winWH2);
		}
	}else if(2 === shapeType){
		for(let i = 0;i < winWH;i += dist){
			ellipse(0,0,i);
		}
	}
}

function keyPressed(e) {
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
	if ('1' === e.key) {
		shapeType = 1;
	}
	if ('2' === e.key) {
		shapeType = 2;
	}
}