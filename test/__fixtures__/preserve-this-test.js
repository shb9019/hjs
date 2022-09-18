const obj = {
  value: 100,
  increaseValue(a, b, c) {
    this.value += a;
    this.value += b;
    this.value += c;
  }
};

obj.increaseValue(6, 7, 8);
console.log(obj.value); // Should be 121

const incrVal5 = obj.increaseValue(5);
incrVal5(6, 7);
console.log(obj.value); // Should be 139

incrVal5.call(obj, 6, 7);
console.log(obj.value); // Should be 157
