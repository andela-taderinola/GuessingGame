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
    var initialWidth = this.thermoCheck.style.width;
    console.log("Bar length was " + initialWidth);
    console.log("New bar length is " + x);
    //set the new length of the thermometer bar
    this.thermoCheck.setAttribute("style", "width:"+x+"rem;");
    //reset the initialWidth
    initialWidth = this.thermoCheck.style.width;
  },

  //method to make '<undefined>'' choose a random number!
  chooseNumber: function() {
    this.feedbackLabel.innerText = "Waiting for your guess...";
    this.thermoCheck.style.width = '0.01rem';
    guessNumber = 0;
    previousGuess = null;
    this.guessInput.value = "";
    this.submitButton.disabled = false;
    hiddenNumber = Math.round(Math.random() * 100);
    console.log("I have picked a number bewteen 1 and 100");
    //console.log(hiddenNumber);
    return hiddenNumber;
  },

  //method to accept the user guess and check it against the hidden number
  checkGuess: function() {

    var input = this.guessInput.value;
    guess = parseInt(input);

    //check for input validity
    if(isNaN(guess) || guess > 100 || guess < 0) {
    this.feedbackLabel.innerText = "That is not a valid guess.";
    return;
    }  

    //check gap between guess and hiddenNumber
    guessGap = Math.abs(hiddenNumber - guess);
    this.guessInput.value = ""; //clear the input text field
    guessNumber++; //track number of guesses. Game over if it has exceeded 10
    var left = 10 - guessNumber;
    var tick = " " + left + " to go!";

      if(guessNumber == 10) {
        this.feedbackLabel.innerText = "You've used up your guesses. My number was " + hiddenNumber + ".";  
        this.submitButton.disabled = true;
        this.showTemp();
        return;
      }

    console.log("Your guess is " + guess);
    
    if(guess !== hiddenNumber) {

      if(previousGuess === null){
        //this executes if this is the first guess
        previousGuess = guess;
        this.feedbackLabel.innerText = "Nice first try. Try again!";
        this.showTemp(); //call showTemp() to control the thermometer
      } else if(previousGuess === guess) {
        //user has entered the same guess twice in a row
        this.feedbackLabel.innerText = "I heard you the first time. Why repeat yourself?" + tick;
        this.showTemp();
      } else { //guess !== previousGuess
         
         //check difference between last guessGap and guessGap to see if the user is getting
         //closer to or farther from the hiddenNumber 
         var previousGuessGap = Math.abs(hiddenNumber - previousGuess);

          if(guessGap > previousGuessGap) {
            this.feedbackLabel.innerText = "You're getting colder." + tick;
            this.showTemp();
          } else if(guessGap < previousGuessGap) {
            this.feedbackLabel.innerText = "You're getting hotter!" + tick;
            this.showTemp();
          } else {
            this.feedbackLabel.innerText = "I don't feel you. C'mon! You can do it!" + tick;
            this.showTemp();
          }

          previousGuess = guess;
          // this.giveFeedback(feedbackMsg);
          return;
        }

    } else {
        this.submitButton.disabled = true;
        this.feedbackLabel.innerText = "Correct! You got me in " + guessNumber + " guesses!";
        this.showTemp();
        return;
      }    
    
  }

}
  guessingGame.submitButton.onclick = guessingGame.checkGuess.bind(guessingGame);
  guessingGame.newGameButton.onclick = guessingGame.chooseNumber.bind(guessingGame);
  window.onload = guessingGame.chooseNumber.bind(guessingGame);
