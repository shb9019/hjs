const multiplyNumbers = function (a, b, c) {
  return a * b * c;
};

multiplyNumbers(1)(2)(3);
multiplyNumbers(1)(2, 3);
multiplyNumbers(1, 2, 3);