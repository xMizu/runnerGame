document.addEventListener("DOMContentLoaded", () => {
  let i = 0;
  let collide = false;
  let triggers = ["click", "keydown"];
  let lowestScoreOnTable;
  let highscore = [];
  let obsVel = -300;
  let startingObstacles = 6;
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
      grass.x + 4 <= player.hitbox().x + player.hitbox().width - 5 &&
      //check right
      player.hitbox().x + 4 <= grass.x + 15 &&
      //check top
      player.hitbox().y + player.hitbox().height - 6 >= grass.y &&
      //check bottom
      player.hitbox().y <= grass.y + grass.height / 1.75
    ) {
      collide = true;
      scoreHolder.innerText = `Your score was ${i + 1}`;
      modal.style.display = "block";
      if (i > lowestScoreOnTable) {
        highScoreReached(i);
      } else {
        newGameButton = document.getElementById("new-game-button");
        newGameButton.addEventListener("click", event => {
          window.location.reload(true);
        });
      }
    }
  }

  let spawnRateX = () => {
    let randNumberX = Math.random();
    if (randNumberX < 0.3) {
      randNumberX = 0.5;
      return randNumberX;
    } else {
      return randNumberX;
    }
  };

  let spawnRateY = () => {
    let randNumberY = Math.random();
    if (randNumberY < 0.5) {
      randNumberY = gameWindow.height - player.height * 1.5;
      return randNumberY;
    } else {
      randNumberY = 184;
      return randNumberY;
    }
  };

  function obstacleSpawner() {
    if (Obstacle.all.length > 0) {
      if (i % 1000 === 0) {
        let last =
          Obstacle.furthestBlock() > gameWindow.width
            ? Obstacle.furthestBlock()
            : gameWindow.width;
        startingObstacles++;
        obsVel -= 50;
        new Obstacle(
          gameWindow,
          16,
          16,
          last + spawnRateX() * gameWindow.width + 100,
          spawnRateY(),
          obsVel
        );
      } else {
        while (Obstacle.all.length < startingObstacles) {
          let last =
            Obstacle.furthestBlock() > gameWindow.width
              ? Obstacle.furthestBlock()
              : gameWindow.width;
          new Obstacle(
            gameWindow,
            16,
            16,
            last + spawnRateX() * gameWindow.width,
            spawnRateY(),
            obsVel
          );
        }
      }
    } else {
      new Obstacle(gameWindow, 16, 16, gameWindow.width + 50, 184, obsVel);
    }
    Obstacle.all.forEach((grass, index) => {
      obstacleRemover(grass, index);
      grass.move(delta);
      collision(grass);
    });
  }

  let delta = 1 / 60;
  let lastTime = 0;
  let accumulatedTime = 0;

  function draw(timestamp) {
    let currentTime = timestamp;
    accumulatedTime = (currentTime - lastTime) / 1000;
    box.clearRect(0, 0, gameWindow.width, gameWindow.height);
    if (accumulatedTime > delta * 2) {
      // bgWidth >= -1536 ? (bgWidth -= delta * 100) : (bgWidth = 0);
      // box.drawImage(bg, bgWidth, 0);
      lastTime = currentTime;
      player.swapImage();
    }
    box.fillText(`Hello World: ${i}`, 420, 20);
    player.update(delta);
    player.draw(box);
    obstacleSpawner(delta);
    Obstacle.all.forEach(element => {
      element.update(box);
    });
    collide ? cancelAnimationFrame(timestamp) : requestAnimationFrame(draw);
    i++;
  }

  // setInterval(swapImage, 90);

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
