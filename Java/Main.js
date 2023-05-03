import GameMap from "./GameMap.js"

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const Map = new GameMap(tileSize);
const man = Map.getMan(velocity);
const enemies = Map.getEnemies(velocity);



function gameLoop(){
    Map.draw(ctx);
    man.draw(ctx);
    enemies.forEach((enemy) => enemy.draw(ctx, pause()));
}

function pause(){
    return !man.madeFirstMove;
}

Map.setCanvasSize(canvas);
setInterval(gameLoop, 1000/ 75);