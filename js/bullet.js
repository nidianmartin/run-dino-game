class Bullet {
    constructor(ctx, x, y) {
      this.ctx = ctx
      this.x = x
      this.y = y
      this.vx = 15
      this.width = 20;
      this.height = 20;
      this.canvasWidth = this.ctx.canvas.width;
      this.canvasHeight = this.ctx.canvas.height;

      this.imag = new Image();
      this.imag.src = "images/freetileset/png/Object/meteorito.png";
    }
  
    draw() {
      this.ctx.drawImage(this.imag, this.x, this.y, this.width, this.height);
    }
  
    move() {
      this.x += this.vx
    }
  
    isVisible() {
      return this.ctx.canvas.width > this.x
    }
  }