function addSquares(a, b) {
  let __$curriedResponse = function (a) {
    return function (b) {
      function square(x) {
        return x * x;
      }

      return square(a) + square(b);
    };
  };

  for (const arg of arguments) {
    __$curriedResponse = __$curriedResponse(arg);
  }

  if (arguments.length === 0)
    __$curriedResponse = __$curriedResponse(undefined);
  return __$curriedResponse;
}