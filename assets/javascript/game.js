document.addEventListener("DOMContentLoaded", function(event) {


var guessesRemaining = 5;
var lettersRemaining  =0 ;
var gameStarted = false;
var wordToGuess = "";
var letterObj;
var score = 0;
var lettersPicked = [];
var validPicked  = [];
var answer = [];
var answerKey = [];

var wordBank = ["Hot Dogs", "Popcorn", "Nachos", "Beer", "wine", "garlic fries", "a foul ball"];


var letterPicked = '';


document.onkeyup = function () {
  letterPicked = event.key;
  letterPicked = letterPicked.toLowerCase();
  if (gameStarted) {
    var pattern = /^[a-z]$/i;

    if (pattern.test(letterPicked)) {

      if (lettersPicked.indexOf(letterPicked) > -1) {
        alert("Already picked that letter!");
      } else {
        processChoice(letterPicked, answer, answerKey);
      }
    }
  } else if (document.readyState == "complete" && gameStarted == false){
    
    gameStarted = true;
    guessesRemaining = 5;
    var x = document.getElementById("wordToGuess");
     document.getElementById("prompt").textContent = "Hint: Things you can get at a baseball game";
     document.getElementById("lettersPicked").textContent = "";
     document.getElementById("guessesRemaining").textContent = guessesRemaining;
    wordToGuess = getComputerChoice();
    letterObj = buildBoard(wordToGuess, answer);
    x.innerHTML = letterObj.board;
    answerKey = letterObj.validLetters;
    answer = letterObj.fullAnswer;
   lettersPicked = [];
validPicked  = [];

  }
}






function processChoice(key, answer, valid) {
  if (valid.indexOf(key) > -1) {
    rebuildBoard(key, answer);
    validPicked.push(key);
    lettersPicked.push(key);
  } else {
    document.getElementById("lettersPicked").textContent += " " + key;
    lettersPicked.push(key);
    guessesRemaining--;
    document.getElementById("guessesRemaining").textContent = guessesRemaining;
    checkForGameOver(guessesRemaining);
  }

}


function getComputerChoice() {
  var randomSelectedNumber = Math.random() * wordBank.length;
  var randomIndex = Math.floor(randomSelectedNumber);
  var word = wordBank[randomIndex];
  word = word.toLowerCase();
  // var wordArray = word.split(" ");
  // return wordArray;
  return word;
}

function buildBoard(compWord, letterBank) {

  var arr = compWord.split(" ");
var answerBoard = [];
  var strB = '';
  var larr = [];
  var fullArr = [];
  for (let i = 0; i < arr.length; i++) {
    var word = arr[i];
    for (let j = 0; j < word.length; j++) {
      strB += "_ ";
      var char = word.charAt(j);
      if (larr.indexOf(char == -1)) {
        larr.push(char);
      }
      fullArr.push(char);
      answerBoard.push("_ ");
    }
    strB += "&nbsp &nbsp &nbsp";
    answerBoard.push("   ");
  }

  var obj = {};
  obj.board = strB;
  obj.validLetters = larr;
  obj.fullAnswer = fullArr;
  return obj;
}

function rebuildBoard(key, answer) {

  for (let z = 0; z < answer.length; z++) {
    const element = answer[z];

  }

}

function checkForGameOver(guesses,remains){
  if (guesses==0){
    alert("Game Over Man");
    document.getElementById("prompt").innerText = "GAME OVER! Press any key to load a new word";
    gameStarted = false;

  }
}
});