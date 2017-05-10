// setup letters

var playWord = "";

setupLetters();

setupListeners();

$(document).ready(function() {
	$("#submit").on("click", function() {
		playWord = playWord.toLowerCase();
		if  (playWord.length < 3) {
			Materialize.toast("Your word must have at least 3 letters", 3000);
			clearWord();		
		} else if (!isBasicWord(playWord)) {
			Materialize.toast("That's not a word we know :-(, try again!", 3000);
		} else {
			givePoints();
			addWord();
			clearWord();
		}
	});
	$("#clear").on("click", function() {
		clearWord();
	});
	$("#reset").on("click", function() {
		setupLetters();
		clearWord();
	});
});

console.log(playWord);
