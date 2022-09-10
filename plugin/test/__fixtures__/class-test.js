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
rectangle.getWeight(10, 2);

class Rectangle {
  // Constructor should not be modified
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  getVolume(depth) {
    return this.height * this.width * depth;
  }

  getWeight(depth, density) {
    const that = this;
    let __$curriedFunc = function (depth) {
      return function (density) {
        return that.getVolume(depth) * density;
      };
    };

    const args = [];
    if (depth !== undefined) args.push(depth);
    if (density !== undefined) args.push(density);

    for (const arg of args) {
      __$curriedFunc = __$curriedFunc.call(this, arg);
    }

    if (args.length === 0)
      __$curriedFunc = __$curriedFunc.call(this, undefined);
    return __$curriedFunc;
  }
}
