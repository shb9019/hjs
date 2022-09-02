function showMessage(from, text) {
  let __$curriedResponse = function (from) {
    return function (text) {
      alert(from + ": " + text);
    };
  };

  for (const arg of arguments) {
    __$curriedResponse = __$curriedResponse(arg);
  }

  if (arguments.length === 0)
    __$curriedResponse = __$curriedResponse(undefined);
  return __$curriedResponse;
}
