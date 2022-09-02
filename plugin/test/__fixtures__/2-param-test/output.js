function showMessage(from, text) {
  let __$curriedResponse = function (from) {
    return function (text) {
      alert(from + ": " + text);
    };
  };

  for (const arg of arguments) {
    __$curriedResponse = __$curriedResponse(arg);
  }

  return __$curriedResponse;
}
