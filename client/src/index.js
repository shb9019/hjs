function component() {
  const element = document.createElement('div');

  const foo = 100;
  const bar = 1000;
  console.log(foo === bar);
  return element;
}

document.body.appendChild(component());
