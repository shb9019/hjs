let counter = 0;

const multiplyNumbers = function multiply (a, b, c) {
  if (counter == 0) {
    counter++;
    console.log(multiply(a, b, c));
  }

  return a * b * c;
};

multiplyNumbers(1)(2)(3);
multiplyNumbers(1)(2, 3);
multiplyNumbers(1, 2, 3);
