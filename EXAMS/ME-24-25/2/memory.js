const symbols = [
    "A",
    "A",
    "B",
    "B",
    "C",
    "C",
    "D",
    "D",
    "1",
    "1",
    "2",
    "2",
    "3",
    "3",
    "4",
    "4"
];

const board = document.getElementById("board");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

let score = 0;
let timeLeft = 60;
let firstCard = null;
let secondCard = null;
let pendingMismatch = [];
let matchedPairs = 0;
let gameOver = false;

// Shuffle once before rendering so the board starts in random order.
shuffle(symbols);
renderBoard();
updateScore();
updateTimer();

const timerId = setInterval(() => {
    if (gameOver) {
        return;
    }

    timeLeft -= 1;
    updateTimer();

    if (timeLeft <= 0) {
        endGame(false);
    }
}, 1000);

function shuffle(items) {
    for (let i = 0; i < items.length * 10; i += 1) {
        const firstIndex = randomIndex(items.length);
        const secondIndex = randomIndex(items.length);
        const temp = items[firstIndex];
        items[firstIndex] = items[secondIndex];
        items[secondIndex] = temp;
    }
}

function randomIndex(max) {
    return Math.floor(Math.random() * max);
}

function renderBoard() {
    // Each symbol becomes one clickable card on the board.
    for (const symbol of symbols) {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "card";
        card.dataset.symbol = symbol;
        card.textContent = "";
        card.addEventListener("click", () => handleCardClick(card));
        board.appendChild(card);
    }
}

function handleCardClick(card) {
    if (
        gameOver ||
        card.classList.contains("matched") ||
        card.classList.contains("revealed")
    ) {
        return;
    }

    if (pendingMismatch.length === 2) {
        // A wrong pair stays visible until the user starts the next move.
        hidePendingMismatch();
    }

    revealCard(card);

    if (!firstCard) {
        firstCard = card;
        card.classList.add("disabled");
        return;
    }

    secondCard = card;
    evaluateMove();
}

function revealCard(card) {
    card.classList.add("revealed");
    card.textContent = card.dataset.symbol;
}

function hideCard(card) {
    card.classList.remove("revealed", "disabled");
    card.textContent = "";
}

function evaluateMove() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (isMatch) {
        // Matched cards stay revealed and become unclickable.
        firstCard.classList.remove("disabled");
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        score += 50;
        matchedPairs += 1;
        resetTurn();
        updateScore();

        if (matchedPairs === symbols.length / 2) {
            endGame(true);
        }

        return;
    }

    score -= 10;
    updateScore();
    // Wrong pairs remain open until the next card click, per task rules.
    firstCard.classList.remove("disabled");
    firstCard.classList.add("disabled");
    secondCard.classList.add("disabled");
    pendingMismatch = [firstCard, secondCard];
    resetTurn();
}

function hidePendingMismatch() {
    for (const card of pendingMismatch) {
        hideCard(card);
    }

    pendingMismatch = [];
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function updateTimer() {
    timerElement.textContent = `Time: ${timeLeft}`;
}

function revealAllCards() {
    const cards = board.querySelectorAll(".card");

    // The task requires all cards to be shown when the game ends.
    for (const card of cards) {
        revealCard(card);
        card.classList.add("disabled");
    }
}

function endGame(didWin) {
    if (gameOver) {
        return;
    }

    gameOver = true;
    clearInterval(timerId);
    revealAllCards();

    if (didWin) {
        alert("You won !!!");
        return;
    }

    alert("Time's up, you lose :-(");
}
