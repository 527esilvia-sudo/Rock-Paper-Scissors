let userScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

const choices = ["rock", "paper", "scissors"];
const userDisplay = document.getElementById("userChoiceDisplay");
const compDisplay = document.getElementById("computerChoiceDisplay");
const userWrapper = document.getElementById("userWrapper");
const compWrapper = document.getElementById("computerWrapper");

let userName = prompt("What is your name?");
document.getElementById("userScore").innerHTML = userName + " Score: 0";

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(userChoice) {
  if (roundsPlayed >= 5) return;

  const computerChoice = getComputerChoice();

  // Show user hand with bounce
  userDisplay.src = capitalize(userChoice) + ".png";
  userWrapper.classList.remove("bounce-in","hidden");
  void userWrapper.offsetWidth;
  userWrapper.classList.add("bounce-in");

  // Show computer hand with bounce after short delay
  setTimeout(() => {
    compDisplay.src = capitalize(computerChoice) + ".png";
    compWrapper.classList.remove("bounce-in","hidden");
    void compWrapper.offsetWidth;
    compWrapper.classList.add("bounce-in");

    // Win/Lose logic
    if (userChoice === computerChoice) {
      roundTie();
    } else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissors" && computerChoice === "paper")
    ) {
      userWins();
    } else {
      computerWins();
    }

    roundsPlayed++;
    if (roundsPlayed === 5) endGame();
  }, 500);
}

function roundTie() {
  document.getElementById("roundAnnouncement").innerHTML = "It's a tie!";
}

function computerWins() {
  computerScore++;
  document.getElementById("roundAnnouncement").innerHTML = "Computer wins!";
  document.getElementById("computerScore").innerHTML = "Computer Score: " + computerScore;
}

function userWins() {
  userScore++;
  document.getElementById("roundAnnouncement").innerHTML = userName + " wins!";
  document.getElementById("userScore").innerHTML = userName + " Score: " + userScore;
}

function endGame() {
  let message = "";
  if (userScore > computerScore) {
    message = "Congrats " + userName + "! You win the game!";
  } else if (computerScore > userScore) {
    message = "Sorry " + userName + ", the computer wins the game!";
  } else {
    message = "It's a tie overall!";
  }

  const announcement = document.getElementById("roundAnnouncement");
  announcement.innerHTML = message;
  announcement.classList.add("big-message");

  const resetBtn = document.createElement("button");
  resetBtn.innerText = "Play Again";
  resetBtn.className = "play-again-btn";
  resetBtn.onclick = resetGame;
  document.body.appendChild(resetBtn);
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  roundsPlayed = 0;

  document.getElementById("userScore").innerHTML = userName + " Score: 0";
  document.getElementById("computerScore").innerHTML = "Computer Score: 0";
  document.getElementById("roundAnnouncement").innerHTML = "";
  document.getElementById("roundAnnouncement").className = "";

  userWrapper.classList.add("hidden");
  compWrapper.classList.add("hidden");

  const btn = document.querySelector(".play-again-btn");
  if (btn) btn.remove();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
