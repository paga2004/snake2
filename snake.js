var canvasSize = (window.innerHeight < window.innerWidth ? window.innerHeight * 0.98 : window.innerWidth * 0.98);
var fieldSize = 17;
var r = canvasSize/fieldSize;
var dir, score = 1;

var s = new Snake, f = new Food;

function setup() {
	createCanvas(canvasSize, canvasSize);
	setFrameRate(5);
	
}

function draw() {
	background(0);
	s.update();
	
	s.show();
	f.show();
	
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
	this.tail = [];
	
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

		if(this.x < 0 || this.x > fieldSize -1  || this.y < 0 || this.y > fieldSize - 1)
			this.kill();
		
		if(this.x == f.x && this.y == f.y)
			this.eat();
		
		
		if(this.tail.length == score) {
			for(var i=0; i < this.tail.length -1; i++) {
				this.tail[i] = this.tail[i+1]
			}
		}
		this.tail[score - 1]= [this.x, this.y];
	
		for(var i = 0; i < this.tail.length -1 ; i++) {
			if(this.tail[i][0] == this.x && this.tail[i][1] == this.y)
				this.kill();
		}

	}

	this.show = function() {
		fill(0,255,0);
		rect(this.x*r,this.y*r,r,r);
		
		
		
		for(var i = 0; i < this.tail.length; i++) {
			rect(this.tail[i][0] * r, this.tail[i][1] * r,r,r);
		}
	}
	
	
	this.kill = function() {
		this.x = Math.floor(fieldSize/2);
		this.y = Math.floor(fieldSize/2);
		score = 1;
		dir = 42;
		this.tail = [];
		f.newPos();
		
	}
	
	this.eat = function() {
		score++;
		f.newPos();
	}
}

function Food() {
	this.x = Math.round(Math.random() * (fieldSize - 1));
	this.y = Math.round(Math.random() * (fieldSize - 1));
	
	this.newPos = function() {
		do{
			this.x = Math.floor(Math.random() * (fieldSize - 1));
			this.y = Math.floor(Math.random() * (fieldSize - 1));
		}while(!this.legalPos)
	}

	this.show = function() {
		fill(255,0,0);
		rect(this.x*r,this.y*r,r,r);
	}
	
	this.legalPos = function() {
		for(var i = 0; i < s.tail.length; i++) {
			if(this.x == s.tail[i][0] && this.y == s.tail[i][1])
				return false;
			}
		return true;
	}
}