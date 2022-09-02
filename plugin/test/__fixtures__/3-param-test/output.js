function addNumbers(a, b, c) {
  let __$curriedResponse = function (a) {
    return function (b, c) {
      let __$curriedResponse = function (b) {
        return function (c) {
          return a + b + c;
        };
      };

      for (const arg of arguments) {
        __$curriedResponse = __$curriedResponse(arg);
      }

      return __$curriedResponse;
    };
  };

  for (const arg of arguments) {
    __$curriedResponse = __$curriedResponse(arg);
  }

  return __$curriedResponse;
}
