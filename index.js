// get all buttons
const colors = ["green", "red", "yellow", "blue"];
let gameColors = [];
let userPickedColors = [];
let start = false;
let level = 0;

$(document).keypress(() => {
  if (!start) {
    start = true;
    $(".heading").text(`Level ${level}`);
    nextLevel();
  }
});

$("button").on("click", (e) => {
  if (start === true) {
    const userPickedcolor = e.target.classList[0];
    userPickedColors.push(userPickedcolor);

    playShound(userPickedcolor);
    checkAnswer();
  } else {
    playShound("wrong");
    $("body").css("background-color", "red");
    setTimeout(() => {
      $("body").css("background-color", "#011f3f");
    }, 160);
  }
});

function nextLevel() {
  level++;
  $(".heading").text(`Level ${level}`);
  addRandonColor();
  userPickedColors = [];
}

function addRandonColor() {
  index = Math.floor(Math.random() * 4);
  console.log(index);
  gameColors.push(colors[index]);
  playShound(colors[index]);
}

function checkAnswer() {
  const index = userPickedColors.length - 1;
  console.log(gameColors, userPickedColors);
  console.log(userPickedColors[index] === gameColors[index]);
  if (userPickedColors[index] === gameColors[index]) {
    gameColors.length;
    if (userPickedColors.length === gameColors.length) {
      setTimeout(() => nextLevel(), 300);
    } else {
      return;
    }
  } else {
    playShound("wrong");
    reset();
  }
}
function playShound(fileName) {
  const audio = new Audio(`./sound/${fileName}.mp3`);
  if (fileName != "wrong") animateButtonPress(fileName);
  audio.play();
}
function animateButtonPress(buttonPressed) {
  $(`.${buttonPressed}`).addClass("pressed");
  setTimeout(() => {
    $(`.${buttonPressed}`).removeClass("pressed");
  }, 200);
}
function reset() {
  gameColors = [];
  userPickedColors = [];
  level = 0;
  start = false;
  $(".heading").text("Game Over!! Press ANy Key To Start");
  $("body").css("background-color", "red");
  setTimeout(() => {
    $("body").css("background-color", "#011f3f");
  }, 160);
}
