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

let userName = prompt('What is your name?')

userChoice = document.getElementById('userChoice')



function playRound(userChoice) {

  if (userChoice === 'rock' && computerChoice === 'scissors') {
        userWins()
  }
   if (userChoice === 'rock' && computerChoice === 'paper') {
        computerWins()
  }
   if (userChoice === 'scissors' && computerChoice === 'rock') {
        computerWins()
  }
   if (userChoice === 'paper' && computerChoice === 'rock') {
        userWins()
  }
   if (userChoice === 'paper' && computerChoice === 'rock') {
        userWins()
  }
   if (userChoice === 'paper' && computerChoice === 'scissors') {
        computerWins()
  }
  if (userChoice === 'scissors' && computerChoice === 'paper') {
        userWins()
  }
    if (userChoice === 'scissors' && computerChoice === 'scissors') {
        roundTie()
  }
    if (userChoice === 'paper' && computerChoice === 'paper') {
        roundTie()
  }
    if (userChoice === 'rock' && computerChoice === 'rock') {
        roundTie()
  }
}

function roundTie() {
  document.getElementById('roundAnnouncement').innerHTML = `It's a tie!`
}

function computerWins() {
  computerScore = computerScore +1
  document.getElementById('roundAnnouncement').innerHTML = `Computer wins!`
  document.getElementById('computerScore').innerHTML = `Computer Score: ${computerScore}`
}

function userWins() {
  userScore = userScore +1
  document.getElementById('roundAnnouncement').innerHTML = `${userName} wins!`
  document.getElementById('userScore').innerHTML = `${userName} Score: ${userScore}`
}