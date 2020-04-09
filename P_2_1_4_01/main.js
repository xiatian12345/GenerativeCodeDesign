let winWH = 600;
let canvas = null;

let img  = null;
let img1 = null;
let img2 = null;
let img3 = null;


let root = null;
let boxs = [];
let cols = 40;
let rows = 40;
let slider = null;

function preload(){
	img1 = loadImage("data/draw.png");
	img2 = loadImage("data/shapes.png");
	img3 = loadImage("data/toner.png");
}

function loadCheckBox(){
	root = createDiv("");

	for(let i = 0;i < rows;i ++){
		for(let j = 0;j < cols;j ++){
			let b = createCheckbox("",false);
			b.style('display', 'inline');//不让checkbox占一整行,将其display属性填上inline值
			b.parent(root);
			boxs.push(b);
		}
		let span = createSpan('<br/>');//换行
		span.parent(root);   
	}
}

function loadSlider(){
	slider = createSlider(0,200,0,1);
}

function setImg(){
  	img = img1;
  	img.resize(cols, rows);
  	img.loadPixels();
}

function setup() {
  	noCanvas();
	setImg();
  	loadCheckBox();
  	loadSlider();
}

function draw() {
	for(let i = 0;i < img.height;i ++){
		for(let j = 0;j < img.width;j ++){
			let c = img.get(j,i);
			let b = (red(c)+green(c)+blue(c))/3;
			let v = slider.value();
			boxs[i * rows + j].checked(b < v);
		}
	}
}


function keyPressed(e) {
	/*
	if ('s' === e.key || 'S' === e.key) {
		saveCanvas(canvas, new Date().toISOString(), "png");
	}
	*/

	if('1' === e.key) img = img1;
	if('2' === e.key) img = img2;
	if('3' === e.key) img = img3;


	img.resize(cols, rows);
  	img.loadPixels();
}