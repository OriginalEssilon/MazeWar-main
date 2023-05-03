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
    }

    draw(ctx) {
        this.#move();
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize)
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
            switch (this.movingDenemy) {
                case Keys.up:
                  this.y -= this.velocity;
                  break;
                case Keys.down:
                  this.y += this.velocity;
                  break;
                case Keys.left:
                  this.x -= this.velocity;
                  break;
                case Keys.right:
                  this.x += this.velocity;
                  break;
              }
        }
    }

    #random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
}