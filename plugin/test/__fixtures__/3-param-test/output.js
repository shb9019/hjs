function addNumbers(a, b, c) {
  let __$curriedaddNumbers = function (a) {
    return function (b, c) {
      let __$curriedaddNumbers = function (b) {
        return function (c) {
          return a + b + c;
        };
      };

      for (const arg of arguments) {
        __$curriedaddNumbers = __$curriedaddNumbers(arg);
      }

      if (arguments.length === 0)
        __$curriedaddNumbers = __$curriedaddNumbers(undefined);
      return __$curriedaddNumbers;
    };
  };

  for (const arg of arguments) {
    __$curriedaddNumbers = __$curriedaddNumbers(arg);
  }

  if (arguments.length === 0)
    __$curriedaddNumbers = __$curriedaddNumbers(undefined);
  return __$curriedaddNumbers;
}