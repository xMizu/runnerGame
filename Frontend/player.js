class Player {
  static all = [];

  constructor(gameWindow, width, height) {
    this.height = width;
    this.width = height;
    this.x = 10;
    this.y = gameWindow.height - this.height;
    this.image = new Image();
    this.image.src = "dino copy.gif";
    this.vely = -200;
    this.jumping = false;
    Player.all.push(this);
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
        this.y += this.vely * delta * 1.5;
      }
    } else {
      if (this.y < gameWindow.height - this.height) {
        this.y += Math.abs(this.vely) * delta * 0.75;
      }
    }
  }
}
