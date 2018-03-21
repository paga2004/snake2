var canvasSize = (window.innerHeight < window.innerWidth ? window.innerHeight * 0.98 : window.innerWidth * 0.98);
var fieldSize = 17;
var grid = create2dArray(fieldSize,fieldSize);
var r = canvasSize/fieldSize;
var cdir, dir;
var s = new Snake;


function setup() {
	createCanvas(canvasSize+1, canvasSize+1);
	background(0);
	setFrameRate(5);
}

function draw() {
	for(var i = 0; i < fieldSize; i++) {
		for(var j = 0; j < fieldSize; j++) {
			fill(0);
			rect(i*r,j*r,r,r)
		}
	}
	
	fill(0,255,0);
	rect(s.x*r,s.y*r,r,r);
	
	s.update();
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		dir = 0;
	}
		
	if (keyCode === RIGHT_ARROW) {
		dir = 1;
	}
	
	if (keyCode === DOWN_ARROW) {
		dir = 2;
	}
	
	if (keyCode === LEFT_ARROW) {
		dir = 3;
	}


}

function Snake() {
	this.x = Math.floor(fieldSize/2);
	this.y = Math.floor(fieldSize/2);
	
	this.update = function() {
		switch(dir) {
			case 0: 
				this.y--;
				break;
			case 1: 
				this.x++;
				break;
			case 2: 
				this.y++;
				break;
			case 3: 
				this.x--;
				break;
		}

		
	}

}

function create2dArray(x,y) {
	a = Array(x);
	for(var i = 0; i < x; i++) {
		a[i] = Array(y);
	}
}