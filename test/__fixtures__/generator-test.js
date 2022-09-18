function* anotherGenerator(i,j) {
  yield i + 1;
  yield i + 2;
  yield j + 1;
  yield j + 2;
}

function* generator(i,j,k) {
  yield* anotherGenerator(i,j);
  yield k + 1;
  yield k + 2;
}

const gen = generator(10, 20, 30);

console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 21
console.log(gen.next().value); // 22
console.log(gen.next().value); // 31
console.log(gen.next().value); // 32
