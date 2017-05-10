var points = 0;
var playWordPoints = 0;

/**
 * Functions for Bossggle
 */

function getLetter()
{
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters.substr(Math.random() * letters.length, 1);
}

// setup letter grid
function setupLetters()
{
    var used = [];
    var str = "";
    var blocks = document.getElementsByClassName("letter");

    for (var idx = 0; idx < 16; idx ++)
    {
        var letter = getLetter();
        while (used[letter])
        {
            letter = getLetter();
        }
        used[letter] = 1;
        blocks[idx].innerText = letter;
    }
}

// listen and update word in play
function setupListeners()
{
    var elements = document.getElementsByClassName("letter");
    for (var idx = 0 ;idx < elements.length; idx++)
    {
        var o = elements[idx];
        o.onclick = function(event)
        {
            var el = event.target || event.srcElement;
            var letter = el.innerText.replace(/[^\x00-\x7F]/g, "");

            el.parentNode.classList.remove("yellow");
            el.parentNode.classList.add("orange");

            playWord += letter;
            var playWordEl = document.getElementById("playWord");
            playWordEl.innerText = playWord
        }
    }
}

function clearWord() {
    var elements = document.getElementsByClassName("letter");
    for (var idx = 0 ;idx < elements.length; idx++)
    {
        var el = elements[idx];
        el.parentNode.classList.remove("orange");
        el.parentNode.classList.add("yellow");
    }
    var playWordEl = document.getElementById("playWord");
    playWordEl.innerText = "";
    playWord = "";


}

var givePoints = function() {
    playWordPoints = 9 * playWord.length;
    points += playWordPoints;
    $("#score").html(points);
}

var addWord = function() {
    //clone row
    //add current word to word column and score to score column - 1 row
    //prepend these
    //show
    var element = $(".wordAndScoreRow:last").clone();
    element.removeClass("hide");
    element.find(".word").html(playWord);
    element.find(".wordScore").html(playWordPoints);
    $("#wordList").prepend(element);
}

