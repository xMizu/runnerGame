let i = 0;
//canvas
const gameWindow = document.getElementById("gameWindow");
const box = gameWindow.getContext("2d");
gameWindow.width = 300;
gameWindow.height = 150;

//background
let bg = new Image();
bg.src = "bg.png";
let bgWidth = 0;
let grass = new Image();
grass.src = "Grass.png";

//Testing for Class
let player = new Player(gameWindow, 32, 32);
let arr = [{ x: 496, y: 135 }];

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
    box.drawImage(grass, arr[i].x, arr[i].y, 16, 16);
    arr[i].x -= 4;
    if (arr[i].x < -20) {
      arr.push({
        x: parseInt(gameWindow.width + Math.random() * 300),
        y: 135
      });
      arr.splice([i], 1);
    }
  }
}

function collision() {
  if (
    //check left
    arr[0].x + 4 <= player.x + player.width - 5 &&
    //check right
    player.x + 4 <= arr[0].x + 18 &&
    player.y + player.height - 5 >= arr[0].y
  ) {
    alert("game over");
    window.cancelAnimationFrame();
  }
}

function draw() {
  box.clearRect(0, 0, gameWindow.width, gameWindow.height);

  if (bgWidth < -1536) {
    bgWidth = 0;
  } else {
    bgWidth -= 1.5;
  }
  // if (player.y < 136) {
  //   player.y++;
  // }
  box.drawImage(bg, bgWidth, 0);
  player.update(box);
  box.fillText(`Hello World: ${i}`, 420, 20);
  obstacleSpawner();
  collision(arr);
  window.requestAnimationFrame(draw);
  i++;
}
draw();
