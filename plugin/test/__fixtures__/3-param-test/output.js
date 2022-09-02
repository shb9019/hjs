function __curriedaddNumbers(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

function addNumbers(a, b, c) {
  let __$curriedResponse = __curriedaddNumbers;
  arguments.forEach((arg) => {
    __$curriedResponse = __$curriedResponse(arg);
  });
  return __$curriedResponse;
}
