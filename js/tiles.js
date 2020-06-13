class Tiles {
  constructor(ctx) {
    this._ctx = ctx;
    this.canvasWidth = this._ctx.canvas.width;
    this.canvasHeight = this._ctx.canvas.height;
    this.x = this.canvasWidth * 0.70;
    this.y = this.canvasHeight * 0.3;

    this.width = 300;
    this.height = 250;

    this.speedX = -3;
    this.speedY = 0;
    this.accelerationX = 0;
    this.accelerationY = 0;

    //images floor
    this._imag = new Image();
    this._imag.src = "images/freetileset/png/Tiles/tileUp.png";
  }


  drawRaisedFloor() {
    this._ctx.drawImage(
      this._imag,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  move() {
    this.speedX += this.accelerationX;
    this.speedY += this.accelerationY;
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x + this.canvasWidth <= 0) {
      this.x = this.canvasWidth * 0.70;;
    }
  }
}

class Meat extends Tiles {
  constructor(ctx) {
    super(ctx);
    this.width = 50;
    this.height = 50;
    this.y = this.canvasHeight * 0.42;
    this._imag.src = "images/freetileset/png/Object/meat.png";
  }

  draw() {
    this._ctx.drawImage(this._imag, this.x, this.y, this.width, this.height);
  }
}
