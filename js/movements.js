class Movements {
  constructor(player) {
    this.player = player;
    this.speedX = 0;
    this.speedY = 0;
    this.accelerationX = 0;
    this.accelerationY = 0;
  }

  listenerMove() {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case UP:
          if (this.player.isFloor()) {
            this.player.speedY -= 15;
            this.player.y -= 10;
          }
          break;
        case RIGHT:
          this.player.speedX = 1;
          break;
        case LEFT:
          this.player.speedX = -1;
          break;
        case BOTTON:
          this.player.height = 150;
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case UP:
          this.player.speedY = 0;
          break;
        case RIGHT:
          this.player.speedX = 0;
          break;
        case LEFT:
          this.player.speedX = 0;
          break;
        case BOTTON:
          this.player.height;
          break;
      }
    });
  }
}
