var timeLeft = 10;
var wins = 0;
var level = 1;
var lettersGuessed = [];
var word = "";
var blanks = 0;
var lettersInWord = [];
var successes = [];
var height = "15px";

/* easy dictionary of words */
var easyWords = ["bear", "cat", "dog", "tiger", "lion", "monkey", "panther", "rabbit", "snake", "spider"];

var mdWords = ["aardvark", "ostrich", "dolphin"];

function startGame() {

    if (level === 1) {

	lettersGuessed = [];
	successes = [];
	
	
	word = easyWords[Math.floor(Math.random() * easyWords.length)];
	/* splits word into indivual leters and put into an array */
	// lettersInWord is array that contains each letter of word
	lettersInWord = word.split("");
	/* pushes a blank space for each letter */
	for (var i = 0; i < lettersInWord.length; i++) {
	    successes.push("_");
	}
    } // closes if statement inside startGame

    if (level === 2) {
	lettersGuessed = [];
	successes = [];
	timeLeft = 10;
	wins = 0;

	word = mdWords[Math.floor(Math.random() * mdWords.length)];
	lettersInWord = word.split("");
	for (var i = 0; i < lettersInWord.length; i++) {
	    successes.push("_");
	}
    }
	/* puts user info into html for user */
	document.getElementById("guessWord").innerHTML = successes.join(" ");
	document.getElementById("timeToFlood").innerHTML = timeLeft;
	document.getElementById("wins").innerHTML = wins;
	document.getElementById("level").innerHTML = level;
	document.getElementById("river").style.height = height;
	/* testing random word function */
	console.log(word);

} // closes Start Game

/* this is seeing if letter typed is in word */
function letterCheck(letter) {
   for (var i = 0; i < lettersInWord.length; i++){
       if (letter != lettersInWord[i] && !lettersGuessed.includes(letter) && !lettersInWord.includes(letter)) {
	   lettersGuessed.push(letter);
	   timeLeft--;
	   console.log(timeLeft);
	   document.getElementById("timeToFlood").innerHTML = timeLeft;
	   document.getElementById("wrongLetters").innerHTML = lettersGuessed.join(" ");
	   
       } else if (letter === lettersInWord[i]) {
	   successes[i] = letter;
	   document.getElementById("guessWord").innerHTML = successes.join(" ");
	   return true;
       } else {
	   roundComplete();
       } // close if statement
   } // close for loop
    roundComplete();
}; // closes letterCheck

document.getElementById("wrongLetters").innerHTML = lettersGuessed.join(" ");
console.log("letters guessed: " + lettersGuessed);
console.log("right letters: " + successes);


function roundComplete() {
    if (wins === 3){
	level++;
	console.log("level up");
	document.getElementById("level").innerHTML = level;
	startGame();
	
    } else if (lettersInWord.join("") === successes.join("")) {
	wins++;
	document.getElementById("wins").innerHTML = wins;
	startGame();
	
    } else if (timeLeft === 0) {
	alert("You Lose!");
	startGame();
    } else {
    }
}

startGame();

document.onkeyup = function(event){
    if (event.keyCode >= 65 && event.keyCode <= 122) {
    var letterPicked = String.fromCharCode(event.keyCode).toLowerCase();
    console.log("letter picked, " + letterPicked);
    letterCheck(letterPicked);
	roundComplete();
    } else {
	alert("Not a letter");
    }
    
};


