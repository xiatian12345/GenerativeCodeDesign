let winWH = 600;
let canvas = null;

let vdo  = null;


let root = null;
let boxs = [];
let cols = 40;
let rows = 40;
let slider = null;

let isStart = false;

function preload(){
	vdo = createVideo("data/ball.mov",()=>{
		isStart = true;
	});
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

function setVideo(){
  	vdo.loop();
	vdo.loadPixels();
}

function setup() {
  	noCanvas();
	setVideo();
  	loadCheckBox();
  	loadSlider();
}

function draw() {
	if(!isStart)	return;
	for(let i = 0;i < vdo.height;i ++){
		for(let j = 0;j < vdo.width;j ++){
			let c = vdo.get(j,i);//主要的性能消耗全在这个函数了
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
}