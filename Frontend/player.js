class Player {
  constructor(gameWindow, width, height) {
    this.height = width;
    this.width = height;
    this.x = 10;
    this.y = 136;
    this.image = new Image();
    this.image.src = "dino.gif";
    this.vely = -40;
  }

  draw(box) {
    return box.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  jump() {
    this.y += this.vely;
    this.x += 2;
  }
}
