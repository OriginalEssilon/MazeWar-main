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
    drawGameEnd();
    man.draw(ctx, pause());
    enemies.forEach((enemy) => enemy.draw(ctx, pause()));
    checkGameOver();
    checkGameWin();
    
}

function checkGameWin() {
    if (!gameWin) {
      gameWin = Map.didWin();
      if (gameWin) {
        gameWinSound.play();
      }
    }
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
    return !man.madeFirstMove || gameOver || gameWin;
}

function drawGameEnd(){
    if(gameOver || gameWin){
        let text = " YOU WIN!!";
        if(gameOver){
            text = "YOU LOSE!!!"
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0,canvas.height / 3.2, canvas.clientWidth, 80);

        ctx.font = "75px comic sans";
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");

    ctx.fillStyle = gradient;
    ctx.fillText(text, 10, canvas.height / 2);
    }
}

Map.setCanvasSize(canvas);
setInterval(gameLoop, 1000/ 75);