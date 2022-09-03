const multiplyNumbers = (a, b, c) => {
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

  const args = [];
  if (a !== undefined) args.push(a);
  if (b !== undefined) args.push(b);
  if (c !== undefined) args.push(c);

  for (const arg of args) {
    __$curriedFunc = __$curriedFunc(arg);
  }

  if (args.length === 0) __$curriedFunc = __$curriedFunc(undefined);
  return __$curriedFunc;
};