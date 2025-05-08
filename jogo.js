const gameBoard = document.getElementById('game-board');

// Conjunto de cartas (pares)
const cardsArray = [
    '🍎', '🍎',
    '🍌', '🍌',
    '🍇', '🍇',
    '🍓', '🍓',
    '🍍', '🍍',
    '🥝', '🥝',
    '🍒', '🍒',
    '🍑', '🍑'
];

// Embaralha as cartas
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Variáveis de controle
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Criação dinâmica do tabuleiro
function setupBoard() {
    const shuffledCards = shuffle(cardsArray);
    shuffledCards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Função para virar a carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;

    if (!firstCard) {
        // Primeira carta virada
        firstCard = this;
    } else {
        // Segunda carta virada
        secondCard = this;
        checkForMatch();
    }
}

// Verifica se as cartas combinam
function checkForMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Desabilita cartas combinadas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Desvira as cartas
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

// Reseta as variáveis de controle
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Inicializa o jogo
setupBoard();