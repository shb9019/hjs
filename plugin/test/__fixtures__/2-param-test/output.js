function showMessage(from, text) {
  let __$curriedshowMessage = function (from) {
    return function (text) {
      alert(from + ": " + text);
    };
  };

  for (const arg of arguments) {
    __$curriedshowMessage = __$curriedshowMessage(arg);
  }

  if (arguments.length === 0)
    __$curriedshowMessage = __$curriedshowMessage(undefined);
  return __$curriedshowMessage;
}
