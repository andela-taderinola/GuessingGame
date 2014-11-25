//global variables 
var previousGuess = null;
var guessNumber = 0; //total number of guesses
var guess;
var feedbackMsg;  
var guessGap;
  
//main Object
var guessingGame = {
  submitButton: document.getElementById('check'),
  newGameButton: document.getElementById('new-game'),
  guessInput: document.getElementById('guess-input'),
  feedbackLabel: document.getElementById('feedback'),
  thermoCheck: document.getElementById('thermo'),

  //method to control the thermometer bar
  showTemp: function() {

    var maxGap; //get the maximum gap between the guess and the hiddenNumber

    if(hiddenNumber < 50){
      maxGap = 100 - hiddenNumber;
    } else {
      maxGap = hiddenNumber;
    }

    var howClose = (maxGap - guessGap)/maxGap;
    var x = Math.floor(howClose*25);
    var initialWidth = guessingGame.thermoCheck.style.width;
    console.log("Bar length was " + initialWidth);
    console.log("New bar length is " + x);
    //set the new length of the thermometer bar
    guessingGame.thermoCheck.setAttribute("style", "width:"+x+"rem;");
    //reset the initialWidth
    initialWidth = guessingGame.thermoCheck.style.width;
  },

  //method to make '<undefined>'' choose a random number!
  chooseNumber: function() {
    guessingGame.feedbackLabel.innerText = "Waiting for your guess...";
    guessingGame.thermoCheck.style.width = '0.01rem';
    guessNumber = 0;
    previousGuess = null;
    guessingGame.guessInput.value = "";
    guessingGame.submitButton.disabled = false;
    hiddenNumber = Math.round(Math.random() * 100);
    console.log("I have picked a number bewteen 1 and 100");
    //console.log(hiddenNumber);
    return hiddenNumber;
  },

  //method to accept the user guess and check it against the hidden number
  checkGuess: function() {

    var input = guessingGame.guessInput.value;
    guess = parseInt(input);

    //check for input validity
    if(isNaN(guess) || guess > 100 || guess < 0) {
    guessingGame.feedbackLabel.innerText = "That is not a valid guess.";
    return;
    }  

    //check gap between guess and hiddenNumber
    guessGap = Math.abs(hiddenNumber - guess);
    guessingGame.guessInput.value = ""; //clear the input text field
    guessNumber++; //track number of guesses. Game over if it has exceeded 10
    var left = 10 - guessNumber;
    var tick = " " + left + " to go!";

      if(guessNumber == 10) {
        guessingGame.feedbackLabel.innerText = "You've used up your guesses. My number was " + hiddenNumber + ".";  
        guessingGame.submitButton.disabled = true;
        guessingGame.showTemp();
        return;
      }

    console.log("Your guess is " + guess);
    
    if(guess !== hiddenNumber) {

      if(previousGuess === null){
        //this executes if this is the first guess
        previousGuess = guess;
        guessingGame.feedbackLabel.innerText = "Nice first try. Try again!";
        guessingGame.showTemp(); //call showTemp() to control the thermometer
      } else if(previousGuess === guess) {
        //user has entered the same guess twice in a row
        guessingGame.feedbackLabel.innerText = "I heard you the first time. Why repeat yourself?" + tick;
        guessingGame.showTemp();
      } else { //guess !== previousGuess
         
         //check difference between last guessGap and guessGap to see if the user is getting
         //closer to or farther from the hiddenNumber 
         var previousGuessGap = Math.abs(hiddenNumber - previousGuess);

          if(guessGap > previousGuessGap) {
            guessingGame.feedbackLabel.innerText = "You're getting colder." + tick;
            guessingGame.showTemp();
          } else if(guessGap < previousGuessGap) {
            guessingGame.feedbackLabel.innerText = "You're getting hotter!" + tick;
            guessingGame.showTemp();
          } else {
            guessingGame.feedbackLabel.innerText = "I don't feel you. C'mon! You can do it!" + tick;
            guessingGame.showTemp();
          }

          previousGuess = guess;
          // guessingGame.giveFeedback(feedbackMsg);
          return;
        }

    } else {
        guessingGame.submitButton.disabled = true;
        guessingGame.feedbackLabel.innerText = "Correct! You got me in " + guessNumber + " guesses!";
        guessingGame.showTemp();
        return;
      }    
    
  }

}
  guessingGame.submitButton.onclick = guessingGame.checkGuess;
  guessingGame.newGameButton.onclick = guessingGame.chooseNumber;
  window.onload = guessingGame.chooseNumber;
