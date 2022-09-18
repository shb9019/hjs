function component() {

  function calculator(op, a, b) {
    if (op == '+') {
      return a + b;
    } else if (op == '-') {
      return a - b;
    } else if (op == '*') {
      return a * b;
    } else {
      return -1;
    }
  }

  const element = document.createElement('div');
  const adder = calculator('+');
  const subtractor = calculator('-');
  const multiplier = calculator('*');

  console.log(adder(10, 20));
  console.log(multiplier(10, 20));
  console.log(subtractor(adder(1, 2), multiplier(10, 2)));

  return element;
}

document.body.appendChild(component());
