// Rock Paper Scissors - 5 rounds

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".choice");
    const roundText = document.getElementById("round-text");
    const scoreText = document.getElementById("score-text");
    const playerChoiceText = document.getElementById("player-choice");
    const computerChoiceText = document.getElementById("computer-choice");
    const roundResultText = document.getElementById("round-result");
    const finalMessageText = document.getElementById("final-message");
    const guessesText = document.getElementById("guesses-text");

    let currentRound = 1;
    const maxRounds = 5;
    let playerScore = 0;
    let computerScore = 0;

    // Keep all guesses
    let userGuesses = [];

    // Add click event to each button
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            // If the game already finished, do nothing
            if (currentRound > maxRounds) {
                return;
            }

            const playerChoice = button.getAttribute("data-choice");
            const computerChoice = getComputerChoice();

            // Save player guess
            userGuesses.push(playerChoice);

            // Show choices
            playerChoiceText.textContent = "Player choice: " + playerChoice;
            computerChoiceText.textContent = "Computer choice: " + computerChoice;

            // Decide who wins this round
            const result = getResult(playerChoice, computerChoice);

            if (result === "draw") {
                roundResultText.textContent = "Result: It's a draw.";
            } else if (result === "player") {
                roundResultText.textContent = "Result: You win this round.";
                playerScore++;
            } else {
                roundResultText.textContent = "Result: Computer wins this round.";
                computerScore++;
            }

            // Update score and round text
            scoreText.textContent = "Player: " + playerScore + " | Computer: " + computerScore;

            // Move to next round
            currentRound++;
            if (currentRound <= maxRounds) {
                roundText.textContent = "Round: " + currentRound + " / " + maxRounds;
            }

            // If all rounds are played, end the game
            if (currentRound > maxRounds) {
                endGame(buttons, playerScore, computerScore, finalMessageText, roundText, guessesText, userGuesses);
            }
        });
    });
});

// Returns computer choice
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

// Returns "player", "computer", or "draw"
function getResult(player, computer) {
    if (player === computer) {
        return "draw";
    }

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "player";
    }

    return "computer";
}

// Ends the game and disables buttons
function endGame(buttons, playerScore, computerScore, finalMessageText, roundText, guessesText, userGuesses) {
    buttons.forEach(function (button) {
        button.disabled = true;
    });

    let message = "Game over. ";

    if (playerScore > computerScore) {
        message += "You win the game!";
    } else if (playerScore < computerScore) {
        message += "Computer wins the game.";
    } else {
        message += "The game is a draw.";
    }

    finalMessageText.textContent = message;
    roundText.textContent = "All rounds are finished.";

    // Show player guesses
    guessesText.textContent = "Your guesses: " + userGuesses.join(", ");
}
