class Game {
  constructor(ctx) {
    this._ctx = ctx;
    this._intervalId = null;
    this._intervalIdNex = null;
    this._timeOutNext = null;
    this.canvasWidth = this._ctx.canvas.width;
    this.canvasHeight = this._ctx.canvas.height;
    this.x = 0;
    this.y = 0;

    this._jungle = new Jungle(this._ctx);
    this._jugleLevel2 = new JungleLevel2(this._ctx);
    this._dino = new Dino(this._ctx);
    this._dinoRex = new DinoRex(this._ctx);
    this._score = new Score(this._ctx);
    this._health = new Healt(this._ctx);

    this.tickBox = 0;
    this.tickMeteorites = 0;
    this.tickMeteoritesNext = 0;
    this.tickMeat = 0;
    this.tickTile = 0;
    this.tickRex = 0;

    this._tiles = [];
    this._dinoEnemy = [];
    this._obstacleBox = [];
    this._meteorites = [];
    this._meats = [];

    this._gameOver = false;
    this._frameNumber = 0;
    this.gameOver = new Image();
    this.gameOver.src = "images/freetileset/png/BG/bgGameOver.png";

    //sounds
    this._music = new Audio();
    this._yeah = new Audio();
    this._newLife = new Audio();
    this._ouch = new Audio();
    this._rexSound = new Audio();
    this._gameOverSound = new Audio();
    this._music.src = "sound/myMusic.mp3";
    this._yeah.src = "sound/mario-kart-64.mp3";
    this._newLife.src = "sound/newLife.mp3";
    this._ouch.src = "sound/oouch.mp3";
    this._rexSound.src = "sound/rugido.mp3"
    this._gameOverSound.src = "sound/gameOver.mp3";
  }

  _start() {
    this._music.play();
    this._intervalId = setInterval(() => {
      this._clear();
      this._addMeteorite();
      this._addObstacleBox();
      this._addTile();
      this._draw();
      this._addCollisions();
      this._move();
      this._drawGameOver();
    }, 1000 / 60);
    this._timeOutNext = setTimeout(() => {
      this._nextLevel();
    }, 50000);
  }

  _clear() {
    this._obstacleBox.filter((obst) => obst.x + obst.width < 0);
    this._meteorites.filter((met) => met.x + met.width > 0);
    this._meats.filter((meat) => meat.x + meat.width < 0);
    this._tiles.filter((tile) => tile.x + tile.width < 0);
    this._ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this._dino.clearBullets();
  }

  _draw() {
    this._jungle.draw();
    this._tiles.forEach((tile) => {
      tile.drawRaisedFloor();
    });
    this._dino.draw();
    this._meteorites.forEach((mets) => {
      mets.draw();
    });
    this._obstacleBox.forEach((box) => {
      box.draw();
    });
    this._meats.forEach((meat) => {
      meat.draw();
    });
    this._score.draw(this._frameNumber);
    this._health.draw(this._dino.health);
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

  _addTile() {
    if (this.tickTile++ === 500) {
      this.tickTile = 0;
      this._tiles.push(new Tiles(ctx));
      this._meats.push(new Meat(ctx));
    }
  }

  _addCollisions() {
    const dino = this._dino;
    this._obstacleBox.forEach((box, i) => {
      const colX = dino.x + dino.width > box.x && dino.x < box.x + box.width;
      const colY = dino.y + dino.height > box.y && dino.y < box.y + box.height;
      if (colX && colY) {
        this._ouch.play();
        this._obstacleBox.splice(i, 1);
        dino.health -= 1;
        if (dino.health === 0) {
          this._gameOver = true;
          this._stop();
        }
      }
    });

    this._meteorites.forEach((mets, i) => {
      const colX = dino.x + dino.width > mets.x && dino.x < mets.x + mets.width;
      const colY =
        dino.y + dino.height > mets.y && dino.y < mets.y + mets.height;
      if (colX && colY) {
        this._ouch.play();
        this._meteorites.splice(i, 1);
        dino.health -= 1;
        if (dino.health === 0) {
          this._gameOver = true;
          this._stop();
        }
      }
    });

    this._meats.forEach((meat, i) => {
      const colX = dino.x + dino.width > meat.x && dino.x < meat.x + meat.width;
      const colY =
        dino.y + dino.height > meat.y && dino.y < meat.y + meat.height;
      if (colX && colY) {
        this._yeah.play();
        this._frameNumber += 20;
        this._meats.splice(i, 1);
        if (this._frameNumber === 5) {
          this._newLife.play();
          dino.health++;
        }
      }
    });

    this._tiles.forEach((tile) => {
      const colX = dino.x < tile.x + tile.width && dino.x + dino.width - 20 > tile.x;
      const colY = dino.y < tile.y + tile.height && dino.y + dino.height > tile.y;

      if (colX && colY) {
        dino.y = 220;
        dino.y0 = dino.y;
        if (dino.x + dino.width - 100 > tile.x + tile.width) {
          dino.y = 508;
          dino.y0 = dino.y;
        }
      } else {
        dino.isFloor();
      }
    });
  }

  //Siguiente NIVEL

  _nextLevel() {
    clearInterval(this._intervalId);
    this._intervalIdNex = setInterval(() => {
      this._clear();
      this._addMeteoriteNext();
      this._addDinoRex();
      this._drawNext();
      this._addCollisionNext();
      this._moveNext();
      this._drawGameOver();
    }, 1000 / 60);
  }

  _drawNext() {
    this._jugleLevel2.draw();
    this._dino.draw();
    this._dinoEnemy.forEach((rex) => {
      rex.draw();
    });
    this._meteorites.forEach((mets) => {
      mets.draw();
    });
    this._score.draw(this._frameNumber);
    this._health.draw(this._dino.health);
  }

  _moveNext() {
    this._jugleLevel2.move();
    this._dino.move();
    this._meteorites.forEach((mets) => {
      mets.move();
    });
  }

  _addCollisionNext() {
    const dino = this._dino;
    this._meteorites.forEach((mets, i) => {
      const colX = dino.x + dino.width > mets.x && dino.x < mets.x + mets.width;
      const colY =
        dino.y + dino.height > mets.y && dino.y < mets.y + mets.height;
      if (colX && colY) {
        this._ouch.play();
        this._meteorites.splice(i, 1);
        dino.health -= 1;
        if (dino.health === 0) {
          this._gameOver = true;
          this._stop();
        }
      }
    });

    const bulletDino = this._dino.bullets
    this._dinoEnemy.forEach((rex, i) => {
      const colX = dino.x + dino.width < rex.x && dino.x < rex.x + rex.width;
      const colY = dino.y + dino.height > rex.y && dino.y < rex.y + rex.height;
      if(colX && colY) {
        this.gameOver = true;
        this._stop();
      }

      bulletDino.forEach((bullet) => {
        const colX = rex.x < ((bullet.x) + (bullet.width)) && ((rex.x) + (bullet.width)) > bullet.x;
        if (colX) {
          this._rexSound.play();
          rex.health -= 2;
          if (rex.health === 0) {
            this._dinoEnemy.splice(i, 1);
            this._newLife.play();
            dino.health += 2;
            this._frameNumber += 50
          }
        }
      })
    });

    this._tiles.forEach((tile) => {
      if(!tile) {
        dino.y = 508;
        dino.y0 = dino.y;
      }
    });
  }

  _addDinoRex() {
    if (this.tickRex++ === 1000) {
      this.tickRex = 0;
      this._dinoEnemy.push(new DinoRex(ctx));
    }
  }

  _addMeteoriteNext() {
    if (this.tickMeteoritesNext++ === 20) {
      this.tickMeteoritesNext = 0;
      this._meteorites.push(new Meteorite(ctx));
    }
  }

  _stop() {
    this._music.pause();
    clearInterval(this._intervalId);
    clearInterval(this._intervalIdNex);
    clearTimeout(this._timeOutNext)
  }

  _pause() {
    this._music.pause();
    clearInterval(this._intervalId);
    clearInterval(this._intervalIdNex);
  }

  _drawGameOver() {
    if (this._gameOver) {
      this._gameOverSound.play();
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
    return this._frameNumber % n === 0;
  }
}
