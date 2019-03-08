<!DOCTYPE html>
<html lang="en-us">

<head>
  <meta charset="UTF-8">
  <title>Rock Paper Scissors Part 1</title>
</head>

<body>

  <div id="game">

  </div>

  <script type="text/javascript">
    // Whenever a key is pressed, alert "pressed a button".
    // document.onkeyup = function() {
    //   alert("pressed a button");
    // };

    // Programming in English!!!! WHAAAAAA??!?!!?!

    /*
    ** This is all about how a player would make a choice
    */

    // What are the choices?
    // [r, p, s]
    // How do we take user input?
    // document.onkeyup event?
    // prompt?

    // What happens if user makes a bad choice?
    // Alert "Please only choose r, p or s."

    /*
    ** Player choice pseudocode
    */

    // choices = [r, p, s]
    // a function: getPlayerChoice
    // give some instruction
    // prompt for value
    // return value

    var choices = ['r', 'p', 's'];

    function getPlayerChoice() {
      return prompt('Choose from "r" (rock), "p" (paper), "s" (scissors)');
    }

    function isPlayerChoiceValid(playerChoice) {
      return choices.indexOf(playerChoice) !== -1;
    }

    /*
    ** Computer choice
    */

    // Function getComputerChoice
    // Choose a random number based on length of choices
    // Truncate number to make an index (because it isn't an integer)
    // Choose value from choices using random index
    // return choice

    function getComputerChoice() {
      var randomSelectedNumber = Math.random() * choices.length;
      var randomIndex = Math.floor(randomSelectedNumber);

      return choices[randomIndex];
    }

    // Compare values
    // function isThisAWinner
    // choose winning scenarios:
    // [[r, s], [s, p], [p, r]]
    // check if combination is in winning scenarios
    // loop through winning scenarios
    // compare choice1 to scenarioArray[0]
    // compare choice2 to scenarioArray[1]

    var winningScenarios = [
      ['r', 's'],
      ['s', 'p'],
      ['p', 'r']
    ];

    function checkWinningCombination(choice1, choice2, scenario) {
      return scenario[0] === choice1 && scenario[1] === choice2;
    }

    function isWinningCombination(choice1, choice2) {
      for (let scenarioIndex = 0; scenarioIndex < winningScenarios.length; scenarioIndex++) {
        var isWinner = checkWinningCombination(choice1, choice2, winningScenarios[scenarioIndex]);

        if (isWinner) {
          return true;
        }
      }

      return false;
    }

    function alertWinner(playerChoice, computerChoice) {
      alert(playerChoice + computerChoice);

      var playerIsWinner = isWinningCombination(playerChoice, computerChoice);
      var computerIsWinner = isWinningCombination(computerChoice, playerChoice);

      if (playerIsWinner) {
        alert('You won!');
      } else if (computerIsWinner) {
        alert('The computer won.');
      } else {
        alert('It was a tie.');
      }
    }

    // Run program
    function playRPS() {
      var playerChoice = getPlayerChoice().toLowerCase();
      var playerChoiceIsValid = isPlayerChoiceValid(playerChoice);

      if (playerChoiceIsValid) {
        var computerChoice = getComputerChoice();

        alertWinner(playerChoice, computerChoice);
      } else {
        alert('Please make sure to only choose "r", "p", or "s"');
      }

      if (confirm('Play again?')) {
        playRPS();
      }
    }

    playRPS();

  </script>

</body>

</html>
