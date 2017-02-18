var timeLeft = 10;
var wins = 0;
var level = 1;
var lettersGuessed = [];
var word = "";
var blanks = 0;
var lettersInWord = [];
var successes = [];
var riverHeight = 15;

/* easy dictionary of words */
var easyWords = ["ant", "anteater", "antelope", "bat", "bear", "beagle", "beaver", "bee", "beetle", "bird", "bulldog","bobcat", "bullfrog", "butterfly", "cat", "catfish", "camel", "cheetah", "chicken", "chipmunk", "cougar", "cow", "crab", "crane", "crocodile", "deer", "dingo", "dodo", "dog", "dolphin", "donkey", "duck", "eagle", "earwig", "eel","elephant", "emu", "falcon", "ferret", "fish", "flamingo", "flounder", "fly", "frog", "fox", "gorilla", "hornet", "leopard", "lion", "lizard", "monkey", "ostrich", "owl", "panther", "penguin", "rabbit", "seal","shark", "snake", "spider",  "squirrel", "tiger", "toad"];

var mdWords = ["aardvark", "albatross", "alligator", "abyssinian", "angelfish", "armadillo", "axolotl", "barnacle", "bison", "bloodhound", "bombay", "buzzard", "capybara", "caterpillar",  "centipede", "chameleon", "chihuahua", "chimpanzee", "chinchilla", "cocker spaniel", "cockroach","cuttlefish", "dormouse", "dragonfly", "rhinoceros", ];

var hardWords = ["adelie penguin", "affenpinscher", "arctic hare", "bearded dragon", "bengal tiger", "birds of paradise", "black bear", "black russian terrier", "black widow spider", "blue whale", "brown bear", "bumble bee", "butterfly fish", "clown fish", "darwins frog", "dusky dolphin", "dwarf crocodile", "electric eel", "emperor penguin", "elephent seal", "elephent shrew", "fennec fox", "fin whale", "fire-bellied toad", "flying squirrel",];

function startGame() {
    if (level === 1) {
	successes = [];
	lettersGuessed = [];
	timeLeft = 10;
	riverHeight = 15;
	
	word = easyWords[Math.floor(Math.random() * easyWords.length)];
	/* splits word into indivual leters and put into an array */
	// lettersInWord is array that contains each letter of word
	lettersInWord = word.split("");
	/* pushes a blank space for each letter */
	for (var i = 0; i < lettersInWord.length; i++) {
	    successes.push("_");
	}
	console.log(word);
	roundComplete();
    } // closes if statement inside startGame
    
    if (level === 2) {
	lettersGuessed = [];
	successes = [];
	riverHeight = 15;

	word = mdWords[Math.floor(Math.random() * mdWords.length)];
	lettersInWord = word.split("");
	for (var i = 0; i < lettersInWord.length; i++) {
	    successes.push("_");
	}
    }

    /* testing random word function */
    console.log(word);
    /* puts user info into html for user */
    document.getElementById("guessWord").innerHTML = successes.join(" ");
    document.getElementById("timeToFlood").innerHTML = timeLeft;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("level").innerHTML = level;
    document.getElementById("river").style.height = riverHeight + "px";
    
}; /* end function */

/* this is seeing if letter typed is in word */
function letterCheck(letter) {
   for (var i = 0; i < lettersInWord.length; i++){
       if (letter != lettersInWord[i] && !lettersGuessed.includes(letter) && !lettersInWord.includes(letter)) {
	   lettersGuessed.push(letter);
	   timeLeft--;
	   riverHeight += 15;
	   console.log(riverHeight);
	   
       } else if (lettersInWord[i] === letter) {
	   successes[i] = letter;
	   document.getElementById("guessWord").innerHTML = successes.join(" ");
	   
       } else {
	   
       } // close if statement
   } // close for loop

    
    document.getElementById("wrongLetters").innerHTML = lettersGuessed.join(" ");
    document.getElementById("timeToFlood").innerHTML = timeLeft;
    document.getElementById("river").style.height = riverHeight + "px";
    console.log("letters guessed: " + lettersGuessed);
    console.log("right letters: " + successes);
    roundComplete();
}; // closes letterCheck

function roundComplete() {
    if (wins === 3){
	level++;
	wins = 0;
	timeLeft = 10;
	console.log("level up");
	document.getElementById("level").innerHTML = level;
	document.getElementById("wins").innderHTML = wins;
	startGame();
	
    } else if (lettersInWord.join("") === successes.join("")) {
	wins++;
	console.log(lettersInWord);
	console.log(successes);
	document.getElementById("wins").innerHTML = wins;
	lettersGuessed = [];
	startGame();
	
    } else if (timeLeft === 0) {
	lettersGuessed = [];
	alert("You Lose!");
	startGame();
    } else {
    }
    
    document.getElementById("wrongLetters").innerHTML = lettersGuessed.join(" ");
    document.getElementById("timeToFlood").innerHTML = timeLeft;
    document.getElementById("river").style.height = riverHeight + "px";
};

document.onkeyup = function(event){
    if (event.keyCode >= 65 && event.keyCode <= 122) {
	var letterPicked = String.fromCharCode(event.keyCode).toLowerCase();
	console.log("letter picked, " + letterPicked);
	letterCheck(letterPicked);

    } else {
	alert("Not a letter");
    }
    
};



