import GameMap from "./GameMap.js"

const tileSize = 32;
const velocity = 1;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const Map = new GameMap(tileSize);
const man = Map.getMan(velocity)


function gameLoop(){
    Map.draw(ctx);
    man.draw(ctx);
}



Map.setCanvasSize(canvas);
setInterval(gameLoop, 1000/ 75);