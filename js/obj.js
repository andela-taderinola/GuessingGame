
var hiddenNumber = Math.round(Math.random() * 100);
console.log('I have picked a number bewteen 1 and 100');
    console.log(hiddenNumber);
var previousGuess = null;
var guessNumber = 0;
var guess;
var feedbackMsg;

var GuessingGame = {
  checkButton: document.getElementById('check'),
  newGameButton: document.getElementById('new-game'),
  guessInput: document.getElementById('guess-input'),
  feedbackLabel: document.getElementById('feedback'),

  chooseNumber: function() {
    GuessingGame.guessInput.value = "";
    GuessingGame.checkButton.disabled = false;
    hiddenNumber = Math.round(Math.random() * 100);
    console.log('I have picked a number bewteen 1 and 100');
    console.log(hiddenNumber);
    return hiddenNumber;
  },

  checkGuess: function() {
    var input = GuessingGame.guessInput.value;
    console.log(hiddenNumber);
    guess = parseInt(input);

    if(isNaN(guess) || guess > 100 || guess < 0) {
    GuessingGame.feedbackLabel.innerText = "That is not a valid guess.";
    // GuessingGame.giveFeedback(feedbackMsg);
    return;
    }  

    GuessingGame.guessInput.value = "";
    guessNumber++; 

    console.log("Your guess is " + guess);
    console.log("Your last guess was " + previousGuess);
    
    if(guess !== hiddenNumber) {

      if(previousGuess === null){
        previousGuess = guess;
        GuessingGame.feedbackLabel.innerText = "Nah...nice try. Try again!";
      } else if(previousGuess === guess) {
        GuessingGame.feedbackLabel.innerText = "Didn't I tell you that was a wrong guess?! You've gotta do better than this!";
        // previousGuess = guess;
      } else {
         var guessGap = Math.abs(hiddenNumber - guess);
         var previousGuessGap = Math.abs(hiddenNumber - previousGuess);

          if(guessGap > previousGuessGap) {
            GuessingGame.feedbackLabel.innerText = "Huh huh... you're getting colder";
          } else if(guessGap < previousGuessGap) {
            GuessingGame.feedbackLabel.innerText = "Yeah... you're getting hotter!";
          } else {
            GuessingGame.feedbackLabel.innerText = "Hmm... lukewarm. Neither hot nor cold.";
          }

          previousGuess = guess;
          // GuessingGame.giveFeedback(feedbackMsg);
          return;
        }

    } else {
        GuessingGame.checkButton.disabled = true;
        GuessingGame.feedbackLabel.innerText = "Ouch! You got me in " + guessNumber + " guesses!";
        // GuessingGame.giveFeedback(feedbackMsg);
        return;
      }    
    
  }

  // giveFeedback: function(feedbackMsg) {
  //     this.feedbackLabel.innerText = feedbackMsg;
  //   return;
  // }
}

  GuessingGame.checkButton.onclick = GuessingGame.checkGuess;
  GuessingGame.newGameButton.onclick = GuessingGame.chooseNumber;