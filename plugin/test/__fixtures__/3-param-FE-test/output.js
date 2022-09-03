let counter = 0;

const multiplyNumbers = function multiply(a, b, c) {
  let __$curriedmultiply = function (a) {
    return function (b, c) {
      let __$curriedmultiply = function (b) {
        return function (c) {
          if (counter == 0) {
            counter++;
            console.log(multiply(a, b, c));
          }

          return a * b * c;
        };
      };

      for (const arg of arguments) {
        __$curriedmultiply = __$curriedmultiply(arg);
      }

      if (arguments.length === 0)
        __$curriedmultiply = __$curriedmultiply(undefined);
      return __$curriedmultiply;
    };
  };

  for (const arg of arguments) {
    __$curriedmultiply = __$curriedmultiply(arg);
  }

  if (arguments.length === 0)
    __$curriedmultiply = __$curriedmultiply(undefined);
  return __$curriedmultiply;
};
