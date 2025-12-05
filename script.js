// Array de cores nomeadas do HTML
const COLORS = [
    "red", "blue", "green", "yellow", "purple",
    "orange", "pink", "brown", "gray", "cyan",
    "lime", "navy", "teal", "maroon", "olive"
];

// Variáveis do jogo
let secretColor = "";
let attempts = 3;
let gameOver = false;

// Inicializar o jogo ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    displayColorsList();
    setupEventListeners();
});

// Função para inicializar o jogo
function initializeGame() {
    secretColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    attempts = 3;
    gameOver = false;

    document.getElementById('colorInput').value = '';
    document.getElementById('message').textContent = 'Bem-vindo! Adivinhe a cor sorteada. Você tem 3 tentativas!';
    document.getElementById('message').className = 'message-box info';
    document.getElementById('attempts').textContent = '3';
    document.getElementById('attempts').className = 'attempts-number';
    document.body.style.backgroundColor = 'white';

    // Mostrar input e botão de adivinhar
    document.getElementById('inputGroup').classList.add('active');
    document.getElementById('guessBtn').style.display = 'block';
    document.getElementById('restartBtn').classList.remove('active');

    // Focar no input
    document.getElementById('colorInput').focus();
}

// Função para exibir a lista de cores
function displayColorsList() {
    const colorsList = document.getElementById('colorsList');
    colorsList.innerHTML = '';
    COLORS.forEach(color => {
        const tag = document.createElement('span');
        tag.className = 'color-tag';
        tag.textContent = color;
        colorsList.appendChild(tag);
    });
}

// Função para configurar event listeners
function setupEventListeners() {
    document.getElementById('guessBtn').addEventListener('click', handleGuess);
    document.getElementById('restartBtn').addEventListener('click', initializeGame);
    document.getElementById('colorInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !gameOver) {
            handleGuess();
        }
    });
}

// Função para processar a adivinhação
function handleGuess() {
    const colorInput = document.getElementById('colorInput');
    const userGuess = colorInput.value.toLowerCase().trim();

    // Validar entrada
    if (!userGuess) {
        updateMessage('Por favor, digite uma cor!', 'error');
        return;
    }

    // Verificar se acertou
    if (userGuess === secretColor) {
        updateMessage(`🎉 Parabéns! Você acertou! A cor era ${secretColor}!`, 'success');
        document.body.style.backgroundColor = secretColor;
        endGame();
        return;
    }

    // Decrementar tentativas
    attempts--;
    updateAttempts();

    // Verificar se perdeu
    if (attempts === 0) {
        updateMessage(`😢 Fim de jogo! A cor correta era ${secretColor}. Tente novamente!`, 'error');
        endGame();
    } else {
        updateMessage(`❌ Errou! Tentativas restantes: ${attempts}. Tente outra cor!`, 'error');
    }

    // Limpar input
    colorInput.value = '';
    colorInput.focus();
}

// Função para atualizar o contador de tentativas
function updateAttempts() {
    const attemptsEl = document.getElementById('attempts');
    attemptsEl.textContent = attempts;

    // Mudar cor do contador
    if (attempts > 1) {
        attemptsEl.className = 'attempts-number';
    } else if (attempts === 1) {
        attemptsEl.className = 'attempts-number warning';
    } else {
        attemptsEl.className = 'attempts-number danger';
    }
}

// Função para atualizar a mensagem
function updateMessage(text, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message-box ${type}`;
}

// Função para finalizar o jogo
function endGame() {
    gameOver = true;
    document.getElementById('inputGroup').classList.remove('active');
    document.getElementById('guessBtn').style.display = 'none';
    document.getElementById('restartBtn').classList.add('active');
}
