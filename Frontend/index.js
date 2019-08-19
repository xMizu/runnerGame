document.addEventListener("DOMContentLoaded", function() {});

// Canvas
const gameWindow = document.getElementById("gameWindow");
let box = gameWindow.getContext("2d");

let player = new Player();

box.font = "30px Arial";
box.fillText("Hello World", 20, 150);
player.show();
box.fill();

document.addEventListener("keypress", function(e) {
  if (e.key === " ") {
    console.log("jumping");
    box.clearRect(this.x, this.y, 10, 10);
    box.save();
    player.jump();
    box.fill();
    box.restore();
  }
});
