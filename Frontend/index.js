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
      player.x + 4 <= grass.x + 15 &&
      //check top
      player.y + player.height - 6 >= grass.y &&
      //check bottom
      player.y <= grass.y + grass.height / 1.75
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
      while (Obstacle.all.length < 10) {
        let last =
          Obstacle.furthestBlock() > gameWindow.width
            ? Obstacle.furthestBlock()
            : gameWindow.width;
        new Obstacle(
          gameWindow,
          16,
          16,
          last + spawnRateX() * gameWindow.width,
          spawnRateY()
        );
      }
      Obstacle.all.forEach((grass, index) => {
        obstacleRemover(grass, index);
        grass.move();
        collision(grass);
      });
    } else {
      new Obstacle(gameWindow, 16, 16, gameWindow.width + 50, 184);
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

  setInterval(swapImage, 90)

  function swapImage(){
    if (player.jumping === false){
      if (player.image.src == "file:///Users/flatironschool/Development/mod3/Project-Mode/Mod3-Project/runnerGame/Frontend/dino-right-foot.png"){
        player.image.src = "dino-left-foot.png"
      } else if (player.image.src == "file:///Users/flatironschool/Development/mod3/Project-Mode/Mod3-Project/runnerGame/Frontend/dino-left-foot.png"){
        player.image.src = "dino-right-foot.png"
      }
    }
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
