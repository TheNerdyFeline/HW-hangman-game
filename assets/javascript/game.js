var timeLeft = 10;
var wins = 0;
var level = 1;
var lettersGuessed = [];
var word = "";
var blanks = 0;
var lettersInWord = [];
var successes = [];
var riverHeight = 15;
document.getElementById("pic1").style.visibility = "hidden";
document.getElementById("pic2").style.visibility = "hidden";
document.getElementById("pic3").style.visibility = "hidden";
document.getElementById("pic4").style.visibility = "hidden";
document.getElementById("pic5").style.visibility = "hidden";
document.getElementById("pic6").style.visibility = "hidden";

/* easy dictionary of words */
var easyWords = ["ant", "anteater", "antelope", "bat", "bear", "beagle", "beaver", "bee", "beetle", "bird", "bulldog","bobcat", "bullfrog", "butterfly", "cat", "catfish", "camel", "cheetah", "chicken", "chipmunk", "cougar", "cow", "crab", "crane", "crocodile", "deer", "dingo", "dodo", "dog", "dolphin", "donkey", "duck", "eagle", "earwig", "eel","elephant", "emu", "falcon", "ferret", "fish", "flamingo", "flounder", "fly", "frog", "fox", "gorilla", "hornet", "leopard", "lion", "lizard", "monkey", "ostrich", "owl", "panther", "penguin", "rabbit", "seal","shark", "snake", "spider",  "squirrel", "tiger", "toad"];

var mdWords = ["aardvark", "albatross", "alligator", "abyssinian", "angelfish", "armadillo", "axolotl", "barnacle", "bison", "bloodhound", "bombay", "buzzard", "capybara", "caterpillar",  "centipede", "chameleon", "chihuahua", "chimpanzee", "chinchilla", "cocker spaniel", "cockroach","cuttlefish", "dormouse", "dragonfly", "rhinoceros"];

var hardWords = ["adelie penguin", "affenpinscher", "arctic hare", "bearded dragon", "bengal tiger", "birds of paradise", "black bear", "black russian terrier", "black widow spider", "blue whale", "brown bear", "bumble bee", "butterfly fish", "clown fish", "darwins frog", "dusky dolphin", "dwarf crocodile", "electric eel", "emperor penguin", "elephent seal", "elephent shrew", "fennec fox", "fin whale", "fire bellied toad", "flying squirrel"];

function startGame() {
    if (level === 1) {
	successes = [];
	lettersGuessed = [];
	timeLeft = 10;
	riverHeight = 15;
	document.getElementById("pic1").style.visibility = "visible";
	document.getElementById("pic2").style.visibility = "hidden";
	document.getElementById("pic3").style.visibility = "hidden";
	document.getElementById("pic4").style.visibility = "hidden";
	document.getElementById("pic5").style.visibility = "hidden";
	document.getElementById("pic6").style.visibility = "visible";
	
	word = easyWords[Math.floor(Math.random() * easyWords.length)];
	/* splits word into indivual leters and put into an array */
	// lettersInWord is array that contains each letter of word
	lettersInWord = word.split("");
	/* pushes a blank space for each letter */
	for (var i = 0; i < lettersInWord.length; i++) {
	    successes.push("_");
	}
	document.getElementById("guessWord").innerHTML = successes.join(" ");
	console.log(word);
	roundComplete();
    };

    if (level === 2) {
	lettersGuessed = [];
	successes = [];
	riverHeight = 15;
	
	document.getElementById("pic1").style.visibility = "visible";
	document.getElementById("pic2").style.visibility = "hidden";
	document.getElementById("pic3").style.visibility = "visible";
	document.getElementById("pic4").style.visibility = "hidden";
	document.getElementById("pic5").style.visibility = "visible";
	document.getElementById("pic6").style.visibility = "visible";

	word = mdWords[Math.floor(Math.random() * mdWords.length)];
	lettersInWord = word.split("");
	for ( i = 0; i < lettersInWord.length; i++) {
	    successes.push("_");
	    document.getElementById("guessWord").innerHTML = successes.join(" ");
	}

	console.log(word);
	
	
    };

    if (level === 3) {
	lettersGuessed = [];
	successes = [];
	riverHeight = 15;
	
	document.getElementById("pic1").style.visibility = "visible";
	document.getElementById("pic2").style.visibility = "visible";
	document.getElementById("pic3").style.visibility = "visible";
	document.getElementById("pic4").style.visibility = "visible";
	document.getElementById("pic5").style.visibility = "visible";
	document.getElementById("pic6").style.visibility = "visible";

	word = hardWords[Math.floor(Math.random() * mdWords.length)];
	lettersInWord = word.split("");
	for (i = 0; i < lettersInWord.length; i++) {
	    if (lettersInWord[i] === " ") {
		successes.push(" ");
	    } else {
		successes.push("_");
	    }

	    document.getElementById("guessWord").innerHTML = successes.join("");
	console.log(word);
    };

    document.getElementById("timeToFlood").innerHTML = timeLeft;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("level").innerHTML = level;
    document.getElementById("river").style.height = riverHeight + "px";
    
    }
};/* end function */

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

    roundComplete();
    document.getElementById("wrongLetters").innerHTML = lettersGuessed.join(" ");
    document.getElementById("timeToFlood").innerHTML = timeLeft;
    document.getElementById("river").style.height = riverHeight + "px";
    console.log("letters guessed: " + lettersGuessed);
    console.log("right letters: " + successes);

}; // closes letterCheck

function roundComplete() {
    if (lettersInWord.join("") === successes.join("")) {
	wins++;
	console.log(lettersInWord);
	console.log(successes);
	lettersGuessed = [];
	startGame();
	document.getElementById("wins").innerHTML = wins;
	
    } else if (level === 1 && wins === 2) {
	level++;
	timeLeft = 10;
	console.log("level up");
	alert("You win level 1 and saved 2 animals!");
	startGame();
	
    } else if (level === 2 && wins === 6) {
	level++;
	timeLeft = 8;
	alert("You win level 2 and saved 4 animals");
	startGame();
	
    } else if (level === 3 && wins === 12) {
	alert("You Win!! You have saved all the animals!!!");

    } else if (timeLeft === 0) {
	lettersGuessed = [];
	alert("You Lose!");
	startGame();
    }

    
    document.getElementById("level").innerHTML = level;
    document.getElementById("wins").innderHTML = wins;
    document.getElementById("wrongLetters").innerHTML = lettersGuessed.join(" ");
    document.getElementById("timeToFlood").innerHTML = timeLeft;
    document.getElementById("river").style.height = riverHeight + "px";

}; // close function

document.onkeyup = function(event){
    if (event.keyCode >= 65 && event.keyCode <= 122) {
	var letterPicked = String.fromCharCode(event.keyCode).toLowerCase();
	console.log("letter picked, " + letterPicked);
	letterCheck(letterPicked);

    } else {
	alert("Not a letter");
    }
    
};



