const multiplyNumbersOrig = function (a, b, c) {
  console.log(a * b * c);
};

const multiplyNumbersRefactored = function (a, b, c, d, e) {
  const args = [];
  if (a != undefined) args.push(a);
  if ((b !== undefined) && (arguments.length > 1)) args.push(b);
  if ((c !== undefined) && (arguments.length > 2)) args.push(c);
  if ((d !== undefined) && (arguments.length > 3)) args.push(d);
  if ((e !== undefined) && (arguments.length > 4)) args.push(e);

  // If k out of n parameters are passed, return function that takes 
};

const multiplyNumbersBefore = function multiply(a, b, c) {
  let __$curriedmultiply = function (a) {
    return function (b, c) {
      let __$curriedmultiply = function (b) {
        return function (c) {
          if (counter == 0) {
            counter++;
            console.log(multiply(a, b, c));
          }

          console.log(a * b * c);
          return a * b * c;
        }.bind(this);
      }.bind(this);

      const args = [];
      if (b !== undefined) args.push(b);
      if (c !== undefined) args.push(c);

      for (let i = 0; i < args.length; i++) {
        if (arguments && arguments.length <= i && i != 0) break;
        const arg = args[i];
        if (arg === undefined) __$curriedmultiply = __$curriedmultiply();
        else __$curriedmultiply = __$curriedmultiply(arg);
      }

      if (args.length === 0) __$curriedmultiply = __$curriedmultiply();
      return __$curriedmultiply;
    }.bind(this);
  }.bind(this);

  const args = [];
  if (a !== undefined) args.push(a);
  if (b !== undefined) args.push(b);
  if (c !== undefined) args.push(c);

  for (let i = 0; i < args.length; i++) {
    if (arguments && arguments.length <= i && i != 0) break;
    const arg = args[i];
    if (arg === undefined) __$curriedmultiply = __$curriedmultiply();
    else __$curriedmultiply = __$curriedmultiply(arg);
  }

  if (args.length === 0) __$curriedmultiply = __$curriedmultiply();
  return __$curriedmultiply;
};
