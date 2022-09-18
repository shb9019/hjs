class Rectangle {
  // Constructor should not be modified
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  getVolume(depth) {
    return (this.height * this.width * depth);
  }

  getWeight(depth, density) {
    return this.getVolume(depth) * density;
  }
}

const rectangle = new Rectangle(5, 6);
console.log(rectangle.getWeight(10, 2));
console.log(rectangle.getWeight(10)(2));
