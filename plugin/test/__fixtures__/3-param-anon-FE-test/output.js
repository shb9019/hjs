const multiplyNumbers = function (a, b, c) {
  let __$curriedFunc = function (a) {
    return function (b, c) {
      let __$curriedFunc = function (b) {
        return function (c) {
          return a * b * c;
        };
      };

      for (const arg of arguments) {
        __$curriedFunc = __$curriedFunc(arg);
      }

      if (arguments.length === 0) __$curriedFunc = __$curriedFunc(undefined);
      return __$curriedFunc;
    };
  };

  for (const arg of arguments) {
    __$curriedFunc = __$curriedFunc(arg);
  }

  if (arguments.length === 0) __$curriedFunc = __$curriedFunc(undefined);
  return __$curriedFunc;
};