function addNumbers(a, b, c) {
  console.log(a + b + c);
  return a + b + c;
}

addNumbers(5)(6)(2);
addNumbers(5)(6, 2);
addNumbers(5, 6, 2);
