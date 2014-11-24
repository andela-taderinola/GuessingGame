
var previousGuess = null;
var guessNumber = 0;
var guess;

var GuessingGame = {
  checkButton: document.getElementById('check'),
  newGameButton: document.getElementById('new-game'),
  guessInput: document.getElementById('guess-input'),
  feedbackLabel: document.getElementById('feedback'),

  chooseNumber: function() {
    var hiddenNumber = Math.round(Math.random() * 100);
    console.log('I have picked a number bewteen 1 and 100');
    console.log(hiddenNumber);
    return hiddenNumber;
  },

  checkGuess: function() {
    var hiddenNumber = this.hiddenNumber;
    var input = this.guessInput.value;
    guess = parseInt(input);

    if(isNaN(guess) || guess > 100 || guess < 0) {
    feedbackMsg = "That is not a valid guess.";
    this.giveFeedback(feedbackMsg);
    }  

    input.value = "";
    guessNumber++; 

    console.log("Your guess is " + guess);
    console.log("Your last guess was " + previousGuess);
    
    if(guess !== hiddenNumber) {

      if(previousGuess === null){
        previousGuess = guess;
        feedbackMsg = "Nah...nice try. Try again!";
      } else if(previousGuess === guess) {
        feedbackMsg = "Didn't I tell you that was a wrong guess?! You've gotta do better than this!";
        // previousGuess = guess;
      } else {
         var guessGap = Math.abs(hiddenNumber - guess);
         var previousGuessGap = Math.abs(hiddenNumber - previousGuess);

          if(guessGap > previousGuessGap) {
            feedbackMsg = "Huh huh... you're getting colder";
          } else if(guessGap < previousGuessGap) {
            feedbackMsg = "Yeah... you're getting hotter!";
          } else {
            feedbackMsg = "Hmm... lukewarm. Neither hot nor cold.";
          }

          previousGuess = guess;
          this.giveFeedback(feedbackMsg);
        }

    } else {
        checkButton.disabled = true;
        feedbackMsg = "Ouch! You got me in " + guessNumber + " guesses!";
        this.giveFeedback(feedbackMsg);
      }    
    
  },

  giveFeedback: function(feedbackMsg) {
      this.feedbackLabel.innerText = feedbackMsg;
    return;
  }
}