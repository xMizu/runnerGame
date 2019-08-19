class Player {
  constructor() {
    this.x = 10;
    this.y = 140;
  }

  show() {
    box.rect(this.x, this.y, 10, 10);
  }

  jump() {
    this.x += 10;
    this.y -= 10;
    // box.translate(0, 10);
  }
}
