// setup letters

var playWord = "";

setupLetters();

setupListeners();

$(document).ready(function() {
	$("#submit").on("click", function() {
		givePoints();
		playWord = ""
	});
	$("#clear").on("click", function() {
		playWord = "";
		//clear the letters to be original color;
	});
	$("#reset").on("click", function() {
		playWord = "";
		//clear the letters to be original colot;
		setupLetters();
	});
});

console.log(playWord);
