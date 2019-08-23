class Background {
  static all = [];
  constructor(width, height, source, startingY, speed, startingX) {
    this.height = width;
    this.width = height;
    this.x = startingX;
    this.y = startingY;
    this.image = new Image();
    this.image.src = source;
    this.speed = speed;
    Background.all.push(this);
  }

  draw(box) {
    this.moveProp();
    box.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  moveProp() {
    this.x -= this.speed;
  }

  static BgRandomizer() {
    let index = Math.random();
    if (index < 0.9) {
      if (index < 0.6) {
        if (index < 0.3) {
          index = 0;
        } else {
          index = 2;
        }
      } else {
        index = 1;
      }
    } else {
      index = 3;
    }
    let pics = [
      {
        name: "cloud",
        image: "pictures/cloud5.png",
        size: 200,
        speed: 0.75,
        y: 0
      },
      {
        name: "cloud",
        image: "pictures/cloud2.png",
        size: 200,
        speed: 0.25,
        y: 0
      },
      { name: "tree", image: "pictures/tree.png", size: 100, speed: 1.5, y: 0 },
      {
        name: "mountain",
        image: "pictures/mountain.png",
        size: 90,
        speed: 0.3,
        y: 0
      }
    ];
    return pics[index];
  }

  static furthestBlock() {
    let distance = 0;
    Background.all.forEach(bg => {
      bg.x > distance;
      distance = bg.x;
    });
    return distance;
  }
}

function bgRemover(bg, index) {
  if (bg.x < -150) {
    Background.all.splice(index, 1);
  }
}
