import Man from "./Man.js"
import keys from "./Keys.js";

export default class Map{
    constructor(tileSize){
        this.tileSize = tileSize;

        this.coin = new Image()
        this.coin.src = "../img/coin.png";

        this.wall = new Image();
        this.wall.src = "../img/wall.png";

    }

    //0 = coins
    //1 = walls
    //2 = man


    map = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,2,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,1,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,1,0,1],
        [1,0,1,1,1,1,1,0,1,1,1,0,1],
        [1,0,0,0,0,0,1,0,0,0,1,0,1],
        [1,0,0,0,0,0,1,0,0,0,1,0,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
    ]

    draw(ctx) {
        for (let row = 0; row < this.map.length; row++){
            for (let column = 0; column < this.map[row].length; column++){
                let tile = this.map[row][column];
                if(tile===1){
                    this.#drawWall(ctx, column, row, this.tileSize)
                }
                else if (tile === 0){
                    this.#drawDot(ctx,column,row,this.tileSize);
                }
            }
        }
    }

    #drawDot(ctx,column,row,size){
        ctx.drawImage(
            this.coin,
            column * this.tileSize,
            row * this.tileSize,
            size,
            size
        );
    }

    #drawWall(ctx, column, row, size){
        ctx.drawImage(
            this.wall,
            column * this.tileSize,
            row * this.tileSize,
            size,
            size
          );
    }


    getMan(velocity){
        for (let row = 0; row < this.map.length; row++){
            for (let column = 0; column < this.map[row].length; column++){
                let tile = this.map[row][column];
                if (tile === 2){
                    this.map[row][column] = 0;
                    return new Man(
                        column * this.tileSize, 
                        row * this.tileSize, 
                        this.tileSize, 
                        velocity, 
                        this
                    );
                }
            }
        }
    }

    setCanvasSize(canvas){
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }

    didCollideWithEnvironment(x,y,keys){
        if(
        Number.isInteger(x/this.tileSize) && 
        Number.isInteger(y/this.tileSize)
        ){
            let column = 0;
            let row = 0;
            let nextColumn = 0;
            let nextRow = 0;
            
            switch(keys){
                case keys.right:
                    nextColumn = x + this.tileSize;
                    column = nextColumn/this.tileSize
                    row = y/this.tileSize;
                    break;
                case keys.left:
                    nextColumn = x - this.tileSize;
                    column = nextColumn/this.tileSize
                    row = y/this.tileSize;
                    break;
                case keys.up:
                    nextRow = y - this.tileSize;
                    row = nextRow/this.tileSize
                    column = x/this.tileSize;
                    break;
                case keys.down:
                    nextRow = y + this.tileSize;
                    row = nextRow/this.tileSize
                    column = x/this.tileSize;
                    break;
            }
            const tile = this.map[row][column];
            if (tile == 1){
                return true;
            }
        }
        return false;
    }
}