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
  let windowBg = ["url('volcano.jpg')", "url('bg3.jpg')"];
  function changeBg() {
    document.body.style.backgroundImage =
      windowBg[Math.floor(Math.random() * windowBg.length)];
    document.body.style.backgroundPosition = "center";
  }
  //background
  // constructor           (width, height, source, startingY, speed, startingX)
  new Background(200, 200, "pictures/cloud5.png", -70, 0.5, 426);
  new Background(200, 200, "pictures/cloud5.png", -70, 0.5, 126);
  new Background(200, 200, "pictures/cloud2.png", -15, 0.6, 500);
  new Background(100, 100, "pictures/tree.png", 119, 1, 360);
  new Background(100, 100, "pictures/mountain.png", 130, 0.3, 4);
  new Background(90, 90, "pictures/mountain.png", 140, 0.3, 400);

  // special
  let easterEgg = false;

  //Player/Dino Class
  let player = new Player(
    gameWindow,
    32,
    32,
    "dino-left-foot.png",
    "dino-right-foot.png"
  );
  let player2 = new Player(
    gameWindow,
    24,
    24,
    "greenDino.png",
    "greenDinoRun.png"
  );
  player2.x = 450;
  player2.y = player2.y - 10;

  //Event listener to look for Jump
  triggers.forEach(trigger => {
    document.addEventListener(trigger, () => {
      if (parseInt(player.y) >= gameWindow.height - player.height) {
        player.jump();
      }
    });
  });

  // Collision detection
  function collision(grass) {
    let p = player.hitbox()[0];
    if (
      //check left
      grass.x < p.x + p.width &&
      //check right
      grass.x + grass.width > p.x &&
      //check top
      grass.y <= p.y + p.height &&
      //check bottom
      grass.y + grass.height >= p.y
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
        window.addEventListener("keydown", e => window.location.reload(true));
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
    if (randNumberY < 0.3) {
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
      new Obstacle(
        gameWindow,
        16,
        16,
        gameWindow.width + 50,
        gameWindow.height - 16,
        obsVel
      );
    }
    Obstacle.all.forEach((grass, index) => {
      obstacleRemover(grass, index);
      grass.move(delta);
      collision(grass);
    });
  }

  function bgSpawner() {
    if (Background.all.length > 0) {
      while (Background.all.length < 20) {
        let last =
          Background.furthestBlock() > gameWindow.width
            ? Background.furthestBlock()
            : gameWindow.width;
        let bg = Background.BgRandomizer();
        let plusOrMinus =
          Math.random() < 0.05 ? -Math.random() - 1 : Math.random();
        +1;
        if (bg.name === "cloud") {
          bg.y = plusOrMinus * -70;
        } else if (bg.name === "tree") {
          bg.y = 119;
        } else {
          bg.y = 400;
        }
        new Background(
          bg.size,
          bg.size,
          bg.image,
          bg.y,
          bg.speed,
          last + bg.size
        );
      }
    } else {
      new Background(200, 200, "pictures/cloud5.png", -70, 0.75, 426);
      new Background(200, 200, "pictures/cloud5.png", -70, 0.75, 126);
      new Background(200, 200, "pictures/cloud2.png", -15, 0.25, 500);
      new Background(100, 100, "pictures/tree.png", 119, 1.5, 360);
      new Background(100, 100, "pictures/mountain.png", 130, 0.3, 400);
      new Background(90, 90, "pictures/mountain.png", 140, 0.3, 400);
    }
    Background.all.forEach((bg, index) => {
      bgRemover(bg, index);
      bg.draw(box);
    });
  }

  let delta = 1 / 60;
  let lastTime = 0;
  let accumulatedTime = 0;

  function draw(timestamp) {
    let currentTime = timestamp;
    accumulatedTime = (currentTime - lastTime) / 1000;
    box.clearRect(0, 0, gameWindow.width, gameWindow.height);
    if (accumulatedTime > delta * 4) {
      lastTime = currentTime;
      player.swapImage();
      player2.swapImage();
    }
    player.update(delta);
    bgSpawner();
    box.fillText(`Your Score: ${i}`, 321, 20);
    player.draw(box);
    obstacleSpawner(delta);
    Obstacle.all.forEach(element => {
      element.update(box);
    });
    i++;
    if (i >= 1000) {
      easterEgg = true;
      --player2.x;
      player2.draw(box);
      player2.update(delta);
    }
    if (i % 2000 === 0) {
      changeBg();
    }
    collide ? cancelAnimationFrame(timestamp) : requestAnimationFrame(draw);
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
