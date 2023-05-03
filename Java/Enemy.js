import Keys from "./Keys.js"

export default class Enemy {
    constructor(x, y, tileSize, velocity, GameMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.GameMap = GameMap;

        this.#getEnemy();

        this.movingEnemy = Math.floor(Math.random() * Object.keys(Keys).length
        );

        this.enemyTimerDefualt = this.#random(10,50)
        this.enemyTimer = this.enemyTimerDefualt;
    }

    draw(ctx, pause) {
        if(!pause){
            this.#move();
            this.#changeDirection();    
        }
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize)
    }

    collideWith(man){
        const size = this.tileSize / 2;
        if(
            this.x < man.x + size &&
            this.x + size < man.x &&
            this.y < man.y + size &&
            this.y + size < man.y 
        ){
            return true;
        }else {
            return false;
        }
      }

    #changeDirection(){
        this.enemyTimer--;
        let newEnemyDirection = null;
        if(this.enemyTimer ==0){
            this.enemyTimer = this.enemyTimerDefualt
            newEnemyDirection = Math.floor(
                Math.random() * Object.keys(Keys).length)
        }

        if(newEnemyDirection !== null && this.movingEnemy != newEnemyDirection){
            if(
                Number.isInteger(this.x / this.tileSize) &&
                Number.isInteger(this.y / this.tileSize)
            ){
                if(
                    !this.GameMap.didCollideWithEnvironment(
                        this.x,
                        this.y,
                        newEnemyDirection
                    )
                ){
                    this.movingEnemy = newEnemyDirection;
                }
            }
        }
    }

    #getEnemy(){
        this.enemy = new Image();
        this.enemy.src = "../img/enemy.png"

        this.image = this.enemy;
    }

    #move(){
        if(!this.GameMap.didCollideWithEnvironment(
            this.x, 
            this.y, 
            this.movingEnemy
            )
        ){
            switch(this.movingEnemy){
                case Keys.up:
                    this.y -= this.velocity;
                    break;
                case Keys.down:
                    this.y += this.velocity
                    break;
                case Keys.left:
                    this.x -= this.velocity
                    break;
                case Keys.right:
                    this.x += this.velocity
                    break;
            }
        }
    }

    #random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
}