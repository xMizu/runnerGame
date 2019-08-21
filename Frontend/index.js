document.addEventListener("DOMContentLoaded", () => {
  let i = 0;
  let collide = false;
  let triggers = ["click", "keydown"];
  //canvas
  const gameWindow = document.getElementById("gameWindow");
  const box = gameWindow.getContext("2d");
  gameWindow.width = 300;
  gameWindow.height = 150;

  //background
  let bg = new Image();
  bg.src = "bg.png";
  let bgWidth = 0;
  // let grass = new Image();
  // grass.src = "Grass.png";

  //Testing for Class
  let player = new Player(gameWindow, 32, 32);
  let arr = [];

  //Event listener to look for Jump
  triggers.forEach(trigger => {
    document.addEventListener(trigger, () => {
      if (parseInt(player.y) >= gameWindow.height - player.height) {
        player.jump();
      }
    });
  });

  //   potential obstacle generator
  function obstacleSpawner() {
    if (Obstacle.all.length > 0) {
      // for (let i = 0; i < arr.length; i++) {
      while (Obstacle.all.length < 5) {
        new Obstacle(gameWindow, 16, 16);
      }
      Obstacle.all.forEach((grass, index) => {
        obstacleRemover(grass, index);
        grass.move();
      });
      // }
    } else {
      new Obstacle(gameWindow, 16, 16);
    }
  }

  function obstacleRemover(grass) {
    if (grass.x < -gameWindow.width * 2) {
      Obstacle.all.shift();
    }
  }

  function collision() {
    if (
      //check left
      Obstacle.all[0].x + 4 <= player.x + player.width - 5 &&
      //check right
      player.x + 4 <= Obstacle.all[0].x + 18 &&
      player.y + player.height - 5 >= Obstacle.all[0].y
    ) {
      scoreHolder.innerText = `Your score was ${i}`;
      modal.style.display = "block";
      collide = true;
    }
  }

  let delta;
  let lastTime = 0;

  function draw(timestamp) {
    let currentTime = timestamp;
    delta = (currentTime - lastTime) / 1000;
    box.clearRect(0, 0, gameWindow.width, gameWindow.height);
    bgWidth >= -1536 ? (bgWidth -= delta * 1000) : (bgWidth = 0);
    box.drawImage(bg, bgWidth, 0);
    player.draw(box);
    player.update(delta);
    box.fillText(`Hello World: ${i}`, 420, 20);
    obstacleSpawner();
    Obstacle.all.forEach(element => {
      element.update(box);
    });
    collision();
    i++;
    lastTime = currentTime;
    collide ? cancelAnimationFrame(timestamp) : requestAnimationFrame(draw);
  }

  // Get the modal
  const modal = document.getElementById("myModal");
  const scoreHolder = document.getElementById("score-holder");

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  requestAnimationFrame(draw);
});
