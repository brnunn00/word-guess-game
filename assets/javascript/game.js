
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
var gamesWon = 0;
var gamesLost = 0;
var gameRunning =false;

var word;
//you're cheating if you look at this!
var wordBank= ["Hot Dogs", "Popcorn", "Nachos", "Beer", "wine", "garlic fries", "a foul ball", "fun for the whole family"];
// var wordBank= ["aa", "bb"];

//core code block, starts new game or processes choice on each valid keystroke
document.onkeyup = function () {
  letterPicked = event.key;
  letterPicked = letterPicked.toLowerCase();
  if (gameStarted && gameRunning) {
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
if (gameRunning == false){
  var h5 = document.createElement("h5");
  h5.setAttribute("id", "gamesWon");
  h5.textContent= "Games Won: 0";
  var winCounter = document.getElementById("gamesWonCont");
  winCounter.appendChild(h5);


  var h5Lost = document.createElement("h5");
  h5Lost.setAttribute("id", "gamesLost");
  h5Lost.textContent= "Games Lost: 0";
var lossCont = document.getElementById("gamesLostCont");
lossCont.appendChild(h5Lost);


gameRunning = true;

// var lossCounter  = document.getElementById("gamesWon");
// lossCounter.appendChild(node);
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
var resultStr = '';
  if (gameStarted == false){
    newGame();
    
  }
  if (guesses == 0) {
   
        gameStarted = false;
    gamesLost++;
    resultStr += "Dang, all out of guesses :(";
    document.getElementById("gamesLost").innerText = "Games Lost: " + gamesLost;
    
  } else if (remaining === 0){
   
    
    gameStarted = false;
    gamesWon++;
    resultStr += "You got it!";
    playAudio()
    document.getElementById("gamesWon").innerText ="Games Won: " + gamesWon;
  }
  
  
    if (gameStarted == false){
    spliceWordFromBank();
  }
  if (gameStarted == false && wordBank.length ==0){
    
    endGame();
  } else if (gameStarted == false){
    resultStr += " Press any key to begin a new word.";
    document.getElementById("prompt").textContent = resultStr;
  }
 
  //put in check for letters remaining here. 
}
function spliceWordFromBank(){
  if (wordBank.length >0){
var ix = wordBank.indexOf(wordChoice);
wordBank.splice(ix,1);

  } 
}
function newGame(){
  gameStarted = true;
  // gameRunning = true;
  guessesRemaining = 5;
  var x = document.getElementById("wordToGuess");
  document.getElementById("prompt").textContent = "Hint: Things you can get at a baseball game";
  document.getElementById("lettersPicked").textContent = "Incorrect Letters Picked: ";
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

function endGame(){
  var eit = document.createElement("h2");
  eit.setAttribute("id", "gamesLost");
  eit.textContent= "GAME OVER! Thanks for playing! Reload the page to begin the thrill ride anew!";
var gOver = document.getElementById("gameOverMan");
gOver.appendChild(eit);

  gameRunning = false;
}

function playAudio(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}