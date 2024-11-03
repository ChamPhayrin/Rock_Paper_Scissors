// GAME CODE

// MAKING VARIABLE SCORE USING OBJECTS
// outside scope to save the
// localStorage and OR operator
let score = JSON.parse(localStorage.getItem("score")) || {
	wins: 0,
	loses: 0,
	ties: 0,
};
// MAKING VARIABLE FOR COMPUTER IMAGE
let image = document.getElementById("emojiImg");

// CREATING FUNCTION FOR GAME (Rock Paper Scissors)
function game(userMove) {
	const randomNumber = Math.random();
	let computerMove = "";
	let result = "";

	// CREATING COMPUTER MOVE
	if (randomNumber >= 0 && randomNumber < 1 / 3) {
		computerMove = "Rock";
	} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
		computerMove = "Paper";
	} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
		computerMove = "Scissors";
	}

	// CHECKING COMPUTER MOVE TO USER MOVE + MODAL DOM
	if (computerMove === userMove) {
		result = "Tie.";
		document.getElementById("result").innerHTML = "Tied!";
		document.getElementById("resultCompare").innerHTML = "You chose the same move!";
    image.src = 'emoji/astonishEmoji.png';
    document.getElementById("speech").innerHTML = 'We tied?!'
	} else if (
		(computerMove === "Paper" && userMove === "Rock") ||
		(computerMove === "Rock" && userMove === "Scissors") ||
		(computerMove === "Scissors" && userMove === "Paper")
	) {
		result = "You lose.";
		document.getElementById("result").innerHTML = "You lost!";
		document.getElementById("resultCompare").innerHTML = `${computerMove} beats ${userMove}`;
    image.src = 'emoji/heheEmoji.png';
    document.getElementById("speech").innerHTML = "You'd never win.."
	} else {
		result = "You win.";
		document.getElementById("result").innerHTML = "You won!";
		document.getElementById("resultCompare").innerHTML = `${userMove} beats ${computerMove}`;
    image.src = 'emoji/slapEmoji.png';
    document.getElementById("speech").innerHTML = 'NO!'

	}
  // SAVING SCORE
	if (result === "You win.") {
		score.wins += 1;
	} else if (result === "You lose.") {
		score.loses += 1;
	} else if (result === "Tie.") {
		score.ties += 1;
	};

  document.getElementById("playerMove").innerHTML = `${userMove}`;
  document.getElementById("computerMove").innerHTML = `${computerMove}`;

	// LOCAL STORAGE SAVING SCORE
	localStorage.setItem("score", JSON.stringify(score));

// SCORE BOARD  
document.getElementById("scoreWon").innerHTML = `You've won: ${score.wins} times!`;
document.getElementById("scoreLost").innerHTML = `You've lost: ${score.loses} times!`;
document.getElementById("scoreTied").innerHTML = `You've tied: ${score.ties} times!`;
}

// OPENING/CLOSING MODAL CODE
const gameModal = document.getElementById("gameModal");
const overlay = document.getElementById("overlay");
const scoreTracker = document.getElementById("scoreTracker");

const openModalBtn = document.getElementsByClassName("gameBtn");
const closeModalBtn = document.getElementsByClassName("playAgain");

// CLOSING MODAL
const closeModal = function () {
	gameModal.classList.toggle("hidden");
	overlay.classList.toggle("hidden");
};

// OPENING MODAL

// function to show modal
const openModal = function () {
	gameModal.classList.toggle("hidden");
	overlay.classList.toggle("hidden");
  scoreTracker.classList.remove("hidden");
};

// turned btn into list making sure it turns to array
// adding event listener to each btn to openModal()
for (btn of Array.from(openModalBtn)) {
	btn.addEventListener("click", () => {
		openModal();
	});
};

// RESET BTN
const resetBtn = function(){
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  scoreTracker.classList.add("hidden");
  image.src = 'emoji/prideEmoji.png';
  document.getElementById("speech").innerHTML = 'Think you can beat me?'
};

