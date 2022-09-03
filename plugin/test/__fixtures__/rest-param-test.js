const multiplyAll = (a, b, ...rest) => {
  let product = a * b;
  for (const item of rest) {
    product = product * item;
  }
  return product;
};
