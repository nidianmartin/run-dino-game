class Box {
    constructor(ctx) {
      this._ctx = ctx;
  
      this.canvasWidth = this._ctx.canvas.width;
      this.canvasHeight = this._ctx.canvas.height;
      this.x = Math.random(500) * 1000;
      this.y = this.canvasHeight * 0.80;

      this.speedX = -1
  
      this.width = 50;
      this.height = 50;
  
      this._imag = new Image();
      this._imag.src = "images/freetileset/png/Object/Crate.png";
    }
  
    draw() {
      this._ctx.drawImage(this._imag, this.x, this.y, this.width, this.height);
    }

    move() {
        this.x += this.speedX
    }
  
}
  