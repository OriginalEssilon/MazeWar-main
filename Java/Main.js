import GameMap from "./GameMap.js"

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const Map = new GameMap(tileSize);
const man = Map.getMan(velocity);
const enemy = Map.getEnemy(velocity);



function gameLoop(){
    Map.draw(ctx);
    man.draw(ctx);
    enemy.draw(ctx);
}



Map.setCanvasSize(canvas);
setInterval(gameLoop, 1000/ 75);