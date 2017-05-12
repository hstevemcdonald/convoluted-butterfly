//setup letters
var playWord = '';

setupLetters();

setupListeners();

$(document).ready(function() {
  var wordArray = [];
  $('#submit').on('click', function() {
    if (wordArray.indexOf(playWord) != -1) {
      Materialize.toast('You already found that word', 3000);
      clearWord();
    } else if (playWord.length < 3) {
      Materialize.toast('Your word must have at least 3 letters', 3000);
      clearWord();
    } else if (!Word_List.isInList(playWord)) {
      Materialize.toast('That\'s not a word we know :-(, try again!', 3000);
    } else {
      wordArray.push(playWord);
      givePoints();
      addWord();
      clearWord();
    }
  });

  $('#clear').on('click', function() {
    clearWord();
  });

  $('#reset').on('click', function() {
    setupLetters(true);
    clearWord();
  });

  // start button
  $('#startButton').on('click', function() {
    $('#rightColumnStart').hide();
    $('#rightColumnGame').hide().removeClass('hide').fadeIn('slow');
    startTimer();
  });

  // play again
  $('#reStartButton').on('click', function() {
    $('#rightColumnTimeUp').hide();
    $('#rightColumnGame').hide().removeClass('hide').fadeIn('slow');
    setupLetters();
    clearWord();
    startTimer();
  });
});
