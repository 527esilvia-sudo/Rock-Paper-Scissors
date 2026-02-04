let userScore = 0
let computerScore = 0
let computerChoice 
const choices = ["rock", "paper", "scissors"];

const startButton = document.getElementById("playButton");
const gameSetup = document.querySelector(".game-setup");



startButton.addEventListener("click", function () {
  gameSetup.style.display = "block";
  startButton.style.display = "none";
});
function getComputerChoice() {
    const random = Math.floor(Math.random() * choices.length);
 return choices[random];
}

computerChoice = getComputerChoice()

document.getElementById('userChoice')



