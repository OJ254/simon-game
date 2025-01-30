var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false; // Track if the game has started

// Detect first keypress to start the game
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level); // Update title
        nextSequence(); // Start the game
        started = true; // Set game as started
    }
});

// Generate the next sequence
function nextSequence() {
    userClickedPattern = []; // Reset user pattern for the new level
    level++; // Increase level
    $("#level-title").text("Level " + level); // Update the h1 title

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Detect button clicks
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Check if the user answer is correct
    checkAnswer(userClickedPattern.length - 1);
});

// Function to play sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
    // Compare the most recent user answer to the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        // If the user has finished their sequence, move to the next level
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence(); // Start next sequence
            }, 1000);
        }
    } else {
        console.log("wrong");

        // Game over logic: show a message and restart the game
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Call startOver() when the user gets the sequence wrong
        startOver();
    }
}

// Function to reset the game
function startOver() {
    level = 0; // Reset level to 0
    gamePattern = []; // Clear the game pattern
    started = false; // Set started to false, waiting for the user to press a key again
}
