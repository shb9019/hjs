const multiplyNumbers = (a, b, c) => a * b * c;

multiplyNumbers(1)(2)(3);
multiplyNumbers(1)(2, 3);
multiplyNumbers(1, 2, 3);
