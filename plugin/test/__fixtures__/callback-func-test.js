function showValueInElement(element, val) {
  element.show(val);
}

const el1 = {
  show: (val) => console.log(100 * val),
};
const callback1 = showValueInElement(el1);

const el2 = {
  show: (val) => console.log(1000 + val),
};
const callback2 = showValueInElement(el2);

setTimeout(() => callback1(20), 1000);
setTimeout(() => callback1(50), 1000);
