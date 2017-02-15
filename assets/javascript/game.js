var startGame = false;
var gameStarted = false;
var timeLeft = 0;
var wins = 0;
var level = 1;
var lettersGuessed = [];
var word = "";
var blanks = 0;
var lettersInWord = [];
var successes = [];

// easy dictionary of words
var easyWords = ["bear", "cat", "dog", "tiger", "lion", "monkey", "panther", "rabbit", "snake", "spider"]

function startGame() {

if (level = 1) {

    lettersGuessed = [];
    successes = [];
    timeLeft = 10;
    
    
    var word = easyWords[Math.floor(Math.random() * easyWords.length)];
    // splits word into indivual leters and put into an array
    lettersInWord = word.split("");
    // pushes a blank space for each letter
    for (var i = 0; i < lettersInWord.length; i++) {
	successes.push("_");
    }
    // puts user info into html for user
    document.getElementById("guessWord").innerHTML = successes.join(" ");
    document.getElementById("timeToFlood").innerHTML = timeLeft;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("level").innerHTML = level;
    // testing random word function
    console.log(word);
}
    // this is seeing if letter typed is in word
    function letterCheck(letter) {
	for (var i = 0; i < blanks; i++){
	    if (lettersInWord[i] === letter) {
		successes[i] = letter;
	    } else if (letter === lettersGuessed){
		timeLeft = timeLeft;
	    } else {
		lettersGuessed.push(letter);
		timeLeft = i--;
	    }
	}
    }
    function roundComplete() {
	document.getElementById("guessWord").innerHTML = successes.join(" ");
	document.getElementById("timeToFlood").innerHTML = timeToFlood;
	document.getElementById("wrongLetters").innerHTML = lettersGuessed.join(" ");

	if (word.join("") === successes.join("")) {
	    win ++;
	    document.getElementById("wins").innerHTML = wins;
	} else if (timeToFlood === 0) {
	    alert(You Lose!);
	    startGame();
	} else if (wins === 3){
	    level ++;
	}
	
    }
    
    startGame();
    document.onkeyup = function(event){
	var letterPicked =  String.fromCharCode(event.keyCode).toLowerCase();
	console.log("letter picked, " + letterPicked);
	letterCheck(letterPicked);
	roundComplete();
    }
    

