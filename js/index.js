const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };
    
    const playGame = new Game(ctx)

    function startGame() {
     playGame._start()
    }

    document.getElementById('stop-button').onclick = () => {
      stopGame();
    };
    function stopGame() {
      playGame._stop()
     }
  };