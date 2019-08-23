class Obstacle {
  static all = [];
  constructor(gameWindow, width, height, x, y, obsVel) {
    this.height = width;
    this.width = height;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "Grass.png";
    this.velx = obsVel;
    Obstacle.all.push(this);
  }

  draw(box) {
    box.drawImage(this.image, this.x, this.y, this.width, this.height);
    // box.strokeRect(this.x, this.y, this.width, this.height);
  }

  move(delta) {
    this.x += this.velx * delta;
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

function obstacleRemover(grass, index) {
  if (grass.x < -10) {
    Obstacle.all.splice(index, 1);
  }
}
