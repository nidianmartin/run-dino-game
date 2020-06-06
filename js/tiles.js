class Tiles {
  constructor(ctx) {
    this._ctx = ctx;
    this._intervalId = null
    this.canvasWidth = this._ctx.canvas.width;
    this.canvasHeight = this._ctx.canvas.height;
    this.x = 0;
    this.y = this.canvasHeight * 0.88;

    this.raisedX = this.canvasWidth * 0.2;
    this.raisedY = this.canvasHeight * 0.65;

    this.width = 100;
    this.height = 85;

    this.speedX = 0 //-1;
    this.speedY = 0;
    this.accelerationX = 0;
    this.accelerationY = 0;

    //images floor
    this._imag = new Image();
    this._imag.src = "images/freetileset/png/Tiles/1.png";

    this._imag2 = new Image();
    this._imag2.src = "images/freetileset/png/Tiles/2.png";

    this._imag3 = new Image();
    this._imag2.src = "images/freetileset/png/Tiles/3.png";
  }

  drawFloor() {
    
    this._ctx.drawImage(this._imag, this.x, this.y, this.width, this.height);

    this._ctx.drawImage(
      this._imag2,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );

    this._ctx.drawImage(
      this._imag3,
      this.x + this.width + 100,
      this.y,
      this.width,
      this.height
    );
  }

  drawRaisedFloor() {
    this._ctx.drawImage(
      this._imag,
      this.raisedX,
      this.raisedY,
      (this.width - 20),
      (this.height - 10)
    );

    this._ctx.drawImage(
      this._imag2,
      this.raisedX + 80,
      this.raisedY,
      (this.width - 20),
      (this.height - 10)
    );
  }

  move() {
    this.speedX += this.accelerationX;
    this.speedY += this.accelerationY;
    this.x += this.speedX;
    this.y += this.speedY;

    this.raisedX += this.speedX
    this.raisedY += this.speedY

    if (this.x + this.canvasWidth <= 0) {
      this.x = 0;
    }

    if (this.raisedX + this.canvasWidth <= 0) {
        this.raisedX = 0;
      }
  }
}
