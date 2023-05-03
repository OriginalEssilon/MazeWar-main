import GameMap from "./GameMap.js"

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const Map = new GameMap(tileSize);
const man = Map.getMan(velocity);
const enemies = Map.getEnemies(velocity);

let gameOver = false
let gameWin = false;
const gameOverSound = new Audio("./Sounds/Gameover.wav")
const gameWinSound = new Audio("./Sounds/Gamewin.wav")

function gameLoop(){
    Map.draw(ctx);
    man.draw(ctx, pause());
    enemies.forEach((enemy) => enemy.draw(ctx, pause()));
    checkGameOver();
}

function checkGameOver(){
    if(!gameOver){
    gameOver = isGameOver();
    if(gameOver){
        gameOverSound.play();
        }
    }
}

function isGameOver(){
    return enemies.some(
        (enemy) => enemy.collideWith(man)
    );
}

function pause(){
    return !man.madeFirstMove || gameOver;
}

Map.setCanvasSize(canvas);
setInterval(gameLoop, 1000/ 75);