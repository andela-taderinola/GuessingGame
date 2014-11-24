

var button = document.getElementById('button');
var input = document.getElementById('guess-input');
var label = document.getElementById('feedback');
var hiddenNumber = Math.round(Math.random() * 100);


console.log("The computer has picked a number " + hiddenNumber);

var prevGuess = null;

var guess;
var num = 0;

var checkGuess = function () {
  guess = parseInt(input.value, 10);

  if(isNaN(guess) || guess > 100 || guess < 0) {
    label.innerText = "That is not a valid guess.";
    return;
  }

  num++;
  
  console.log("Your guess is " + guess);
  console.log("Your last guess was " + prevGuess);
  input.value = "";

  if(guess !== hiddenNumber) {

    if(prevGuess === null){
      prevGuess = guess;
      label.innerText = "Nah...nice try. Try again!";
      return;
    } else if(prevGuess === guess) {
      label.innerText = "Didn't I tell you that was a wrong guess?! You've gotta do better than this!";
      // prevGuess = guess;
      return;
    } else {

      guessGap = Math.abs(hiddenNumber - guess);
      prevGuessGap = Math.abs(hiddenNumber - prevGuess);


      if(guessGap > prevGuessGap) {
        label.innerText = "Huh huh... you're getting colder";
      } else if(guessGap < prevGuessGap) {
        label.innerText = "Yeah... you're getting hotter!";
      } else {
        label.innerText = "Hmm... lukewarm. Neither hot nor cold.";
      }
      prevGuess = guess;
      return;
    }

  } else {
      label.innerText = "Ouch! You got me in " + num + " guesses!";
      button.disabled = true;
    return;
    
  }
}

button.onclick = checkGuess;