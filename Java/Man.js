import Keys from "./Keys.js";

export default class Man {
  constructor(x, y, tileSize, velocity, GameMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.GameMap = GameMap;
    this.velocity = velocity;

    this.currentKeys = null;
    this.requestedKeys = null;
    this.madeFirstMove = false;

    document.addEventListener("keydown", this.#keydown);
    this.#loadMan();
  }

  draw(ctx, pause) {
    if(!pause){
      this.#move();
    }
    this.#pickCoin();
    ctx.drawImage(
      this.man[this.manImageIndex],
      this.x,
      this.y,
      this.tileSize,
      this.tileSize
    );
  }

  #loadMan() {
    const ManImage = new Image();
    ManImage.src = "../img/man.png";

    this.man = [ManImage];

    this.manImageIndex = 0;
  }

  #keydown = (event) => {
    //up
    if (event.keyCode == 38) {
      if (this.currentKeys == Keys.down) this.currentKeys = Keys.up;
      this.requestedKeys = Keys.up;
      this.madeFirstMove = true;
    }
    //down
    if (event.keyCode == 40) {
      if (this.currentKeys == Keys.up) this.currentKeys = Keys.down;
      this.requestedKeys = Keys.down;
      this.madeFirstMove = true;
    }
    //left
    if (event.keyCode == 37) {
      if (this.currentKeys == Keys.right) this.currentKeys = Keys.left;
      this.requestedKeys = Keys.left;
      this.madeFirstMove = true;
    }
    //right
    if (event.keyCode == 39) {
      if (this.currentKeys == Keys.left) this.currentKeys = Keys.right;
      this.requestedKeys = Keys.right;
      this.madeFirstMove = true;
    }
  };

  #move() {
    if (this.currentKeys !== this.requestedKeys) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
          if(
            !this.GameMap.didCollideWithEnvironment(
            this.x,
            this.y,
            this.requestedKeys
            )
          )
        this.currentKeys = this.requestedKeys;
      }
    }

    if(this.GameMap.didCollideWithEnvironment(
      this.x,
      this.y,
      this.currentKeys
      )
      ){
        return;
      }


    switch (this.currentKeys) {
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

  #pickCoin(){
    if(this.GameMap.pickCoin(this.x,this.y)){}
  }
}
