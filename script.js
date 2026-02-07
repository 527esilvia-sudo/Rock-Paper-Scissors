let userScore = 0
let computerScore = 0

let computerChoice
const choices = ["rock", "paper", "scissors"]

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
        const mode = selected.id // e.g. best3
        window.location.href = `game.html?mode=${encodeURIComponent(mode)}`
      }
    })
  })
}

function getComputerChoice() {
  const random = Math.floor(Math.random() * choices.length)
  return choices[random]
}

// Ask for name and update scoreboard if scoreboard exists
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

  if (userDisplay) userDisplay.textContent = userChoice.toUpperCase()

  computerChoice = getComputerChoice()
  if (compDisplay) compDisplay.textContent = ''

  setTimeout(() => {
    if (compDisplay) compDisplay.textContent = computerChoice.toUpperCase()

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
}

function userWins() {
  userScore++
  document.getElementById('roundAnnouncement').innerHTML = `${userName} wins!`
  const el = document.getElementById('userScore')
  if (el) el.innerHTML = `${userName} Score: ${userScore}`
}
