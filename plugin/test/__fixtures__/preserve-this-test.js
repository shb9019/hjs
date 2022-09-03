const obj = {
  value: 100,
  increaseValue(a, b, c) {
    this.value += a;
    this.value += b;
    this.value += c;
  }
};
