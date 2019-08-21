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
    document.addEventListener(trigger, function(e) {
      if (parseInt(player.y) >= gameWindow.height - player.height) {
        player.jump();
      }
    });
  });

  //   potential obstacle generator
  function obstacleSpawner() {
    // if (arr.length) {
    //   for (let i = 0; i < arr.length; i++) {
    //     box.drawImage(grass, arr[i].x, arr[i].y, 16, 16);
    //     arr[i].x -= 4;
    //     if (arr[i].x < -20) {
    //       arr.push({
    //         x: parseInt(gameWindow.width + Math.random() * 300),
    //         y: 135
    //       });
    //       arr.splice([i], 1);
    //     }
    //   }
    // } else {

    arr.push(new Obstacle(gameWindow, 16, 16, 300));
    // }
  }

  function collision() {
    if (
      //check left
      arr[0].x + 4 <= player.x + player.width - 5 &&
      //check right
      player.x + 4 <= arr[0].x + 18 &&
      player.y + player.height - 5 >= arr[0].y
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
    arr.forEach(element => {
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
