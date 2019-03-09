
//Decare variables
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
var wordChoice;

var word;
//you're cheating if you look at this!
var wordBank= ["Hot Dogs", "Popcorn", "Nachos", "Beer", "wine", "garlic fries", "a foul ball", "fun for the whole family"];

//core code block, starts new game or processes choice on each valid keystroke
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

//process key, determine if choice exists in array, reduce remaining letter count if so. Otherwise, reduce guess count.
//check for game over condition at the end. 
function processChoice(key, answer, valid) {
  if (valid.indexOf(key) > -1) {
    validPicked.push(key);
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
 
  
var randomSelectedNumber = Math.random() * wordBank.length;
  var randomIndex = Math.floor(randomSelectedNumber);
  //ensure previous word is not new word
  
   word = wordBank[randomIndex];
 wordChoice =word;
  word = word.toLowerCase();
  
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
   
      if (!larr.includes(curLetter)) {
        larr.push(curLetter.toString());
       
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
 }

function checkForGameOver(guesses, remaining) {
  if (guesses == 0) {
    alert("Game Over Man");
    document.getElementById("prompt").innerText = "GAME OVER! Press any key to load a new word";
    gameStarted = false;
    
  } else if (remaining === 0){
   
    document.getElementById("prompt").innerText = "Good Job! Press any key to load a new word";
    gameStarted = false;
    
  }
  if (gameStarted == false){
    spliceWordFromBank();
  }
  //put in check for letters remaining here. 
}
function spliceWordFromBank(){
var ix = wordBank.indexOf(wordChoice);
console.log(wordBank,wordChoice, ix);
wordBank.splice(ix,1);
console.log(wordBank);
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