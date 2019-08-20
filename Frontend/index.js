let i = 0;
//canvas
const gameWindow = document.getElementById("gameWindow");
const box = gameWindow.getContext("2d");
gameWindow.width = 500;
gameWindow.height = 150;

//background
let bg = new Image();
bg.src = "bg.png";
let bgWidth = 0;
let grass = new Image();
grass.src = "Grass.png";

//gravity
const gravity = 0.5;

//Testing for Class
let player = new Player(gameWindow, 64, 64);
let arr = [{ x: 500, y: 130 }];

//Event listener to look for Jump
document.addEventListener("keypress", function(e) {
  if (e.key === " ") {
    if (parseInt(player.y) === gameWindow.height - player.height) {
      player.jump();
    }
  }
});

//   potential obstacle generator
function obstacleSpawner() {
  for (let i = 0; i < arr.length; i++) {
    box.drawImage(grass, arr[i].x, arr[i].y);
    arr[i].x -= 4;
    if (arr[i].x < 0) {
      arr.push({
        x: parseInt(gameWindow.width + Math.random() * 300),
        y: 130
      });
      arr.splice([i], 1);
    }
  }
}

function collision() {
  //check left
  if (arr[0].x <= player.x && arr[0].y >= player.y) {
    window.cancelAnimationFrame(draw);
    alert("game over");
  }
}

let deltaTime = 0;
let lastTime = 0;

function draw(time) {
  deltaTime = time - lastTime;
  box.clearRect(0, 0, gameWindow.width, gameWindow.height);
  if (bgWidth < -1536) {
    bgWidth = 0;
  } else {
    bgWidth -= 5;
  }
  if (player.y < gameWindow.height - player.height) {
    player.y += 0.918;
  }
  box.drawImage(bg, bgWidth, 0);
  player.draw(box);
  box.fillText(`Hello World: ${i}`, 420, 20);
  obstacleSpawner();
  collision(arr);
  window.requestAnimationFrame(draw);
  i++;
}
draw(0);
