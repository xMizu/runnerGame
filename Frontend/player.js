class Player {
  static all = [];

  constructor(gameWindow, width, height, img1, img2) {
    this.height = width;
    this.width = height;
    this.x = 10;
    this.y = gameWindow.height - this.height + 4;
    this.image = new Image();
    this.image.src = img1;
    this.vely = -200;
    this.jumping = false;
    this.runninglft = img1;
    this.runningRgt = img2;
    this.running = true;
    Player.all.push(this);
  }

  draw(box) {
    box.drawImage(this.image, this.x, this.y, this.width, this.height);
    // box.strokeRect(this.x + 10, this.y + 5, this.width - 15, this.height - 20);
    // box.strokeRect(this.x + 6, this.y + 16, this.width - 17, this.height - 23);
  }

  hitbox() {
    return [
      // head
      {
        x: this.x + 10,
        y: this.y + 5,
        width: this.width - 15,
        height: this.height - 20
      },
      // body
      {
        x: this.x + 6,
        y: this.y + 16,
        width: this.width - 17,
        height: this.height - 23
      }
    ];
  }

  jump() {
    this.jumping = true;
    this.image.src = "dino-jumping.png";
  }

  update(delta) {
    if (this.jumping) {
      if (parseInt(this.y) <= gameWindow.height - this.height * 2) {
        this.jumping = false;
        this.image.src = "dino-left-foot.png";
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

  swapImage() {
    if (!this.jumping) {
      if (this.running) {
        this.image.src = this.runninglft;
        this.running = false;
      } else {
        this.image.src = this.runningRgt;
        this.running = true;
      }
    }
  }
}
