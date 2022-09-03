const multiplyAll = (a, b, ...rest) => {
  let product = a * b;
  for (const item of rest) {
    product = product * item;
  }
  return product;
};

multiplyAll(1, 2)();
multiplyAll(1, 2)(3, 4, 5);
multiplyAll(1)(2)(3, 4);
