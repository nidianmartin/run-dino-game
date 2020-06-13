class Dino {
  constructor(ctx) {
    this._ctx = ctx;

    this.canvasWidth = this._ctx.canvas.width;
    this.canvasHeight = this._ctx.canvas.height;
    this.x = 0;
    this.y = this.canvasHeight * 0.66;
    this.y0 = this.y;

    this.width = this.canvasWidth * 0.10;
    this.height = this.canvasHeight * 0.20;
    this.health = 5

    this.speedX = 0;
    this.speedY = 0;
    this.accelerationX = 0;
    this.accelerationY = 0.9;
    this.gravity = 0;

    //Imagenes dino en movimiento
    this._imag = new Image();
    this._imag.src = "images/dino/dino2.png";
    this._imag.frames = 4;
    this._imag.framesIndex = 0;
    this._ticks = 0;

    new Movements(this).listenerMove();
    this._tiles = new Tiles(this._ctx);
    this._box = new Box(this._ctx);
    this._meat = new Meat(this._ctx);
  }

  draw() {
    this._ctx.drawImage(
      this._imag,
      (this._imag.framesIndex * this._imag.width) / this._imag.frames,
      0,
      this._imag.width / this._imag.frames,
      this._imag.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    if (this._ticks++ > 10) {
      this._ticks = 0;

      if (!this.isFloor()) {
        this._imag.framesIndex = 3;
      } else if (++this._imag.framesIndex >= this._imag.frames) {
        this._imag.framesIndex = 0;
      }
    }
  }

  move() {
    this.speedX += this.accelerationX;
    this.speedY += this.accelerationY;
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y >= this.y0) {
      this.speedY = 0;
      this.y = this.y0;
    }
  }

  isFloor() {
    return this.y === this.y0;
  }

  jump() {
    if (this.isFloor) {
      //add sound
      this._imag.framesIndex = 3;
      this.speedY -= 15;
      this.y -= 10;
    }
  }
}

