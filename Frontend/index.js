import Player from "./player.js";

document.addEventListener("DOMContentLoaded", () => {
  let i = 0;
  //canvas
  const gameWindow = document.getElementById("gameWindow");
  let box = gameWindow.getContext("2d");
  gameWindow.width = 500;
  gameWindow.height = 150;

  //Dino
  let dino = new Image();
  dino.src = "dino.gif";
  let height = 130;

  //background
  let bg = new Image();
  bg.src = "bg.png";
  let bgWidth = 0;
  let grass = new Image();
  grass.src = "Grass.png";

  //Testing for Class
  let player = new Player();
  let arr = [{ x: 500, y: 300 }];

  //jump
  function jump() {
    if (parseInt(height) === gameWindow.height - 20) {
      for (let i = 0; i <= 6000; i++) {
        height -= 0.005;
      }
    }
  }

  //Event listener to look for Jump
  document.addEventListener("keypress", function(e) {
    if (e.key === " ") {
      jump();
    }
  });

  let newGrass;

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

  // setInterval(spawn, 6000);
  //drawing all the items on browswer
  function draw() {
    if (bgWidth < -1536) {
      bgWidth = 0;
    } else {
      bgWidth -= 5;
    }
    if (height < gameWindow.height - 20) {
      height += 0.918;
    }
    box.clearRect(0, 0, gameWindow.width, gameWindow.height);
    box.drawImage(bg, bgWidth, 0);
    // box.drawImage(dino, 5, height);
    box.fillText(`Hello World: ${i}`, 420, 20);
    obstacleSpawner();
    // if (i < 200 || i > 500) {
    //   box.drawImage(grass, 400 - i / 10, 130);
    // } else {
    //   box.drawImage(grass, 100, 130);
    // }
    window.requestAnimationFrame(draw);
    i++;
  }
  draw();
});
