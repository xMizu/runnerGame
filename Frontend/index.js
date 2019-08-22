document.addEventListener("DOMContentLoaded", () => {
  let i = 0;
  let collide = false;
  let triggers = ["click", "keydown"];
  let lowestScoreOnTable;
  let highscore = [];

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
  function collision(grass) {
    if (
      //check left
      grass.x + 4 <= player.x + player.width - 5 &&
      //check right
      player.x + 4 <= grass.x + 18 &&
      //check top
      player.y + player.height - 5 >= grass.y
    ) {
      collide = true;
      scoreHolder.innerText = `Your score was ${i + 1}`;
      modal.style.display = "block";
      if (i > lowestScoreOnTable) {
        highScoreReached();
      }
    }
  }

  function obstacleSpawner() {
    if (Obstacle.all.length > 0) {
      while (Obstacle.all.length < 10) {
        let last =
          Obstacle.furthestBlock() > gameWindow.width
            ? Obstacle.furthestBlock()
            : gameWindow.width;
        new Obstacle(gameWindow, 16, 16, last + spawnRate() * 500);
      }
      Obstacle.all.forEach((grass, index) => {
        obstacleRemover(grass, index);
        grass.move();
        collision(grass);
      });
    } else {
      new Obstacle(gameWindow, 16, 16, gameWindow.width + 50);
    }
  }

  let delta;
  let lastTime = 0;

  function draw(timestamp) {
    let currentTime = timestamp;
    delta = (currentTime - lastTime) / 1000;
    box.clearRect(0, 0, gameWindow.width, gameWindow.height);
    // bgWidth >= -1536 ? (bgWidth -= delta * 100) : (bgWidth = 0);
    // box.drawImage(bg, bgWidth, 0);
    player.draw(box);
    player.update(delta);
    box.fillText(`Hello World: ${i}`, 420, 20);
    obstacleSpawner();
    Obstacle.all.forEach(element => {
      element.update(box);
    });
    lastTime = currentTime;
    collide ? cancelAnimationFrame(timestamp) : requestAnimationFrame(draw);
    i++;
  }

  const highscoreSection = document.getElementById("high-score-table");
  fetch("http://localhost:3000/players")
    .then(resp => resp.json())
    .then(resp => {
      highscore = resp;
      lowestScoreOnTable = highscore[2] ? highscore[2].score : 0;
      highscore.forEach(scorePlacer);
    });

  function scorePlacer(player, index) {
    highscoreSection.innerHTML += `
    <tr>
    <td><b>${index + 1}.</b></td>
    <td id="${player.name}" >${player.name}</td>
    <td id="${player.score}" >${player.score}</td>
    </tr>`;
  }

  requestAnimationFrame(draw);
});
