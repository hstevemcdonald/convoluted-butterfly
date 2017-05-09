var points = 0;

var givePoints = function() {
	var playWordPoints = 0;
	playWordPoints = 9 * playWord.length;
	$("#wordScore").html(playWordPoints);
	points += playWordPoints;
	$("#score").html(points);
}
