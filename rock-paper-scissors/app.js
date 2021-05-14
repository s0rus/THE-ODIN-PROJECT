const gamePool = ['rock', 'paper', 'scissors'];
const playerChoice = document.getElementById('playerChoice');
const computerChoice = document.getElementById('computerChoice');
const roundWinner = document.getElementById('roundWinner');
const gameWinner = document.getElementById('gameWinner');
const playerCounter = document.getElementById('playerCounter');
const computerCounter = document.getElementById('computerCounter');

let playerPoints = 0;
let computerPoints = 0;

const RPSgame = () => {

    playerCounter.textContent = `Player: ${playerPoints}`;
    computerCounter.textContent = `Computer: ${computerPoints}`;

    if (computerPoints === 5 || playerPoints === 5) {
        endGame();
    }
}

document.getElementById('rock').addEventListener('click', () => {
    checkWinner(computerRoll(), 'rock');
});

document.getElementById('paper').addEventListener('click', () => {
    checkWinner(computerRoll(), 'paper');
});

document.getElementById('scissors').addEventListener('click', () => {
    checkWinner(computerRoll(), 'scissors');
});

const computerRoll = () => {
    return gamePool[Math.floor(Math.random() * 3)];
}

const checkWinner = (computer, player) => {

    if (computer === player) {
        roundWinner.textContent = "Draw!";
    }

    if (player === 'rock' && computer === 'scissors') {
        roundWinner.textContent = "You win!";
        playerPoints++;
    };
    if (player === 'scissors' && computer === 'rock') {
        roundWinner.textContent = "Computer wins!";
        computerPoints++;
    }

    if (player === 'paper' && computer === 'rock') {
        roundWinner.textContent = "You win!";
        playerPoints++;
    };
    if (player === 'rock' && computer === 'paper') {
        roundWinner.textContent = "Computer wins!";
        computerPoints++;
    }

    if (player === 'scissors' && computer === 'paper') {
        roundWinner.textContent = "You win!";
        playerPoints++;
    };
    if (player === 'paper' && computer === 'scissors') {
        roundWinner.textContent = "Computer wins!";
        computerPoints++;
    }

    playerChoice.textContent = `${player}`;
    computerChoice.textContent = `${computer}`;

    RPSgame();
}

const endGame = () => {
    const buttons = document.getElementsByClassName('option');
    [...buttons].forEach(button => {
        button.disabled = true;
    });

    tryAgain = document.getElementById('tryAgain');
    tryAgainButton = document.createElement('button');
    tryAgainButton.innerHTML = "<a href='http://127.0.0.1:5500'>Try again</a>"
    tryAgain.append(tryAgainButton);
}