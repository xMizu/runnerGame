class Obstacle {
  static all = [];
  constructor(gameWindow, width, height, x) {
    this.height = width;
    this.width = height;
    this.x = x;
    this.y = gameWindow.height - this.height;
    this.image = new Image();
    this.image.src = "Grass.png";
    this.velx = -5;
    Obstacle.all.push(this);
  }

  draw(box) {
    box.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.velx;
  }

  update(box) {
    this.draw(box);
  }

  static lastElement() {
    return Obstacle.all[Obstacle.all.length - 1];
  }

  static furthestBlock() {
    let distance = 0;
    Obstacle.all.forEach(grass => {
      grass.x > distance;
      distance = grass.x;
    });
    return distance;
  }
}

function spawnRate() {
  let randNumber = Math.random();
  if (randNumber < 0.5) {
    return 0.5;
  } else {
    return randNumber;
  }
}

function obstacleRemover(grass, index) {
  if (grass.x < -10) {
    Obstacle.all.splice(index, 1);
  }
}
