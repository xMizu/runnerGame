class Obstacle {
  constructor(gameWindow, width, height) {
    this.height = width;
    this.width = height;
    this.x = gameWindow.width * (1 + Math.random());
    this.y = gameWindow.height - this.height;
    this.image = new Image();
    this.image.src = "Grass.png";
    this.vely = -4;
  }

  draw(box) {
    box.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update(box) {
    this.x -= this.vely;
    this.draw(box);
  }
}
