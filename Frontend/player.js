class Player {
  static all = [];

  constructor(gameWindow, width, height) {
    this.height = width;
    this.width = height;
    this.x = 10;
    this.y = gameWindow.height - this.height + 4;
    this.image = new Image();
    this.image.src = "dino.gif";
    this.vely = -200;
    this.jumping = false;
    Player.all.push(this);
  }

  draw(box) {
    box.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  jump() {
    this.jumping = true;
    this.image.src = "dino-jumping.png";
  }

  update(delta) {
    if (this.jumping) {
      if (parseInt(this.y) <= gameWindow.height - this.height * 2) {
        this.jumping = false;
        this.image.src = "dino.gif"
      } else {
        this.y += this.vely * delta * 1.5;
      }
    } else {
      if (this.y < gameWindow.height - this.height) {
        this.y += Math.abs(this.vely) * delta * 0.75;
      } else {
        this.y = gameWindow.height - this.height + 4;
      }
    }
  }
}
