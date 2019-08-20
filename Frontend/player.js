export default class Player {
  constructor() {
    this.x = 10;
    this.y = 140;
    this.vy = 0;
  }

  draw(ctx) {
    ctx.drawImage("dino.gif", this.x, this.y);
  }

  jump() {
    this.vy = -10;
  }

  move() {
    this.y += this.vy;
  }
}
