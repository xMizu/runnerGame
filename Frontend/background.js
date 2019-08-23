class Background {
    static all = [];
    constructor(width, height, source, startingY, speed, startingX) {
      this.height = width;
      this.width = height;
      this.x = startingX;
      this.y = startingY;
      this.image = new Image();
      this.image.src = source;
      this.speed = speed
      Background.all.push(this);
    }

    draw(box) {
        box.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.moveProp()
    }

    moveProp() {
    this.x -= this.speed
    if (this.x < - 150){
        this.x = 395
    }
    }
}
