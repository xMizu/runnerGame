class Player {
  constructor(gameWindow, width, height) {
    this.height = width;
    this.width = height;
    this.x = 10;
    this.y = gameWindow.height - this.height;
    this.image = new Image();
    this.image.src = "dino.gif";
    this.vely = gameWindow.height - this.height * 2;
    this.jumping = false;
  }

  draw(box) {
    box.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  jump() {
    this.y = this.vely;
  }

  update(box) {
    if (this.y + this.height < gameWindow.height) {
      this.y++;
    }
    this.draw(box);
  }
}
