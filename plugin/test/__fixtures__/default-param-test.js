function withDefaults(a, b, c = 1, d = 2, e = 3) {
  console.log([a, b, c, d, e]);
  return [a, b, c, d, e];
}

withDefaults(1,2)()()();
withDefaults(1,2)(undefined, undefined, undefined);
withDefaults(1,2)(undefined, undefined)();
withDefaults(1,2)(3, 4)(5);
