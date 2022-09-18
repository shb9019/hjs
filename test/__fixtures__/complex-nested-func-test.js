function complexOuter(a, b) {
  function complexInner(c, d, e) {
    return a + b + c + d + e;
  }

  return complexInner;
}

let inner3 = complexOuter(1, 2);
let inner4 = complexOuter(1, 3);

console.log(inner3(1, 1, 1));
console.log(inner3(1)(1, 1));
console.log(inner4(1)(1)(1));
