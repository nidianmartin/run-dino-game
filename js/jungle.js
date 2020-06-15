class Jungle {
  constructor(ctx) {
    this._ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.canvasWidth = this._ctx.canvas.width;
    this.canvasHeight = this._ctx.canvas.height;

    this.speedX = -3;
    this.speedY = 0;
    this.accelerationX = 0;
    this.accelerationY = 0;

    this._imag = new Image();
    this._imag.src = 'images/freetileset/png/BG/BG.png';
  }

  draw() {
    this._ctx.drawImage(
      this._imag,
      this.x,
      this.y,
      this.canvasWidth,
      this.canvasHeight
    );

    this._ctx.drawImage(
      this._imag,
      this.x + this.canvasWidth,
      this.y,
      this.canvasWidth,
      this.canvasHeight
    );
  }

  move() {
    this.speedX += this.accelerationX;
    this.speedY += this.accelerationY;
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x + this.canvasWidth <= 0) {
      this.x = 0;
    }
  }
}

class JungleLevel2 extends Jungle {
  constructor(ctx) {
    super(ctx) 
    this.speedX = -3;
    this._imag = new Image();
    this._imag.src = 'images/freetileset/png/BG/BGNivel2.png';
  }
}