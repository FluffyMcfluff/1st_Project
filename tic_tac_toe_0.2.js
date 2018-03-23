function setup() {
	createCanvas(displayWidth, displayHeight);
	initRound();
	toggleRoundNumber(0);
}

function addScore(result){
	if (result == 1){
		p1Score ++;
	} else if (result == 2){
		p2Score ++;
	}
}

function drawScores() {
	fill(255);
	textSize(24);
	textAlign(CENTER);
	var p1 = "Player_1_Score:" + p1Score;
	text(p1, 75, scale*rows + 15, 50, 50);

	var p2 = "Player_2_Score:" + p2Score;
	text(p2, 350, scale*rows + 15, 50, 50);
}

function draw() {
	background(0);
	drawCellGrid();
	drawStates();
	drawRoundNumber();
	drawScores();
}

function drawRoundNumber(){
		if (roundNumberToggle === true){
		fill(255);
		textSize(50);
		textAlign(CENTER);
		var s = "round_" + roundNumber;
		text(s, scale*rows/2, scale*rows/2, 50, 50);
	}
}


let rows = 5;
let cols = 5;
let cells = [];
let scale = 100;
let turn = true;
let turnCount = 0;
let roundNumber = 1;
let roundNumberToggle = false;
let p1Score = 0;
let p2Score = 0;
let roundWinner = 0;
let winRowLength = 5;

function toggleRoundNumber(){
	roundNumberToggle = true


	function toggleOff(){
		roundNumberToggle = false;
		roundNumber ++;
	}
	setTimeout(toggleOff, 1000);
	//i need a toggle that starts before setTimeout and ends afterwards
}

function initRound() {
	turnCount = 0;
	turn = true;
	for (let i = 0; i < rows; i++){
		cells[i]=[];
		for (let j = 0; j < cols; j++){
		cells[i][j] = new Cell(0, i, j, scale);
		}
	}
}

function drawCellGrid() {
	stroke(255);
	noFill();
	for (let i = 0; i < rows; i++){
		for (let j = 0; j < cols; j++){
		rect(i * scale, j * scale, scale - 1, scale - 1);
		}
	}
}

function drawStates(){
	stroke(255);
	noFill();
	for (let i = 0; i < rows; i++){
		for (let j = 0; j < cols; j++){
			if (cells[i][j] == 1) {
				rect(i * scale + (scale * 0.25), j * scale + (scale * 0.25), scale / 2, scale / 2);
			} else if (cells[i][j] == 2) {
				ellipse(i * scale + (scale * 0.5), j * scale + (scale * 0.5), scale / 2, scale / 2);
			}
		}
	}
}



function mousePressed(){
	if (roundNumberToggle === true){
		initRound();
		roundNumberToggle = false;
	} else {
		for (let i = 0; i < rows; i++){
			for (let j = 0; j < cols; j++){
				if ((mouseX >= i * scale && mouseX <= i * scale + scale) && (mouseY >= j * scale && mouseY <= j * scale + scale)) {
					takeTurn(i, j, turn);
					//console.log("test");
					//console.log(cells[i][j]);

				}
			}
		}
	}
}

function takeTurn(x, y, value){
	//console.log(`clicked cell ${x}${y} of value ${cells[x][y]}`);
	if (cells[x][y].state == 0){
		if (value === true){
			cells[x][y] = 1;
		} else {
			cells[x][y] = 2;
		}

		let checker = 0;
		let checkCount;
	//check vertical

		for (let i = 0; i < cols; i++){
			checker = cells [x][y];
			checkCount = 0;
			for (let j = 0; j < rows; j++){
				if (cells [i][j] == checker){
					checkCount ++;
				}
				if (checkCount >= winRowLength){
					addScore(checker);
					console.log(`Game Over. Player ${checker} won with a vertical line on column ${i+1} .`)
					toggleRoundNumber();
					setTimeout(initRound, 1000);
				}
			}
		}


	//check horizontal

		for (let i = 0; i < cols; i++){
			checker = cells [x][y];
			checkCount = 0;
			for (let j = 0; j < rows; j++){
				if (cells [j][i] == checker){
					checkCount ++;
				}
				if (checkCount >= winRowLength){
					addScore(checker);
					console.log(`Game Over. Player ${checker} won with a horizontal line on row ${j+1}.`);
					toggleRoundNumber();
					setTimeout(initRound, 1000);
				}
			}
		}

	//check diagonal tl-br
		checker = cells [x][y];
		checkCount = 0;
		for (let j = 0; j < rows; j++){
			if (cells [j][j] == checker){
				checkCount ++;
			}
			if (checkCount >= winRowLength){
				addScore(checker);
				 console.log(`Game Over. Player ${checker} won with a diagonal line from top left to bottom right.`)
				 toggleRoundNumber();
				 setTimeout(initRound, 1000);
			}
		}

	//check diagonal tr-bl

		checker = cells[x][y];
		checkCount = 0;
		for (let i = rows-1, j = 0; i >= 0; i--, j ++){
			if (cells [i][j] == checker){
				checkCount ++;
			}
			if (checkCount >= winRowLength){
				addScore(checker);
				 console.log(`Game Over. Player ${checker} won with a diagonal line on from top right to bottom left.`)
				 toggleRoundNumber();
				 setTimeout(initRound, 1000);
			}
		}




		// check for diagonal cases here
	/*
		for (let i = 0; i < rows; i++){
			for (let j = 0; j < cols; j++){
			}
		}
		for (let i = 0; i < rows; i++){
			for (let j = 0; j < cols; j++){
			}
		}
		for (let i = 0; i < rows; i++){
			for (let j = 0; j < cols; j++){
			}
		}
	*/

		turn = !turn;
		turnCount ++;
		if (turnCount >= (rows * cols)){
			console.log(`Game Over. There was a tie.`);
			toggleRoundNumber();
			setTimeout(initRound, 1000);
		}
	}
}


class Cell {
	constructor(state, xInd, yInd, scale){
		this.state = state;
		this.xInd = xInd;
		this.yInd = yInd;
		this.scale = scale;
	}
}
/*
3x3 grid
nested for loop?
some way of testing whether
if

each cell has a state of 0, 1 or 2

game starts empty
user goes first
other player goes 2nd
*/

function resetGame(){

}
