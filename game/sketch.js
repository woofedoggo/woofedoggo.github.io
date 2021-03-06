var snake;
var pixel_size = 20;
var shots = [];
var movement = [];
var highscore = 0;
var gameState = 'init';

function setup(){
  createCanvas(600, 600);
  frameRate(13);
}

function initGame(){
	background(0);
	var name = 'Snake Game';
	textSize(50);
	fill(0,255,255);
	nameWidht = textWidth(name);
	text(name, (width - nameWidht)/2, height/2 - 40);
	var descp = 'Press ENTER To Start';
	textSize(25);
	fill(0,255,0);
	descpWidth = textWidth(descp);
	text(descp, (width - descpWidth)/2, height/2 + 60);
	startBtn = createButton('Start Game');
	startBtn.position(width/2 - startBtn.width/2, height/2);
	startBtn.mousePressed(startGame);
	noLoop();

	if(keyPressed(keyCode === ENTER)){
		startGame();
	}
}

function startGame(){
	removeElements();
	gameState = 'play';
	snake = new Snake();
	setJelloShots(1);
	loop();
}

function runGame(){
	background(40,40,40);
	textSize(22);
	fill(255);
	text("Score: " + snake.tail.length, 1, 18);
	textSize(12);
	text("Highscore: " + highscore, 1, 32);

	snake.update();
	snake.show();
	snake.checkDeath();

	fill(255,0,0);
	for(var i=0;i<shots.length;i++){
		rect(shots[i].x, shots[i].y, pixel_size, pixel_size);
		if(snake.eat(shots[i])){
			snake.tail.push(createVector(snake.x, snake.y));
			shots.splice(i, 1);
			setJelloShots(1);
			if(snake.tail.length > highscore) highscore = snake.tail.length;
		}	
	}
}

function endGame(){
	background(0);
	//gameover
	textSize(32);
	var msg = 'Game Over';
	fill(255,0,0);
	msgWidht = textWidth(msg);
	text(msg, (width - msgWidht)/2, height/2 - 40);
	//score
	var score = 'Your Score is ' + snake.tail.length;
	scoreWidht = textWidth(score);
	fill(255);
	text(score, (width - scoreWidht)/2, height/2);
	//highscore
	textSize(20);
	var Hscore = 'Highest Score is ' + highscore;
	HscoreWidht = textWidth(Hscore);
	fill(255);
	text(Hscore, (width - HscoreWidht)/2, height/2 + 25);
	var descp = 'Press ENTER To Start';
	textSize(18);
	fill(0,255,0);
	descpWidth = textWidth(descp);
	text(descp, (width - descpWidth)/2, height/2 + 100);
	startBtn = createButton('Restart Game');
	startBtn.position(width/2 - startBtn.width/2, height/2 + 40);
	startBtn.mousePressed(startGame);
	noLoop();
}

function draw(){
	if(gameState == 'init'){
		initGame();
	}
	else if(gameState == 'play'){
		runGame();
	}
	else if(gameState == 'end'){
		endGame();
	}
}

function setJelloShots(num){
  var cols = floor(width / pixel_size);
  var rows = floor(height / pixel_size);
  for(var i=0;i<num;i++){
    var location = createVector(floor(random(cols)), floor(random(rows))).mult(pixel_size);
    while(snake_intersect(location)){
      location = createVector(floor(random(cols)), floor(random(rows))).mult(pixel_size);
    }
    shots.push(location);
  }
}

function snake_intersect(location){
  var intersect = false;
  if(location.x == snake.pos.x && location.y == snake.pos.y){
    intersect = true;
  }else{
    for(var i=0;i<snake.tail.length;i++){
      if(location.x == snake.tail[i].x && location.y == snake.tail[i].y){
        intersect = true;
        break;
      }
    }
    for(var i=0;i<shots.length;i++){
      if(location.x == shots[i].x && location.y == shots[i].y){
        intersect = true;
        break;
      }
    }
  }
  return intersect;
}

function keyPressed(){
  if(gameState=='init' || gameState=='end'){
  	if(keyCode === ENTER){
  	startGame();
 	}
 }
 else if(gameState=='play'){
  if(keyCode === DOWN_ARROW){
    movement.push([0, 1]);
  }else if(keyCode === UP_ARROW){
    movement.push([0, -1]);
  }else if(keyCode === LEFT_ARROW){
    movement.push([-1, 0]);
  }else if(keyCode === RIGHT_ARROW){
    movement.push([1, 0]);
  }
 }
}
