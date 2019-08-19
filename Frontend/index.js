const gameWindow = document.getElementById("gameWindow");
let box = gameWindow.getContext("2d");
gameWindow.width = 500;
gameWindow.height = 150;
let dino = new Image();
dino.src = "dino.gif";
let height = 130;
let bg = new Image();
bg.src = "bg.png";
let bgWidth = 0;
let spawnerMovement = 600;
let grass = new Image();
grass.src = "Grass.png";
grass.width = 24;
grass.height = 24;

function jump() {
  for (let i = 0; i <= 7000; i++) {
    height -= 0.005;
  }
}

document.addEventListener("keypress", function(e) {
  if (e.key === " ") {
    console.log("jumping");
    jump();
  }
});

function obstacleSpawner() {
  let spawnPossibility = 0.5;
  if (Math.random() === spawnPossibility) {
  }
}

function draw() {
  if (bgWidth < -1536) {
    bgWidth = 0;
  } else {
    bgWidth -= 5;
  }
  if (height < gameWindow.height - 20) {
    height += 0.918;
  }
  spawnerMovement -= 4;
  box.clearRect(0, 0, gameWindow.width, gameWindow.height);
  box.drawImage(bg, bgWidth, 0);
  box.drawImage(dino, 5, height);
  obstacleSpawner();
  box.drawImage(grass, spawnerMovement, 130);
  window.requestAnimationFrame(draw);
}

draw();
