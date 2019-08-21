class Player {
  constructor(gameWindow, width, height) {
    this.height = width;
    this.width = height;
    this.x = 10;
    this.y = gameWindow.height - this.height;
    this.image = new Image();
    this.image.src = "dino.gif";
    this.vely = -100;
    this.jumping = false;
  }

  draw(box) {
    box.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  jump() {
    this.jumping = true;
  }

  update(delta) {
    if (this.jumping) {
      if (parseInt(this.y) <= gameWindow.height - this.height * 2) {
        this.jumping = false;
      } else {
        this.y += this.vely * delta;
      }
    } else {
      if (this.y < gameWindow.height - this.height) {
        this.y += Math.abs(this.vely) * delta * 0.75;
      }
    }
  }
}
