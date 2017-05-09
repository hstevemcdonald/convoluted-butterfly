// setup letters

var playWord = "";

setupLetters();

setupListeners();

$(document).ready(function() {
	$("#submit").on("click", function() {
		givePoints();
		addWord();
		playWord = ""
		clearWord();

	});
	$("#clear").on("click", function() {
		playWord = "";
		clearWord();
	});
	$("#reset").on("click", function() {
		playWord = "";
		setupLetters();
		clearWord();
	});
});

console.log(playWord);
