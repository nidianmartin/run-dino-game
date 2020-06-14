const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.onload = () => {
  const playGame = new Game(ctx);
  document.getElementById("start-button").onclick = () => {
    playGame._start();
    document.getElementsByClassName("game-intro")[0].style.display = "none";
  };

  document.getElementById("stop-button").onclick = () => {
    playGame._stop();
  };
};

const refresh = document.getElementById("refresh-button");
refresh.addEventListener("click", () => {
  window.location.reload();
});
