import calculator from './calculator.sf';

function component() {
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
