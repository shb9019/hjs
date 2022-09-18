function withDefaults(a, b, c = 1, d = 2, e = 3, f, g) {
  return [a, b, c, d, e, f, g];
}

console.log(withDefaults(1, 2)(undefined, undefined, undefined)(3,4));
console.log(withDefaults(1, 2)()()()(3,4));
