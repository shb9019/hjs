let counter = 0;

const multiplyNumbers = function multiply(a, b, c) {
  let __$curriedResponse = function (a) {
    return function (b, c) {
      let __$curriedResponse = function (b) {
        return function (c) {
          if (counter == 0) {
            counter++;
            console.log(multiply(a, b, c));
          }

          return a * b * c;
        };
      };

      for (const arg of arguments) {
        __$curriedResponse = __$curriedResponse(arg);
      }

      if (arguments.length === 0)
        __$curriedResponse = __$curriedResponse(undefined);
      return __$curriedResponse;
    };
  };

  for (const arg of arguments) {
    __$curriedResponse = __$curriedResponse(arg);
  }

  if (arguments.length === 0)
    __$curriedResponse = __$curriedResponse(undefined);
  return __$curriedResponse;
};
