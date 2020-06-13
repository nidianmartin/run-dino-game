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
          this.player.jump()
          break;
        case RIGHT:
          this.player.speedX = 3;
          break;
        case LEFT:
          this.player.speedX = -3;
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case RIGHT:
          this.player.speedX = 0;
          break;
        case LEFT:
          this.player.speedX = 0;
          break;
      }
    });
  }
}
