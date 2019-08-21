document.addEventListener("DOMContentLoaded", () => {
  let i = 0;
  let collide = false;
  let triggers = ["click", "keydown"];
  //canvas
  const gameWindow = document.getElementById("gameWindow");
  const box = gameWindow.getContext("2d");
  gameWindow.width = 400;
  gameWindow.height = 200;

  //background
  let bg = new Image();
  bg.src = "bg.png";
  let bgWidth = 0;

  //Testing for Class
  let player = new Player(gameWindow, 32, 32);

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
      while (Obstacle.all.length < 4) {
        let last = Obstacle.lastElement();

        new Obstacle(gameWindow, 16, 16, last.x + Math.random() * 400);
      }
      Obstacle.all.forEach((grass, index) => {
        obstacleRemover(grass, index);
        grass.move();
        // collision(grass);
      });
    } else {
      new Obstacle(gameWindow, 16, 16, gameWindow.width + 50);
    }
  }

  function obstacleRemover(grass, index) {
    if (grass.x < -20) {
      Obstacle.all.splice(index, 1);
    }
  }

  function collision(grass) {
    if (
      //check left
      grass.x + 4 <= player.x + player.width - 5 &&
      //check right
      player.x + 4 <= grass.x + 18 &&
      player.y + player.height - 5 >= grass.y
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
    bgWidth >= -1536 ? (bgWidth -= delta * 100) : (bgWidth = 0);
    box.drawImage(bg, bgWidth, 0);
    player.draw(box);
    player.update(delta);
    box.fillText(`Hello World: ${i}`, 420, 20);
    obstacleSpawner();
    Obstacle.all.forEach(element => {
      element.update(box);
    });
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
