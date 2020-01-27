// array where we store the random pattern needed for the game
let gamePattern = [];
// array with colours needed for game
let buttonColours = ["red", "blue", "green", "yellow"];
// array to store the pattern the user has clicked
let userClickedPattern = []
// keep track of users current level
let level = 0;
// boolean to keep track if game has started
let started = false;

function nextSequence() {

  userClickedPattern = [];

  // increment level each time function is called
  level++;

  // change h1 text to show level
  $("h1").text("Level " + level);

  // random number to select a random element from buttonColours
  let randomNumber = Math.floor(Math.random() * 4);
  // get random element colour from array
  let randomChosenColour = buttonColours[randomNumber];
  // add random chosen colour to gamePattern buttonArray
  gamePattern.push(randomChosenColour);
  // create flash animation
  flashAnimation(randomChosenColour);
  // play relevant sound to color
  playSound(randomChosenColour);
  // check answer
  checkAnswer(userClickedPattern.length - 1);
}

// check answer the user has clicked
function checkAnswer(currentLevel) {
  // if same color
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // if same size
    if (userClickedPattern.length === gamePattern.length) {
      // start new sequence with delay of 1000ms
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
    // wrong answer given
  } else {
    // play the wrong sound effect
    playSound("wrong");
    // add class to html body to show game over animation
    $("body").addClass("game-over");
    // Show game over in h1
    $("h1").text("Game Over, Press any key to restart!");
    // remove game over
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    // reset
    startOver();
  }
}


// detects when button is clicked and adds animation and sound
$(".btn").click(function() {
  // get the color pressed by user
  let userChosenColour = $(this).attr("id");
  // add to array to store user's pattern
  userClickedPattern.push(userChosenColour);
  // call animatePress function & playSound function
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

// when user clicks on button want to show pressed animation
// this function adds .pressed css class and removes after 100 ms
function animatePress(currentColor) {
  // add pressed class to show that user has pressed color
  $("." + currentColor).addClass("pressed");

  // remove class after 100 milliseconds
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);

}

// creates a flash animation when showing user what buttons to press
function flashAnimation(name) {
  $("#" + name).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

// plays the sound linked to the color
function playSound(name) {
  // play audio sound depending on which button
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// function detects keypress from user and if "a" start game
$(document).keypress(function(event) {
  // if started false then no game started yet
  // so we start sequence and change h1 text
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// reset level, gamePattern and set started to false
// to start a new game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
