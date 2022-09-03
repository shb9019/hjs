function addSquares(a, b) {
  let __$curriedaddSquares = function (a) {
    return function (b) {
      function square(x) {
        return x * x;
      }

      return square(a) + square(b);
    };
  };

  for (const arg of arguments) {
    __$curriedaddSquares = __$curriedaddSquares(arg);
  }

  if (arguments.length === 0)
    __$curriedaddSquares = __$curriedaddSquares(undefined);
  return __$curriedaddSquares;
}