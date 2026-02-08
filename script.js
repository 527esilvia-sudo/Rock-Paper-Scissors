let userScore = 0
let computerScore = 0

let computerChoice
const choices = ["rock", "paper", "scissors"]

// --- Game mode logic ---
const urlParams = new URLSearchParams(window.location.search)
let mode = urlParams.get('mode') || 'best3'

let roundsToWin = 2
if (mode === 'best3') roundsToWin = 2
else if (mode === 'best5') roundsToWin = 3
else if (mode === 'best7') roundsToWin = 4

// Start button and game setup
const startButton = document.getElementById("playButton")
const gameSetup = document.querySelector(".game-setup")

if (startButton && gameSetup) {
  gameSetup.style.display = 'none'

  startButton.addEventListener("click", function () {
    gameSetup.style.display = "block"
    startButton.style.display = "none"
  })

  // Redirect to game.html when a mode is selected
  const modeInputs = document.querySelectorAll('.game-setup input[name="mode"]')
  modeInputs.forEach(inp => {
    inp.addEventListener('change', () => {
      const selected = document.querySelector('.game-setup input[name="mode"]:checked')
      if (selected) {
        const mode = selected.id
        window.location.href = `game.html?mode=${encodeURIComponent(mode)}`
      }
    })
  })
}

function getComputerChoice() {
  const random = Math.floor(Math.random() * choices.length)
  return choices[random]
}

// Ask for name
let userName = "User"
const userScoreEl = document.getElementById('userScore')
function capitalizeFirst(name) {
  const s = (name || '').toString().trim()
  if (!s) return 'User'
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}
if (userScoreEl) {
  const raw = prompt('What is your name?') || userName
  userName = capitalizeFirst(raw)
  userScoreEl.innerHTML = `${userName} Score: ${userScore}`
}

let _roundLocked = false
function playRound(userChoice) {
  if (_roundLocked) return
  _roundLocked = true

  const userDisplay = document.getElementById('userChoiceDisplay')
  const compDisplay = document.getElementById('computerChoiceDisplay')

  // Set user choice image and show it
  if (userDisplay) {
    userDisplay.src = choiceImages[userChoice]
    userDisplay.classList.remove('hidden')
  }

  // Generate computer choice
  computerChoice = getComputerChoice()
  // Ensure computer hand is hidden until choice is revealed
  if (compDisplay) {
    compDisplay.classList.add('hidden')
  }

  setTimeout(() => {
    // Reveal computer choice
    if (compDisplay) {
      compDisplay.src = choiceImages[computerChoice]
      compDisplay.classList.remove('hidden')
    }

    // Determine winner of round
    if (userChoice === computerChoice) {
      roundTie()
    } else if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      userWins()
    } else {
      computerWins()
    }

    _roundLocked = false
  }, 700)
}

function roundTie() {
  document.getElementById('roundAnnouncement').innerHTML = `It's a tie!`
}

function computerWins() {
  computerScore++
  document.getElementById('roundAnnouncement').innerHTML = `Computer wins!`
  document.getElementById('computerScore').innerHTML = `Computer Score: ${computerScore}`

  if (computerScore > roundsToWin) {
    alert(`Computer wins the game!`) // real alert
    resetGame()
  }
}

function userWins() {
  userScore++
  document.getElementById('roundAnnouncement').innerHTML = `${userName} wins!`
  const el = document.getElementById('userScore')
  if (el) el.innerHTML = `${userName} Score: ${userScore}`

  if (userScore > roundsToWin) {
    alert(`${userName} wins the game!`) // real alert
    resetGame()
  }
}

function resetGame() {
  userScore = 0
  computerScore = 0
  document.getElementById('userScore').innerHTML = `${userName} Score: ${userScore}`
  document.getElementById('computerScore').innerHTML = `Computer Score: ${computerScore}`

  document.getElementById('userChoiceDisplay').classList.add('hidden')
  document.getElementById('computerChoiceDisplay').classList.add('hidden')
}

// Choice images
const choiceImages = {
  rock: "Rock.png",
  paper: "Paper.png",
  scissors: "Scissors.png"
}
