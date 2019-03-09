

var guessesRemaining = 5;
var lettersRemaining = 0;
var gameStarted = false;
var wordToGuess = "";
var letterObj;
var score = 0;
var lettersPicked = [];
var validPicked = [];
var answer = [];
var answerKey = [];
var remaniningArr = [];



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
  } else if (document.readyState == "complete" && gameStarted == false) {

    newGame();
  
  }
}
function processChoice(key, answer, valid) {
  if (valid.indexOf(key) > -1) {

    validPicked.push(key);
    // lettersRemaining--;
    lettersPicked.push(key);
    lettersRemaining = (answerKey.length - validPicked.length) 
    rebuildBoard(validPicked);
  } else {
    document.getElementById("lettersPicked").textContent += " " + key;
    lettersPicked.push(key);
    guessesRemaining--;
    document.getElementById("guessesRemaining").textContent = guessesRemaining;

  }
  checkForGameOver(guessesRemaining, lettersRemaining);
}


function getComputerChoice() {
  //Don't look at this, it's cheating!
var wordBank= ["Hot Dogs", "Popcorn", "Nachos", "Beer", "wine", "garlic fries", "a foul ball"];
  
var randomSelectedNumber = Math.random() * wordBank.length;
  var randomIndex = Math.floor(randomSelectedNumber);
  var word = wordBank[randomIndex];
  word = word.toLowerCase();
  // var wordArray = word.split(" ");
  // return wordArray;
  return word;
}

function buildBoard(compWord) {


  var strB = '';
  var larr = [];
  var fullArr = [];
  var lettersTotal =0;

  for (let i = 0; i < compWord.length; i++) {
    const curLetter = compWord[i];
    if (curLetter === ' ') {
      strB += "&nbsp";
    } else {
      strB += "_ ";
      console.log(larr.indexOf(curLetter.toString() === -1));
      if (!larr.includes(curLetter)) {
        larr.push(curLetter.toString());
        console.log(larr);
      }
    }
    fullArr.push(curLetter);

  }
  var obj = {};
  obj.board = strB;
  obj.validLetters = larr;
  obj.letterCount = larr.length;
  obj.fullAnswer = fullArr;
  return obj;
}

function rebuildBoard(correctLetters) {
  var boardStr = '';
  for (let z = 0; z < answer.length; z++) {
    if (answer[z] == " ") {
      boardStr += " ";
    } else if (correctLetters.indexOf(answer[z]) > -1) {
      boardStr += answer[z];
    } else {
      boardStr += "_ ";
    }

  }
  document.getElementById("wordToGuess").textContent = boardStr;
  // document.getElementById("lettersRemaining").textContent = lettersRemaining;


}

function checkForGameOver(guesses, remaining) {
  if (guesses == 0) {
    alert("Game Over Man");
    document.getElementById("prompt").innerText = "GAME OVER! Press any key to load a new word";
    gameStarted = false;
    return true;
  } else if (remaining === 0){
    alert("You Win!");
    document.getElementById("prompt").innerText = "Good Job! Press any key to load a new word";
    gameStarted = false;
    return true;
  }
  //put in check for letters remaining here. 
}

function newGame(){
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
  
  lettersRemaining = letterObj.letterCount;
  // document.getElementById("lettersRemaining").textContent = lettersRemaining;
  lettersPicked = [];
  validPicked = [];
}