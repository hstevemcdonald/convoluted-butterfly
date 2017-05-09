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

    console.log(used)

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

