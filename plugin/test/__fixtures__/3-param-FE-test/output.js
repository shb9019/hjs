const multiplyNumbers = function multiply(a, b, c) {
  let __$curriedResponse = function (a) {
    return function (b) {
      return function (c) {
        console.log(multiply(a, b, c));
        return a * b * c;
      };
    };
  };

  for (const arg of arguments) {
    __$curriedResponse = __$curriedResponse(arg);
  }

  return __$curriedResponse;
};
