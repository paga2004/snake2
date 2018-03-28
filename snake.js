//made by paga2004
var w = window.innerWidth;
var h = w/2;
var fieldSize = 17;
var r = h/fieldSize;
var c;
var pause = false;
var s = new Snake(0);
var s2 = new Snake(1);
var f = new Food(0);
var f2 = new Food(1);


function setup() {
    c = createCanvas(w, h)
    c.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    strokeWeight(r/20);
	setFrameRate(5); 
}

function draw() {
	background(0);
    stroke(255);
    line(h,0,h,h)
    
    printScore();
	s.update();
    s2.update();
    
    s.show();
    s2.show();
    
	f.show();
    f2.show();
    
    

}

function windowResized() {
    canvasSize = (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth);
    resizeCanvas(canvasSize, canvasSize);
    r = canvasSize/fieldSize;
    c.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		s2.ndir = 0;
	}
		
	if (keyCode === RIGHT_ARROW) {
		s2.ndir = 1;
	}
	
	if (keyCode === DOWN_ARROW) {
        s2.ndir = 2;
	}
	
	if (keyCode === LEFT_ARROW) {
		s2.ndir = 3;
	}
    
    if (keyCode === 87)
        s.ndir = 0;
   
    if (keyCode === 68)
        s.ndir = 1;
    
    if (keyCode === 83)
        s.ndir = 2;
    
    if (keyCode === 65)
        s.ndir = 3;
    
	
	if (keyCode === 32) {
		if(!pause)
			noLoop();
		else
			loop();
		
		pause = !pause
	}
}



function Snake(id) {
    this.id = id;
    this.score = 1;
    this.highscore = 1;
	this.x = Math.floor(fieldSize/2);
	this.y = Math.floor(fieldSize/2);
    this.dir;
	this.tail = [];
	
	this.update = function() {
        
        this.dir = (this.legalDir() ? this.ndir : this.dir);
        
        
		switch(this.dir) {
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
		
        
		if(this.x == f.x && this.y == f.y && this.id == 0)
			this.eat();
        
		if(this.x == f2.x && this.y == f2.y && this.id == 1)
			this.eat();
		
		
		if(this.tail.length == this.score) {
			for(var i=0; i < this.tail.length -1; i++) {
				this.tail[i] = this.tail[i+1]
			}
		}
		this.tail[this.score - 1]= [this.x, this.y];
	
		for(var i = 0; i < this.tail.length -1 ; i++) {
			if(this.tail[i][0] == this.x && this.tail[i][1] == this.y)
				this.kill();
		}
    }

	
        this.show = function() {
            fill(0,255,0);
            stroke(0);
            rect(this.id * h + this.x * r, this.y*r,r,r);
            
            for(var i = 0; i < this.tail.length; i++) {
                rect(this.tail[i][0] * r + this.id * h, this.tail[i][1] * r,r,r);
        }
	
	}
	
	
	this.kill = function() {
		this.x = Math.floor(fieldSize/2);
		this.y = Math.floor(fieldSize/2);
        
        if(this.score > this.highscore)
            this.highscore = this.score;
        
		this.score = 1;
		this.dir = -1;
        this.ndir = -1;
		this.tail = [];
        
        
            
        if(this.id == 0)
		  f.newPos();
        else 
            f2.newPos();
		
	}
	
	this.eat = function() {
		this.score++;
		
        if(this.id == 0)
            f.newPos();
        else
            f2.newPos();
	}
    
    this.legalDir = function() {
        return(!((this.ndir + 2) % 4 == this.dir));
    }
}

function Food(id) {
    this.id = id;
	this.x = Math.round(Math.random() * (fieldSize - 1));
	this.y = Math.round(Math.random() * (fieldSize - 1));
	
	this.newPos = function() {
		do{
			this.x = Math.floor(Math.random() * (fieldSize - 1));
			this.y = Math.floor(Math.random() * (fieldSize - 1));
		}while(!this.legalPos())
	}

	this.show = function() {
		fill(255,0,0);
		rect(this.x*r + this.id * h,this.y*r,r,r);
	}
	
	this.legalPos = function() {
        
        
    if(id ==0) {
		for(var i = 0; i < s.tail.length; i++) {
			if(this.x == s.tail[i][0] && this.y == s.tail[i][1])
				return false;
                
			}
		return true;
        
    }
    else {
        for(var i = 0; i < s2.tail.length; i++) {
			if(this.x == s2.tail[i][0] && this.y == s2.tail[i][1])
				return false;
                
			}
		return true;
        
        }
    }
}
    
function printScore() {
    textAlign(LEFT);
    textSize(r);
    fill(255);
    text("Score: " + s.score,r/4,r);
    text("Score: " + s2.score,h+r/4,r);
    textAlign(RIGHT);
    text("Highscore: "+ s.highscore, h-r/4,r);
    text("Highscore: "+ s2.highscore, 2*h-r/4,r);

    
    

}
