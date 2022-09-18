# 💪 Super Function JS
[![NPM Version](https://badge.fury.io/js/babel-plugin-super-function-js.svg)](https://badge.fury.io/js/babel-plugin-super-function-js)
[![GitHub license](https://img.shields.io/github/license/shb9019/super-function-js.svg)](https://github.com/shb9019/super-function-js/blob/main/plugin/LICENSE)

Babel plugin to give super powers to your JavaScript functions. Inspired by functional programming languages such as Haskell.

## Usage
1. Install plugin: `npm install --save-dev babel-plugin-super-function-js`
2. Add the following plugin to your .babelrc file,
```json
  "overrides": [{
    "test": "**/*.sf.js",
    "plugins": ["babel-plugin-super-function-js"]
  }]
```
3. Super function will now transform all functions from files with ".sf.js" extension!

## Features
### Curried Functions Everywhere!!

Any functions you define will be curried by default. Pass any number of parameters and you'll get back another function.
```js
function calculateFullSalary(base, hra, deductions) {
  return base + hra - deductions;
}

calculateFullSalary(1000, 100, 50);
const tempEmpSalaryCalculator = calculateFullSalary(1000);
const fullTimeTempSalary = tempEmpSalaryCalculator(50, 25);
const partTimeTempSalary = tempEmpSalaryCalculator(20, 25);
```
