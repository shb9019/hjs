function addSquares(a, b) {
  function square(x) {
    console.log(x * x);
    return x * x;
  }
  return square(a) + square(b);
}
