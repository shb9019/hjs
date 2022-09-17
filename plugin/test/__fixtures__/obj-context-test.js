const salary = {
  bonus: 1000,
  increment: 0.05,
  amountToPay(base, benefits) {
    return base + this.bonus + benefits + (base * this.increment);
  }
};

console.log(salary.amountToPay(10000, 2000));
console.log(salary.amountToPay(10000)(2000));
