const circle = document.getElementById("circle");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const highScoreDisplay = document.getElementById("highScore");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreDisplay = document.getElementById("finalScore");
const highestScoreDisplay = document.getElementById("highestScoreDisplay");
const playBtn = document.getElementById("playBtn");
const restartBtn = document.getElementById("restartBtn");
const flash = document.getElementById("flash");

const bgMusic = document.getElementById("bgMusic"); // Background music
const jumpscareAudio = document.getElementById("jumpscareAudio"); // Jumpscare audio

let speed = 1500;
let timer;
let score = 0;
let lives = 3;

// Session-highest score (resets only on page reload)
let highScore = 0;
highScoreDisplay.textContent = "Highest Score: 0";

function randomPosition() {
    circle.style.left = Math.random() * (window.innerWidth - 60) + "px";
    circle.style.top = Math.random() * (window.innerHeight - 60) + "px";
}

function updateScore() {
    score++;
    scoreDisplay.textContent = "Score: " + score;

    if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = "Highest Score: " + highScore;
    }
}

function updateLives() {
    livesDisplay.textContent = "Lives: " + "❤️".repeat(lives);
}

function resetGame() {
    score = 0;
    lives = 3;
    speed = 1500;
    scoreDisplay.textContent = "Score: " + score;
    updateLives();
    gameOverScreen.style.display = "none";
    showCircle();
}

function gameOver() {
    clearTimeout(timer);
    circle.style.display = "none";

    // Stop background music
    bgMusic.pause();

    // Play jumpscare audio
    jumpscareAudio.currentTime = 0;
    jumpscareAudio.play();

    // Screen shake
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 600);

    // White flicker
    flash.classList.add("flash");
    setTimeout(() => flash.classList.remove("flash"), 500);

    // Game Over screen
    highestScoreDisplay.textContent = "Highest Score: " + highScore;
    finalScoreDisplay.textContent = "Score: " + score;
    gameOverScreen.style.display = "flex";
}

function showCircle() {
    randomPosition();
    circle.style.display = "block";

    timer = setTimeout(() => {
        circle.style.display = "none";
        lives--;
        updateLives();

        if (lives <= 0) {
            gameOver();
        } else {
            showCircle();
        }
    }, speed);
}

circle.addEventListener("click", () => {
    clearTimeout(timer);
    circle.style.display = "none";

    if (speed > 300) speed -= 100;

    updateScore();
    showCircle();
});

playBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    scoreDisplay.style.display = "block";
    livesDisplay.style.display = "block";
    highScoreDisplay.style.display = "block";
    resetGame();
    
    // Play background music
    bgMusic.currentTime = 0;
    bgMusic.play();
});

restartBtn.addEventListener("click", () => {
    resetGame();
    
    // Restart background music
    bgMusic.currentTime = 0;
    bgMusic.play();
});
