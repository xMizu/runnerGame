class Player {
  constructor(gameWindow, width, height) {
    this.height = 32;
    this.width = 32;
    this.x = 10;
    this.y = gameWindow.height - this.height;
    this.image = new Image();
    this.image.src = "dino.gif";
    this.vely = -40;
  }

  draw(box) {
    return box.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  jump() {
    this.y += this.vely;
  }
}
