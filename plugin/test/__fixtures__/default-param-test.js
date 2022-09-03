function withDefaults(a, b, c = 1, d = 2, e = 3) {
  return [a, b, c, d, e];
}

withDefaults(1,2)()()();
withDefaults(1,2)(undefined, undefined, undefined);
withDefaults(1,2)(undefined, undefined)();
withDefaults(1,2)(3, 4)(5);
