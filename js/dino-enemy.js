class DinoRex {
  constructor(ctx) {
    this._ctx = ctx;
    this.canvasWidth = this._ctx.canvas.width;
    this.canvasHeight = this._ctx.canvas.height;
    this.x = Math.random() * (800 - 1200) + 800;
    this.y = this.canvasHeight * 0.1;
    this.width = 50;
    this.height = 50;

    this.health = 50;

    this.speedX = 0;
    this.speedY = 0;
    this.accelerationX = 0;
    this.accelerationY = 0.9;
    this.gravity = 0;

    this._imag = new Image();
    this._imag.src = "images/dino/dino-rex-enemy.png";
  }

  draw() {
    this._ctx.drawImage(
      this._imag,
      this.x,
      this.y,
      this.canvasWidth,
      this.canvasHeight
    );
  }
}
