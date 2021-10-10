"use strict";
let capture;

function setup() {
	createCanvas(windowWidth, windowHeight);

	//set up a capture of the webcam
	capture = createCapture(VIDEO);
	capture.hide();
	capture.size(1024, 768);
}


function draw() {
	let mainColor = '#2C3A47';
	let bgColor = '#CAD3C8';

	background(bgColor);
	noStroke();
	fill(mainColor);

	if (capture.width > 0) { //i.e. if the capture is ready and has data
		drawWebcamImageAsDots();
	}
}


function drawWebcamImageAsDots() {
	let img = capture.get(0, 0, capture.width, capture.height);
	img.loadPixels();

	const step = 15;
	for (var y = step; y < img.height; y += step) {
		for (var x = step; x < img.width; x += step) {
			const darkness = getPixelDarknessAtPosition(img, x, y);
			const radius = 20 * darkness;
	
			let destX = x * width / img.width;
			let destY = y * height / img.height;
			
			circle(destX, destY, radius);
		}
	}
}

//ignore this, initially
function getPixelDarknessAtPosition(img, x, y) {
	const mirroring = true;
	var i = y * img.width + (mirroring ? (img.width - x - 1) : x);
	return (255 - img.pixels[i * 4]) / 255;
}
