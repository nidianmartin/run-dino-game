class Game {
  constructor(ctx) {
    this._ctx = ctx;
    this._intervalId = null;
    this.canvasWidth = this._ctx.canvas.width;
    this.canvasHeight = this._ctx.canvas.height;

    this._jungle = new Jungle(this._ctx);
    //this._tiles = new Tiles(this._ctx);
    this._dino = new Dino(this._ctx)

    this.tick = 0;
    this._obstacleBox = [];
    this._meteorites = [];
    this._meats = []
  }

  _start() {
    this._intervalId = setInterval(() => {
      this._clear();
      this._addMeteorite();
      this._addObstacleBox()
      this._draw();
      this._move();
    }, 1000 / 60);
  }

  _clear() {
    this._ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  _draw() {
    this._jungle.draw();
    this._dino.draw()
    this._meteorites.forEach((mets) => {
      mets.draw();
    });
    this._obstacleBox.forEach((box) => {
      box.draw();
    });
    this._meats.forEach((meat) => {
      meat.draw()
    })
  }

  _move() {
    this._jungle.move();
    this._dino.move();
    this._meteorites.forEach((mets) => {
      mets.move();
    });
    this._obstacleBox.forEach((box) => {
      box.move();
    });
    this._meats.forEach((meat) => {
      meat.move()
    })
  }

  _addMeteorite() {
    if (this.tick++ === 500) {
      this.tick = 0;
      this._meteorites.push(new Meteorite(ctx));
    }
  }

  _addObstacleBox() {
    if (this.tick++ === 500) {
      this.tick = 0;
      this._obstacleBox.push(new Box(ctx));
    }
  }
}
