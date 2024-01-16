var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).on("keydown", function (e){
    if (gameStarted===false) {
        gameStarted = true;
        var level = 0;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);  
}

function playSound(name) {
    var playAudio = new Audio("./sounds/"+name+".mp3");
    playAudio.play(); 
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")}, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (currentLevel === level - 1) {
            setTimeout(function () {
                nextSequence();}, 600);
        }
    } else {
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        level = 0;
        gamePattern = [];
        gameStarted = false;
    }
}

