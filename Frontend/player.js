class Player {
  constructor() {
    this.x = 10;
    this.y = 140;
    this.vy = 0;
  }

  show() {
    box.fillRect(this.x, this.y, 10, 10);
  }

  jump() {
    this.vy = -10;
  }

  move() {
    this.y += this.vy;
  }
}
