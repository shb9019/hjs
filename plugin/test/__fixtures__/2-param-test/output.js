function __curriedshowMessage(from) {
  return function (text) {
    alert(from + ": " + text);
  };
}

function showMessage(from, text) {
  let __$curriedResponse = __curriedshowMessage;
  arguments.forEach((arg) => {
    __$curriedResponse = __$curriedResponse(arg);
  });
  return __$curriedResponse;
}
