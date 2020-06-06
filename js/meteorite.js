class Meteorite {
  constructor(ctx) {
    this._ctx = ctx;

    this.canvasWidth = this._ctx.canvas.width;
    this.canvasHeight = this._ctx.canvas.height;
    this.x = (Math.random() * (800 - 1200) + 800);
    this.y = 50;

    this.width = 50;
    this.height = 50;

    this.speedX = -4
    this.speedY = 4
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.gravity = 0;

    this._imag = new Image();
    this._imag.src = "images/freetileset/png/Object/meteorito.png";
  }

  draw() {
    this._ctx.drawImage(this._imag, this.x, this.y, this.width, this.height);
  }

  move() {
    this.speedY += this.accelerationY;
    this.speedY += this.gravity;
    this.speedX += this.accelerationX;
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y + this.canvasHeight <= 0) {
      this.y = 0;
    }
  }
}
