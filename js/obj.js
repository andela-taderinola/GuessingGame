
// console.log('I have picked a number bewteen 1 and 100');
// console.log(hiddenNumber);
var previousGuess = null;
var guessNumber = 0;
var guess;
var feedbackMsg;
var guessGap;

var GuessingGame = {
  checkButton: document.getElementById('check'),
  newGameButton: document.getElementById('new-game'),
  guessInput: document.getElementById('guess-input'),
  feedbackLabel: document.getElementById('feedback'),
  thermocheck: document.getElementById('thermo'),

  showTemp: function() {

    if(guessGap >= 80){
      GuessingGame.thermocheck.setAttribute("class", "temp80");
      console.log("Gap is " + guessGap);
    } else if(guessGap >= 60){
      GuessingGame.thermocheck.setAttribute("class","temp60");
      console.log("Gap is " + guessGap);
    } else if(guessGap >= 40){
      GuessingGame.thermocheck.setAttribute("class","temp40");
      console.log("Gap is " + guessGap);
    } else if(guessGap >= 20){
      GuessingGame.thermocheck.setAttribute("class","temp20");
      console.log("Gap is " + guessGap);
    } else if(guessGap > 0){
      GuessingGame.thermocheck.setAttribute("class","temp10");
      console.log("Gap is " + guessGap);
    } else if(guessGap == 0) {
      GuessingGame.thermocheck.setAttribute("class","boiled");
      console.log("Gap is " + guessGap);
    }

  },

  chooseNumber: function() {
    GuessingGame.thermocheck.setAttribute("class","thermoDemo");
    previousGuess = null;
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

    guessGap = Math.abs(hiddenNumber - guess);
    GuessingGame.guessInput.value = "";
    guessNumber++; 

    console.log("Your guess is " + guess);
    console.log("Your last guess was " + previousGuess);
    
    if(guess !== hiddenNumber) {

      if(previousGuess === null){
        previousGuess = guess;
        GuessingGame.feedbackLabel.innerText = "Nice first try. Try again!";
        GuessingGame.showTemp();
      } else if(previousGuess === guess) {
        GuessingGame.feedbackLabel.innerText = "I heard you the first time. Why repeat yourself?";
        // previousGuess = guess;
        GuessingGame.showTemp();
      } else {
         
         var previousGuessGap = Math.abs(hiddenNumber - previousGuess);

          if(guessGap > previousGuessGap) {
            GuessingGame.feedbackLabel.innerText = "You're getting colder.";
            GuessingGame.showTemp();
          } else if(guessGap < previousGuessGap) {
            GuessingGame.feedbackLabel.innerText = "You're getting hotter!";
            GuessingGame.showTemp();
          } else {
            GuessingGame.feedbackLabel.innerText = "I don't feel you. C'mon! You can do it!";
            GuessingGame.showTemp();
          }

          previousGuess = guess;
          // GuessingGame.giveFeedback(feedbackMsg);
          return;
        }

    } else {
        GuessingGame.checkButton.disabled = true;
        GuessingGame.feedbackLabel.innerText = "Ouch! You got me in " + guessNumber + " guesses!";
        GuessingGame.showTemp();
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
  window.onload = GuessingGame.chooseNumber;
