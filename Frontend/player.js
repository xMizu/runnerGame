class Player {
  constructor() {
    this.x = 10;
    this.y = 140;
    this.vy = 0;
  }

  show() {
    console.log("from the player show function");
    // box.drawImage("dino.gif", this.x, this.y);
  }

  jump() {
    this.vy = -10;
  }

  move() {
    this.y += this.vy;
  }
}
