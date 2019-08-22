class Obstacle {
  static all = [];
  constructor(gameWindow, width, height, x, y) {
    this.height = width;
    this.width = height;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "Grass.png";
    this.velx = -7;
    Obstacle.all.push(this);
  }

  draw(box) {
    box.drawImage(this.image, this.x, this.y, this.width, this.height);
    box.strokeRect(this.x, this.y, this.width, this.height);
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

function obstacleRemover(grass, index) {
  if (grass.x < -10) {
    Obstacle.all.splice(index, 1);
  }
}
