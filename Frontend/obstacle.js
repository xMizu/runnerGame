class Obstacle {
  static all = [];
  constructor(gameWindow, width, height) {
    this.height = width;
    this.width = height;
    this.x = gameWindow.width * (1 + Math.random());
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
}
