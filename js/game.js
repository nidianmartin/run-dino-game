class Game {
  constructor(ctx) {
    this._ctx = ctx;
    this._intervalId = null;
    this.canvasWidth = this._ctx.canvas.width;
    this.canvasHeight = this._ctx.canvas.height;
    this.x = 0;
    this.y = 0;

    this._jungle = new Jungle(this._ctx);
    this._dino = new Dino(this._ctx);
    this._score = new Score(this._ctx);

    this.tickBox = 0;
    this.tickMeteorites = 0;
    this.tickMeat = 0;
    this.tickTile = 0;

    this._tiles = [];
    this._obstacleBox = [];
    this._meteorites = [];
    this._meats = [];

    this._gameOver = false;
    this.frameNumber = 0;
    this.gameOver = new Image();
    this.gameOver.src = "images/freetileset/png/BG/bgGameOver.png";
  }

  _start() {
    this._intervalId = setInterval(() => {
      this._clear();
      this._addMeteorite();
      this._addObstacleBox();
      this._addMeat();
      this._addTile();
      this._draw();
      this._addCollisions();
      this._move();
      this._drawGameOver();
    }, 1000 / 60);
  }

  _clear() {
    this._obstacleBox.filter((obst) => obst.x + obst.width > 0);
    this._meteorites.filter((met) => met.x + met.width > 0);
    this._meats.filter((meat) => meat.x + meat.width > 0);
    this._tiles.filter((tile) => tile.x + tile.width > 0)
    this._ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  _draw() {
    this._jungle.draw();
    this._dino.draw();
    this._tiles.forEach((tile) => {
      tile.drawRaisedFloor();
    })
    this._meteorites.forEach((mets) => {
      mets.draw();
    });
    this._obstacleBox.forEach((box) => {
      box.draw();
    });
    this._meats.forEach((meat) => {
      meat.draw();
    });
    this._score.draw(this.frameNumber);
  }

  _move() {
    this._jungle.move();
    this._dino.move();
    this._tiles.forEach((tile) => {
      tile.move();
    });
    this._meteorites.forEach((mets) => {
      mets.move();
    });
    this._obstacleBox.forEach((box) => {
      box.move();
    });
    this._meats.forEach((meat) => {
      meat.move();
    });
  }

  _addMeteorite() {
    if (this.tickMeteorites++ === 250) {
      this.tickMeteorites = 0;
      this._meteorites.push(new Meteorite(ctx));
    }
  }

  _addObstacleBox() {
    if (this.tickBox++ === 300) {
      this.tickBox = 0;
      this._obstacleBox.push(new Box(ctx));
    }
  }

  _addMeat() {
    if (this.tickMeat++ === 1000) {
      this.tickMeat = 0;
      this._meats.push(new Meat(ctx));
    }
  }

  _addTile() {
    if (this.tickTile++ === 1000) {
      this.tickTile = 0;
      this._tiles.push(new Tiles(ctx))
    }
  }

  _addCollisions() {
    const dino = this._dino;
    this._obstacleBox.forEach((box, i) => {
      const colX = dino.x + dino.width > box.x && dino.x < box.x + box.width;
      const colY = dino.y + dino.height > box.y && dino.y < box.y + box.height;
      if (colX && colY) {
          this._obstacleBox.splice(i, 1)
          dino.health -= 1
        if(dino.health === 0) {
          this._gameOver = true;
          this._stop();
        }
      }
    });

    this._meteorites.forEach((mets, i) => {
      const colX = dino.x + dino.width > mets.x && dino.x < mets.x + mets.width;
      const colY = dino.y + dino.height > mets.y && dino.y < mets.y + mets.height;
      if (colX && colY) {
        this._meteorites.splice(i, 1)
        dino.health -= 1
        console.log(dino.health)
        if(dino.health === 0) {
          this._gameOver = true;
          this._stop();
        }
      }
    });

    this._meats.forEach((meat, i) => {
      const colX = dino.x + dino.width > meat.x && dino.x < meat.x + meat.width;
      const colY = dino.x + dino.width > meat.x && dino.x < meat.x + meat.width;
      if (colX && colY) {
        this.frameNumber += 1;
        this._meats.splice(i, 1)
        if(this.frameNumber === 1) {
          dino.health += 1
          console.log(dino.health)
        }
      }
    });

    this._tiles.forEach((tile) => {
      const colX = dino.x < tile.x + tile.width && (dino.x + dino.width - 100)> dino.x
      const colY = dino.y < tile.y + tile.height && dino.y + dino.height > tile.y
      
      if (colX && colY) {
        dino.y = 220
        dino.y0 = dino.y
        if((dino.x + dino.width - 100) > tile.x + tile.width) {
          dino.y = 508
          dino.y0 = dino.y
        }
      } else {
        dino.isFloor()
      }
    });
  }

  _stop() {
    clearInterval(this._intervalId);
  }

  _drawGameOver() {
    if (this._gameOver) {
      this._ctx.drawImage(
        this.gameOver,
        this.x,
        this.y,
        this.canvasWidth,
        this.canvasHeight
      );
      this._score.scoreFinal();
    }
  }
  _everyinterval(n) {
    return this.frameNumber % n === 0;
  }
}
