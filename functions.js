var points = 0;
var playWordPoints = 0;
var timeLeft = 60;
var timer;
var maxWordLength = 10;

/**
 * Functions for Bossggle
 */

function getLetter() {
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters.substr(Math.random() * letters.length, 1);
}

// setup letter grid
function setupLetters(disableReset) {
  var used = [];
  var str = "";
  var blocks = document.getElementsByClassName("letter");

  for (var idx = 0; idx < 16; idx++) {
    var letter = getLetter();
    while (used[letter]) {
      letter = getLetter();
    }
    used[letter] = 1;
    blocks[idx].innerText = letter;
    blocks[idx].setAttribute("index", idx);
  }
  console.log(blocks);

  // clear game
  if (!disableReset) {
    $(".wordAndScoreRow:not(:last)").remove();
    $("#score").text(0);
  }
}

// listen and update word in play
function setupListeners() {
  var elements = document.getElementsByClassName("letterHolder");
  var innerElements = document.getElementsByClassName("innerLetterHolder");
  for (var idx = 0; idx < elements.length; idx++) {
    var o = elements[idx];
    var io = innerElements[idx];

    o.onclick = function (event) {
      var element = event.target || event.srcElement;
      var letter, index, setOuterElement = false, pickElement = element;

      if (!element.getAttribute("index")) {
        pickElement = element.getElementsByClassName("innerLetterHolder")[0];
      } else {
        setOuterElement = true;
      }

      index = pickElement.getAttribute("index");
      letter = pickElement.textContent.replace(/[^\x00-\x7F]/g, "");

      if (checkLen(playWord) && isAdjacentTo(index)) {
        element.classList.remove("yellow");
        element.classList.add("orange");
        if (setOuterElement)
        {
          element.parentNode.classList.remove("yellow");
          element.parentNode.classList.add("orange");
        } else {
          pickElement.classList.remove("yellow");
          pickElement.classList.add("orange");
        }
        setLetter(letter);
      }
    }
  }

  // check if letter is adjacent
  function isAdjacentTo(index)
  {
    console.log("check if adjacent to " + index);
    return true;
  }

  // set letter
  function setLetter(letter) {
    playWord += letter;
    var playWordEl = document.getElementById("playWord");
    playWordEl.innerText = playWord;
  }

  // check length
  function checkLen(word) {
    var result = true;
    if (word && word.length >= maxWordLength) {
      Materialize.toast("Words can only be 10 letters in length.", 3000);
      result = false;
    }
    return result;
  }
}

function clearWord() {
  var elements = document.getElementsByClassName("letter");
  for (var idx = 0; idx < elements.length; idx++) {
    var el = elements[idx];
    el.parentNode.classList.remove("orange");
    el.parentNode.classList.add("yellow");
    el.classList.remove("orange");
    el.classList.add("yellow");
  }
  var playWordEl = document.getElementById("playWord");
  playWordEl.innerText = "";
  playWord = "";


}

var givePoints = function () {
  playWordPoints = 9 * playWord.length;
  points += playWordPoints;
  $("#score").html(points);
}

var addWord = function () {
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

// start/restart timer

function startTimer() {
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(function () {
    timeLeft--;
    showTime(timeLeft);
    if (timeLeft == 0) {
      clearInterval(timer);
      $("#scoreResult").text(points);
      $("#rightColumnGame").fadeOut("slow");
      $("#rightColumnTimeUp").removeClass("hide").fadeIn("slow");
    }
  }, 1000)
}

function showTime(t) {
  $("#timerTime").html(moment(t, "ss").format("m:ss"));
}

